// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Polls {
    // store the addresses of voters on the blockchain in these 2 arrays
    address[] votedYes;
    address[] votedNo;

    function voteYes() public {
        votedYes.push(msg.sender);
    }

    function voteNo() public {
        votedNo.push(msg.sender);
    }

    function getYesVotes() public view returns (uint) {
        return votedYes.length;
    }

    function getNoVotes() public view returns (uint) {
        return votedNo.length;
    }
}