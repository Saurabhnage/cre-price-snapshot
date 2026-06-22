import {
  cre,
  getNetwork,
  type Runtime,
  type CronPayload,
} from "@chainlink/cre-sdk";

import { z } from "zod";
import { type Address } from "viem";

import { PriceFeedAggregator } from "../contracts/evm/ts/generated/PriceFeedAggregator";
import { SnapshotRecorder } from "../contracts/evm/ts/generated/SnapshotRecorder";

// ---------------- CONFIG ----------------

export const configSchema = z.object({
  schedule: z.string(),
});

type Config = z.infer<typeof configSchema>;

// ---------------- CONSTANTS ----------------

const ETH_USD_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

const SNAPSHOT_CONTRACT = "0xADEead25f7aB15483889A669C450e51Ec978ba36";

// ---------------- HELPERS ----------------

function getEvmClient() {
  const net = getNetwork({
    chainFamily: "evm",
    chainSelectorName: "ethereum-testnet-sepolia",
    isTestnet: true,
  });

  if (!net) {
    throw new Error("Sepolia network not found");
  }

  return new cre.capabilities.EVMClient(
    net.chainSelector.selector
  );
}

// ---------------- HANDLER ----------------

export function onCron(
  runtime: Runtime<Config>,
  _payload: CronPayload
): string {

  const evmClient = getEvmClient();

  const feed = new PriceFeedAggregator(
    evmClient,
    ETH_USD_FEED as Address
  );

  const recorder = new SnapshotRecorder(
    evmClient,
    SNAPSHOT_CONTRACT as Address
  );

  const [
    roundId,
    answer,
    startedAt,
    updatedAt,
    answeredInRound,
  ] = feed.latestRoundData(runtime);

  runtime.log(
    `ETH/USD price=${answer.toString()} updatedAt=${updatedAt.toString()}`
  );

  recorder.writeReportFromSnapshot(
    runtime,
    "ETH",
    answer,
    BigInt(0),
    updatedAt
  );

  return JSON.stringify({
    token: "ETH",
    roundId: roundId.toString(),
    answer: answer.toString(),
    updatedAt: updatedAt.toString(),
    answeredInRound: answeredInRound.toString(),
  });
}

// ---------------- INIT ----------------

export function initWorkflow(config: Config) {
  const cron = new cre.capabilities.CronCapability();

  return [
    cre.handler(
      cron.trigger({
        schedule: config.schedule,
      }),
      onCron
    ),
  ];
}