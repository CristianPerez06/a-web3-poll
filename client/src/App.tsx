import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";

import { polls } from "./abi/abi";
import Nav from "./components/Nav";

type EnvData = {
  account: string;
  contract: any;
};

const DEFAULT_ENV_DATA: EnvData = {
  account: "",
  contract: {},
};

const App = () => {
  const [envData, setEnvData] = useState(DEFAULT_ENV_DATA);
  const [error, setError] = useState("");
  const [voteSubmitted, setVoteSubmitted] = useState("");
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const [waiting, setWaiting] = useState(false);

  const getVotes = async () => {
    setWaiting(true);

    try {
      const postYes = await envData.contract.methods.getYesVotes().call();
      setYesVotes(parseInt(postYes));

      const postNo = await envData.contract.methods.getNoVotes().call();
      setNoVotes(parseInt(postNo));
    } catch (ex: any) {
      setError(ex.message);
    } finally {
      setWaiting(false);
    }
  };

  const voteYes = async () => {
    setWaiting(true);

    try {
      const gas =
        (await envData.contract.methods.voteYes().estimateGas()) * 1.5;
      const post = await envData.contract.methods.voteYes().send({
        from: envData.account,
        gas,
      });

      setVoteSubmitted(post.from);
    } catch (ex: any) {
      setError(ex.message);
    } finally {
      setWaiting(false);
    }
  };

  const voteNo = async () => {
    setWaiting(true);

    try {
      const gas = (await envData.contract.methods.voteNo().estimateGas()) * 1.5;
      const post = await envData.contract.methods.voteNo().send({
        from: envData.account,
        gas,
      });
      setVoteSubmitted(post.from);
    } catch (ex: any) {
      setError(ex.message);
    } finally {
      setWaiting(false);
    }
  };

  useEffect(() => {
    const loadLocalEnvData = async () => {
      try {
        const web3 = new Web3(process.env.REACT_APP_LOCAL_PROVIDER || "");
        const accounts = await web3.eth.getAccounts();
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contract = new web3.eth.Contract(polls, contractAddress);
        setEnvData({ account: accounts[0], contract: contract });
      } catch (ex: any) {
        setError(ex.message);
      }
    };

    const loadEnvData = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(Web3.givenProvider);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contract = new web3.eth.Contract(polls, contractAddress);

        setEnvData({ account: accounts[0], contract: contract });
      } catch (ex: any) {
        setError(ex.message);
      }
    };

    const setAppEnvData = async () => {
      const currentEnv = process.env.REACT_APP_CURRENT_ENV;

      if (currentEnv === "prod" && !window.ethereum) {
        setError("No wallet detected");
      }

      if (currentEnv === "prod" && window.ethereum) {
        loadEnvData();
      }

      if (currentEnv === "dev" || !currentEnv) {
        loadLocalEnvData();
      }
    };

    setAppEnvData();
  }, []);

  return (
    <>
      <Nav address={envData.account} />
      <div className="container">
        <h1>A polls app</h1>
        {error && <span>{error}</span>}
        {!error && (
          <div className="card">
            <h3>How do you wish to vote?</h3>

            <div className="buttonsContainer">
              <button type="button" onClick={voteYes}>
                Vote Yes
              </button>
              <button type="button" onClick={voteNo}>
                Vote No
              </button>
            </div>

            {waiting && <span>Loading ... please wait</span>}

            {!waiting && voteSubmitted && (
              <span>Vote Submitted: {voteSubmitted}</span>
            )}

            <button
              className="button getVotesButton"
              type="button"
              onClick={getVotes}
            >
              Get Votes
            </button>

            {(yesVotes > 0 || noVotes > 0) && (
              <div className="resultsContainer">
                <span>Current Results</span>

                <table>
                  <thead>
                    <tr>
                      <th>Vote</th>
                      <th># of Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Yes</td>
                      <td>{yesVotes}</td>
                    </tr>
                    <tr>
                      <td>No</td>
                      <td>{noVotes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {yesVotes === 0 && noVotes === 0 && (
              <span>There are no votes to show</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
