/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from 'ethers'
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface ConfirmRootsInterface extends ethers.utils.Interface {
  functions: {
    'confirmRoots(bytes32,uint256)': FunctionFragment
    'rollup()': FunctionFragment
    'setupConfirmData(uint256,bytes32,bytes,uint256[],uint256,bytes32,uint256)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'confirmRoots',
    values: [BytesLike, BigNumberish]
  ): string
  encodeFunctionData(functionFragment: 'rollup', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'setupConfirmData',
    values: [
      BigNumberish,
      BytesLike,
      BytesLike,
      BigNumberish[],
      BigNumberish,
      BytesLike,
      BigNumberish
    ]
  ): string

  decodeFunctionResult(
    functionFragment: 'confirmRoots',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'rollup', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'setupConfirmData',
    data: BytesLike
  ): Result

  events: {}
}

export class ConfirmRoots extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: ConfirmRootsInterface

  functions: {
    confirmRoots(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    'confirmRoots(bytes32,uint256)'(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    rollup(overrides?: CallOverrides): Promise<[string]>

    'rollup()'(overrides?: CallOverrides): Promise<[string]>

    setupConfirmData(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'setupConfirmData(uint256,bytes32,bytes,uint256[],uint256,bytes32,uint256)'(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>
  }

  confirmRoots(
    arg0: BytesLike,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>

  'confirmRoots(bytes32,uint256)'(
    arg0: BytesLike,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>

  rollup(overrides?: CallOverrides): Promise<string>

  'rollup()'(overrides?: CallOverrides): Promise<string>

  setupConfirmData(
    nodeNum: BigNumberish,
    beforeSendAcc: BytesLike,
    sendsData: BytesLike,
    sendLengths: BigNumberish[],
    afterSendCount: BigNumberish,
    afterLogAcc: BytesLike,
    afterLogCount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'setupConfirmData(uint256,bytes32,bytes,uint256[],uint256,bytes32,uint256)'(
    nodeNum: BigNumberish,
    beforeSendAcc: BytesLike,
    sendsData: BytesLike,
    sendLengths: BigNumberish[],
    afterSendCount: BigNumberish,
    afterLogAcc: BytesLike,
    afterLogCount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  callStatic: {
    confirmRoots(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>

    'confirmRoots(bytes32,uint256)'(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>

    rollup(overrides?: CallOverrides): Promise<string>

    'rollup()'(overrides?: CallOverrides): Promise<string>

    setupConfirmData(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'setupConfirmData(uint256,bytes32,bytes,uint256[],uint256,bytes32,uint256)'(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {}

  estimateGas: {
    confirmRoots(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'confirmRoots(bytes32,uint256)'(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    rollup(overrides?: CallOverrides): Promise<BigNumber>

    'rollup()'(overrides?: CallOverrides): Promise<BigNumber>

    setupConfirmData(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'setupConfirmData(uint256,bytes32,bytes,uint256[],uint256,bytes32,uint256)'(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    confirmRoots(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'confirmRoots(bytes32,uint256)'(
      arg0: BytesLike,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    rollup(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'rollup()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    setupConfirmData(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'setupConfirmData(uint256,bytes32,bytes,uint256[],uint256,bytes32,uint256)'(
      nodeNum: BigNumberish,
      beforeSendAcc: BytesLike,
      sendsData: BytesLike,
      sendLengths: BigNumberish[],
      afterSendCount: BigNumberish,
      afterLogAcc: BytesLike,
      afterLogCount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>
  }
}
