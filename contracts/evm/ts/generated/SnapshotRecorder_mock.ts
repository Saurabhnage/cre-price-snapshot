// Code generated — DO NOT EDIT.
import type { Address } from 'viem'
import { addContractMock, type ContractMock, type EvmMock } from '@chainlink/cre-sdk/test'

import { SnapshotRecorderABI } from './SnapshotRecorder'

export type SnapshotRecorderMock = {
  forwarder?: () => `0x${string}`
  records?: (arg0: bigint) => readonly [string, bigint, bigint, bigint]
  totalRecords?: () => bigint
} & Pick<ContractMock<typeof SnapshotRecorderABI>, 'writeReport'>

export function newSnapshotRecorderMock(address: Address, evmMock: EvmMock): SnapshotRecorderMock {
  return addContractMock(evmMock, { address, abi: SnapshotRecorderABI }) as SnapshotRecorderMock
}

