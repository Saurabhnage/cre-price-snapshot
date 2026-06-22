// Code generated — DO NOT EDIT.
import {
  decodeEventLog,
  decodeFunctionResult,
  encodeEventTopics,
  encodeFunctionData,
  zeroAddress,
} from 'viem'
import type { Address, Hex } from 'viem'
import {
  bytesToHex,
  encodeCallMsg,
  EVMClient,
  hexToBase64,
  LAST_FINALIZED_BLOCK_NUMBER,
  prepareReportRequest,
  type EVMLog,
  type Runtime,
} from '@chainlink/cre-sdk'

export interface DecodedLog<T> extends Omit<EVMLog, 'data'> { data: T }

const encodeTopicValue = (t: Hex | Hex[] | null): string[] => {
  if (t == null) return []
  if (Array.isArray(t)) return t.map(hexToBase64)
  return [hexToBase64(t)]
}





/**
 * Filter params for SnapshotStored. Only indexed fields can be used for filtering.
 * Indexed string/bytes must be passed as keccak256 hash (Hex).
 */
export type SnapshotStoredTopics = {
}

/**
 * Decoded SnapshotStored event data.
 */
export type SnapshotStoredDecoded = {
  token: string
  price: bigint
  blockNumber: bigint
  timestamp: bigint
}


export const SnapshotRecorderABI = [{"type":"constructor","inputs":[{"name":"_forwarder","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"forwarder","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"records","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"token","type":"string","internalType":"string"},{"name":"price","type":"uint256","internalType":"uint256"},{"name":"blockNumber","type":"uint256","internalType":"uint256"},{"name":"timestamp","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"snapshot","inputs":[{"name":"token","type":"string","internalType":"string"},{"name":"price","type":"uint256","internalType":"uint256"},{"name":"blockNumber","type":"uint256","internalType":"uint256"},{"name":"timestamp","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"totalRecords","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"SnapshotStored","inputs":[{"name":"token","type":"string","indexed":false,"internalType":"string"},{"name":"price","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"blockNumber","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"timestamp","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}] as const

export class SnapshotRecorder {
  constructor(
    private readonly client: EVMClient,
    public readonly address: Address,
  ) {}

  forwarder(
    runtime: Runtime<unknown>,
  ): `0x${string}` {
    const callData = encodeFunctionData({
      abi: SnapshotRecorderABI,
      functionName: 'forwarder' as const,
    })

    const result = this.client
      .callContract(runtime, {
        call: encodeCallMsg({ from: zeroAddress, to: this.address, data: callData }),
        blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
      })
      .result()

    return decodeFunctionResult({
      abi: SnapshotRecorderABI,
      functionName: 'forwarder' as const,
      data: bytesToHex(result.data),
    }) as `0x${string}`
  }

  records(
    runtime: Runtime<unknown>,
    arg0: bigint,
  ): readonly [string, bigint, bigint, bigint] {
    const callData = encodeFunctionData({
      abi: SnapshotRecorderABI,
      functionName: 'records' as const,
      args: [arg0],
    })

    const result = this.client
      .callContract(runtime, {
        call: encodeCallMsg({ from: zeroAddress, to: this.address, data: callData }),
        blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
      })
      .result()

    return decodeFunctionResult({
      abi: SnapshotRecorderABI,
      functionName: 'records' as const,
      data: bytesToHex(result.data),
    }) as readonly [string, bigint, bigint, bigint]
  }

  totalRecords(
    runtime: Runtime<unknown>,
  ): bigint {
    const callData = encodeFunctionData({
      abi: SnapshotRecorderABI,
      functionName: 'totalRecords' as const,
    })

    const result = this.client
      .callContract(runtime, {
        call: encodeCallMsg({ from: zeroAddress, to: this.address, data: callData }),
        blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
      })
      .result()

    return decodeFunctionResult({
      abi: SnapshotRecorderABI,
      functionName: 'totalRecords' as const,
      data: bytesToHex(result.data),
    }) as bigint
  }

  writeReportFromSnapshot(
    runtime: Runtime<unknown>,
    token: string,
    price: bigint,
    blockNumber: bigint,
    timestamp: bigint,
    gasConfig?: { gasLimit?: string },
  ) {
    const callData = encodeFunctionData({
      abi: SnapshotRecorderABI,
      functionName: 'snapshot' as const,
      args: [token, price, blockNumber, timestamp],
    })

    const reportResponse = runtime
      .report(prepareReportRequest(callData))
      .result()

    return this.client
      .writeReport(runtime, {
        receiver: this.address,
        report: reportResponse,
        gasConfig,
      })
      .result()
  }

  writeReport(
    runtime: Runtime<unknown>,
    callData: Hex,
    gasConfig?: { gasLimit?: string },
  ) {
    const reportResponse = runtime
      .report(prepareReportRequest(callData))
      .result()

    return this.client
      .writeReport(runtime, {
        receiver: this.address,
        report: reportResponse,
        gasConfig,
      })
      .result()
  }

  /**
   * Creates a log trigger for SnapshotStored events.
   * The returned trigger's adapt method decodes the raw log into SnapshotStoredDecoded,
   * so the handler receives typed event data directly.
   * When multiple filters are provided, topic values are merged with OR semantics (match any).
   */
  logTriggerSnapshotStored(
    filters?: SnapshotStoredTopics[],
  ) {
    let topics: { values: string[] }[]
    if (!filters || filters.length === 0) {
      const encoded = encodeEventTopics({
        abi: SnapshotRecorderABI,
        eventName: 'SnapshotStored' as const,
      })
      topics = encoded.map((t) => ({ values: encodeTopicValue(t) }))
    } else if (filters.length === 1) {
      const f = filters[0]
      const args = {
      }
      const encoded = encodeEventTopics({
        abi: SnapshotRecorderABI,
        eventName: 'SnapshotStored' as const,
        args,
      })
      topics = encoded.map((t) => ({ values: encodeTopicValue(t) }))
    } else {
      const allEncoded = filters.map((f) => {
        const args = {
        }
        return encodeEventTopics({
          abi: SnapshotRecorderABI,
          eventName: 'SnapshotStored' as const,
          args,
        })
      })
      topics = allEncoded[0].map((_, i) => ({
        values: [...new Set(allEncoded.flatMap((row) => encodeTopicValue(row[i])))],
      }))
    }
    const baseTrigger = this.client.logTrigger({
      addresses: [hexToBase64(this.address)],
      topics,
    })
    const contract = this
    return {
      capabilityId: () => baseTrigger.capabilityId(),
      method: () => baseTrigger.method(),
      outputSchema: () => baseTrigger.outputSchema(),
      configAsAny: () => baseTrigger.configAsAny(),
      adapt: (rawOutput: EVMLog): DecodedLog<SnapshotStoredDecoded> => contract.decodeSnapshotStored(rawOutput),
    }
  }

  /**
   * Decodes a log into SnapshotStored data, preserving all log metadata.
   */
  decodeSnapshotStored(log: EVMLog): DecodedLog<SnapshotStoredDecoded> {
    const decoded = decodeEventLog({
      abi: SnapshotRecorderABI,
      data: bytesToHex(log.data),
      topics: log.topics.map((t) => bytesToHex(t)) as [Hex, ...Hex[]],
    })
    const { data: _, ...rest } = log
    return { ...rest, data: decoded.args as unknown as SnapshotStoredDecoded }
  }
}