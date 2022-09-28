const VoteMapping = artifacts.require("VoteMapping.sol");
const Polls = artifacts.require("Polls.sol");

module.exports = (deployer, _network, accounts) => {
  deployer.deploy(VoteMapping);
  deployer.link(VoteMapping, Polls);
  deployer.deploy(Polls);
};
