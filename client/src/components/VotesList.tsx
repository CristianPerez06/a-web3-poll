import { Card, Table } from "react-bootstrap";
import { Vote } from "../types/Vote";

export interface VotesListProps {
  votes: Vote[];
}

type Component = (props: VotesListProps) => JSX.Element;

const VotesList: Component = (props) => {
  const { votes } = props;

  return (
    <Card>
      <Card.Header className="w-100" as="h5">
        Current Results
      </Card.Header>
      <Card.Body>
        {votes.length === 0 ? (
          <Table striped>
            <thead>
              <tr>
                <th>There are no votes to show.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">-</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Address</th>
                <th>Vote</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((vote, i) => {
                return (
                  <tr key={vote.addr}>
                    <td>{i}</td>
                    <td>
                      <span
                      // style={{
                      //   display: "inline-block",
                      //   whiteSpace: "nowrap",
                      //   overflow: "hidden",
                      //   textOverflow: "ellipsis",
                      // }}
                      >
                        {vote.addr}
                      </span>
                    </td>
                    <td>
                      <span>{vote.value.toString()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default VotesList;
