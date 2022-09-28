import { useEffect, useState } from "react";

import { convertToVotes, Vote } from "../types/Vote";
import VotesList from "./VotesList";
import { send } from "../api/api";
import { Card } from "react-bootstrap";
import Loading from "./shared/Loading";
import Error from "./shared/Error";
import ButtonVote from "./shared/ButtonVote";

export interface MainProps {
  web3: any;
  account: string;
  contract: any;
}

type Component = (props: MainProps) => JSX.Element;

const Main: Component = (props) => {
  const { web3, account, contract } = props;
  const { methods } = contract;

  const [error, setError] = useState("");
  const [usersVote, setUsersVote] = useState("");
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);

  const vote = async (value: boolean) => {
    setVoting(true);

    const transaction = methods.vote(value);
    send(web3, account, transaction)
      .then(() => {
        const newVote: Vote = {
          addr: account,
          value: value,
        };
        setVotes((prev) => [...prev, newVote]);
        setUsersVote(value.toString());
      })
      .catch((ex: any) => {
        setError(ex.message);
      })
      .finally(() => {
        setVoting(false);
      });
  };

  useEffect(() => {
    setLoading(true);

    const getVotes = async () => {
      const list = await methods.getVotes().call();
      const convertedVotes: Vote[] = convertToVotes(list);
      setVotes(convertedVotes);
    };

    const getUsersVote = async () => {
      const usersVote = await methods.getVoteByAddress(account).call();
      setUsersVote(usersVote.toString());
    };

    setLoading(true);

    getVotes();
    getUsersVote();

    setLoading(false);
  }, [methods, account]);

  return (
    <div className="pt-5">
      <h1 className="text-center">A polls app</h1>
      {error && (
        <div className="pt-5">
          <Error />
        </div>
      )}
      {loading && (
        <div className="pt-5">
          <Loading />
        </div>
      )}
      {!loading && !error && (
        <div className="pt-4">
          <div className="d-flex justify-content-center">
            <Card className="w-50">
              <Card.Header className="w-100" as="h5">
                Your vote
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {!usersVote
                    ? "How do you wish to vote?"
                    : `Your have already voted with: ${usersVote.toUpperCase()}`}
                </Card.Text>
                {!usersVote && (
                  <div className="d-flex justify-content-evenly pt-2">
                    <ButtonVote
                      text={"true"}
                      onClick={() => vote(true)}
                      loading={voting}
                    />
                    <ButtonVote
                      text={"false"}
                      onClick={() => vote(false)}
                      loading={voting}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>

          {!loading && !error && (
            <div className="d-flex justify-content-center pt-4">
              <VotesList votes={votes} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
