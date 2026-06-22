// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SnapshotRecorder {
    struct Record {
        string token;
        uint256 price;
        uint256 blockNumber;
        uint256 timestamp;
    }

    address public immutable forwarder;

    Record[] public records;

    event SnapshotStored(
        string token,
        uint256 price,
        uint256 blockNumber,
        uint256 timestamp
    );

    modifier onlyForwarder() {
        require(
            msg.sender == forwarder,
            "Only Forwarder"
        );
        _;
    }

    constructor(address _forwarder) {
        forwarder = _forwarder;
    }

    function snapshot(
        string calldata token,
        uint256 price,
        uint256 blockNumber,
        uint256 timestamp
    ) external onlyForwarder {
        records.push(
            Record(
                token,
                price,
                blockNumber,
                timestamp
            )
        );

        emit SnapshotStored(
            token,
            price,
            blockNumber,
            timestamp
        );
    }

    function totalRecords()
        external
        view
        returns (uint256)
    {
        return records.length;
    }
}