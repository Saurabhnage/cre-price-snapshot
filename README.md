# CRE Price Snapshot Workflow

## Overview

This project demonstrates a Chainlink Runtime Environment (CRE) workflow that reads ETH/USD price data from a Chainlink Data Feed on Ethereum Sepolia and stores periodic snapshots on-chain using a custom smart contract.

## Architecture

```text
Chainlink Data Feed
        ↓
   CRE Workflow
        ↓
 SnapshotRecorder
        ↓
 Ethereum Sepolia
```

## Features

- Chainlink Data Feed Integration
- CRE Cron Trigger
- EVM Read Operations
- EVM Write Operations
- TypeScript Workflow
- Auto-generated CRE Bindings

## Smart Contract

### SnapshotRecorder

Network:

Ethereum Sepolia

Contract Address:

0xADEead25f7aB15483889A669C450e51Ec978ba36

## Workflow

The workflow:

1. Reads ETH/USD price data from Chainlink Data Feeds
2. Fetches latest round information
3. Creates a price snapshot
4. Writes snapshot data to the SnapshotRecorder contract

## Local Simulation

```bash
cre workflow simulate ./my-workflow --target staging-settings
```

## Example Output

```json
{
  "token": "ETH",
  "answer": "173666000000",
  "updatedAt": "1782003216"
}
```

## Status

- Smart Contract Deployed ✅
- Workflow Implemented ✅
- Local Simulation Passing ✅
- CRE Deployment Access Pending ⏳

## Tech Stack

- Chainlink Runtime Environment (CRE)
- TypeScript
- Solidity
- Foundry
- Ethereum Sepolia
- Chainlink Data Feeds