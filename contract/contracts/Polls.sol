// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./VoteMapping.sol";

contract Polls {
    using VoteMapping for VoteMapping.Map;

    uint count = 0;
    VoteMapping.Map private map;

    function vote(bool _value) public {
        map.set(msg.sender, _value);
    }

    function getVoteByAddress(address addr) public view returns (string memory) {
        if (!map.inserted[addr]) {
            return '';
        }

        return map.values[addr] == true ? 'true' : 'false';
    }

    function getVotes() public view returns (address[] memory, bool[] memory) {
        uint mapSize = map.size();

        address[] memory addresses = new address[](mapSize);
        bool[] memory values = new bool[](mapSize);

        for (uint i = 0; i < mapSize; i++) {
            address key = map.getKeyAtIndex(i);
            bool v = map.values[key];

            addresses[i] = key;
            values[i] = v;
        }

        return (addresses, values);
    }
}