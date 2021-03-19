import * as ethers from 'ethers'
import { abi, Program, ArbConversion, L1Bridge } from 'arb-provider-ethers'
import * as yargs from 'yargs'
import * as fs from 'fs-extra'
import { setupValidatorStates } from './setup_validators'
import ArbFactoryJson from '../../arb-bridge-eth/build/contracts/ArbFactory.json'
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const arbConversion = new ArbConversion()

const root = '../../'
const rollupsPath = root + 'rollups/'
import * as addresses from '../../arb-bridge-eth/bridge_eth_addresses.json'

//Web3 setting
const mnemonicPhrase =
  'digital unknown jealous mother legal hedgehog save glory december universe spread figure custom found six'
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl: 'https://testnet.sovryn.app/rpc',
})
const web3 = new Web3(provider)

async function setupRollup(arbOSData: string): Promise<string> {
  const arbOSHash = Program.programMachineHash(arbOSData)
  const accounts = await web3.eth.getAccounts()
  const factoryAddress = addresses['contracts']['ArbFactory'].address

  const factory = await new web3.eth.Contract(
    ArbFactoryJson.abi,
    factoryAddress
  )
  console.log(`Initializing rollup chain for machine with hash ${arbOSHash}`)
  console.log('accounts', accounts)

  const tx = await factory.methods
    .createRollup(
      arbOSHash,
      arbConversion.blocksToTicks(30),
      80000000,
      10000000000,
      ethers.utils.parseEther('.01'),
      ethers.utils.hexZeroPad('0x', 20),
      ethers.utils.hexZeroPad('0x', 20),
      '0x'
    )
    .send({ from: accounts[0] })

  const rollupAddress =
    tx['events']['RollupCreated']['returnValues']['rollupAddress']

  return rollupAddress
}

async function initializeWallets(count: number): Promise<ethers.Wallet[]> {
  const accounts = await web3.eth.getAccounts()
  const wallets: ethers.Wallet[] = []
  // const waits = []
  for (let i = 0; i < count; i++) {
    const newWallet = ethers.Wallet.createRandom()
    const tx = {
      to: newWallet.address,
      value: ethers.utils.parseEther('0.01'),
      from: accounts[0],
    }
    const send = await web3.eth.sendTransaction(tx)
    wallets.push(newWallet)
    // waits.push(send.wait())
  }
  // await Promise.all(waits)
  return wallets
}

// async function initializeClientWallets(rollupAddress: string): Promise<void> {
//   const addresses = [
//     '0xc7711f36b2C13E00821fFD9EC54B04A60AEfbd1b',
//     '0x38299D74a169e68df4Da85Fb12c6Fd22246aDD9F',
//   ]

//   const bridge = new L1Bridge(wallet, rollupAddress)
//   const amount = ethers.utils.parseEther('.01')

//   for (const address of addresses) {
//     await bridge.depositETH(address, amount)
//   }
// }

async function setupValidators(
  count: number,
  blocktime: number,
  force: boolean
): Promise<void> {
  const arbOSData = fs.readFileSync('../../arbos.mexe', 'utf8')
  const rollup = await setupRollup(arbOSData)
  console.log('Created rollup', rollup)

  const validatorsPath = rollupsPath + 'local/'

  if (count < 2) {
    throw Error('must create at least 1 validator')
  }

  if (!fs.existsSync(rollupsPath)) {
    fs.mkdirSync(rollupsPath)
  }

  if (fs.existsSync(validatorsPath)) {
    if (force) {
      fs.removeSync(validatorsPath)
    } else {
      throw Error(
        `${validatorsPath} already exists. First manually delete it or run with --force`
      )
    }
  }

  const config = {
    rollup_address: rollup,
    eth_url: 'https://testnet.sovryn.app/rpc',
    password: 'pass',
    blocktime: blocktime,
  }

  await setupValidatorStates(count, rollup, config)

  //await initializeClientWallets(rollup)
  console.log('done')
}

if (require.main === module) {
  yargs.command(
    'init [rollup] [ethurl]',
    'initialize validators for the given rollup chain',
    yargsBuilder =>
      yargsBuilder.options({
        force: {
          description: 'clear any existing state',
          type: 'boolean',
          default: false,
        },
        validatorcount: {
          description: 'number of validators to deploy',
          default: 1,
        },
        blocktime: {
          description: 'expected length of time between blocks',
          default: 2,
        },
      }),
    args => {
      setupValidators(args.validatorcount + 1, args.blocktime, args.force)
    }
  ).argv
}
