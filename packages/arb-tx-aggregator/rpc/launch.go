/*
 * Copyright 2020, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package rpc

import (
	"context"
	"github.com/ethereum/go-ethereum/ethclient"
	"time"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"

	"github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/aggregator"
	"github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/batcher"
	"github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/machineobserver"
	utils2 "github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/utils"
	"github.com/offchainlabs/arbitrum/packages/arb-tx-aggregator/web3"
	"github.com/offchainlabs/arbitrum/packages/arb-util/common"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/ethbridge"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/ethutils"
)

type BatcherMode interface {
	isBatcherMode()
}

type ForwarderBatcherMode struct {
	NodeURL string
}

func (b ForwarderBatcherMode) isBatcherMode() {}

type StatefulBatcherMode struct {
	Auth *bind.TransactOpts
}

func (b StatefulBatcherMode) isBatcherMode() {}

type StatelessBatcherMode struct {
	Auth *bind.TransactOpts
}

func (b StatelessBatcherMode) isBatcherMode() {}

func LaunchAggregator(
	ctx context.Context,
	client ethutils.EthClient,
	rollupAddress common.Address,
	executable string,
	dbPath string,
	web3RPCPort string,
	web3WSPort string,
	flags utils2.RPCFlags,
	maxBatchTime time.Duration,
	batcherMode BatcherMode,
) error {
	print("WTHHHHHHHHHHHhh\n")
	arbClient := ethbridge.NewEthClient(client)
	db, err := machineobserver.RunObserver(ctx, rollupAddress, arbClient, executable, dbPath)
	if err != nil {
		println("error1")
		return err
	}
	rollupContract, err := arbClient.NewRollupWatcher(rollupAddress)
	if err != nil {
		println("error2")
		return err
	}
	inboxAddress, err := rollupContract.InboxAddress(ctx)
	if err != nil {
		println("error3")
		return err
	}

	var batch batcher.TransactionBatcher
	switch batcherMode := batcherMode.(type) {
	case ForwarderBatcherMode:
		forwardClient, err := ethclient.DialContext(ctx, batcherMode.NodeURL)
		if err != nil {
			println("error4")
			return err
		}
		batch = batcher.NewForwarder(forwardClient)
	case StatelessBatcherMode:
		authClient := ethbridge.NewEthAuthClient(client, batcherMode.Auth)
		globalInbox, err := authClient.NewGlobalInbox(inboxAddress, rollupAddress)
		if err != nil {
			println("error5")
			return err
		}
		batch = batcher.NewStatelessBatcher(ctx, rollupAddress, client, globalInbox, maxBatchTime)
	case StatefulBatcherMode:
		authClient := ethbridge.NewEthAuthClient(client, batcherMode.Auth)
		globalInbox, err := authClient.NewGlobalInbox(inboxAddress, rollupAddress)
		if err != nil {
			println("error6")
			return err
		}
		batch = batcher.NewStatefulBatcher(ctx, db, rollupAddress, client, globalInbox, maxBatchTime)
	}

	srv := aggregator.NewServer(batch, rollupAddress, db)
	errChan := make(chan error, 1)

	web3Server, err := web3.GenerateWeb3Server(srv)
	if err != nil {
		println("error7")
		return err
	}

	println("launching rpc", web3Server, web3RPCPort)
	if web3RPCPort != "" {
		go func() {
			errChan <- utils2.LaunchRPC(web3Server, web3RPCPort, flags)
		}()
	}
	if web3WSPort != "" {
		go func() {
			errChan <- utils2.LaunchWS(web3Server, web3WSPort, flags)
		}()
	}

	return <-errChan
}
