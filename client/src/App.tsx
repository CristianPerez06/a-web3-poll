import { useState, useEffect } from "react";
import Web3 from "web3";

import { polls } from "./abi/abi";
import Header from "./components/Header";
import Loading from "./components/shared/Loading";
import Error from "./components/shared/Error";
import Main from "./components/Main";

type EnvData = {
  web3: any;
  account: string;
  contract: any;
};

const DEFAULT_ENV_DATA: EnvData = {
  web3: {},
  account: "",
  contract: {},
};

const App = () => {
  const [envData, setEnvData] = useState(DEFAULT_ENV_DATA);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadLocalEnvData = async () => {
      try {
        const web3 = new Web3(process.env.REACT_APP_LOCAL_PROVIDER || "");
        const accounts = await web3.eth.getAccounts();
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contract = new web3.eth.Contract(polls, contractAddress);
        setEnvData({ web3: web3, account: accounts[0], contract: contract });
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

        setEnvData({ web3: web3, account: accounts[0], contract: contract });
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
        setLoading(true);
        loadEnvData().then(() => setLoading(false));
      }

      if (currentEnv === "dev" || !currentEnv) {
        setLoading(true);
        loadLocalEnvData().then(() => setLoading(false));
      }
    };

    setAppEnvData();
  }, []);

  return (
    <div className="container w-100 mw-100 p-0">
      {loading && <Loading />}
      {error && <Error />}
      {envData.account && (
        <div className="app-content">
          <Header account={envData.account} />
          <Main
            web3={envData.web3}
            account={envData.account}
            contract={envData.contract}
          />
        </div>
      )}
    </div>
  );
};

export default App;
