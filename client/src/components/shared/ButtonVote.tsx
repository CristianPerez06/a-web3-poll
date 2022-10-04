import { Button, Spinner } from "react-bootstrap";

export interface ButtonVoteProps {
  text: string;
  onClick: (value: boolean) => Promise<void>;
  loading?: boolean;
}

type Component = (props: ButtonVoteProps) => JSX.Element;

const ButtonVote: Component = (props) => {
  const { text, onClick, loading } = props;

  return (
    <Button variant="primary" onClick={() => onClick(false)} disabled={loading}>
      {loading && (
        <span style={{ marginRight: 10 + "px" }}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </span>
      )}
      {`Vote ${text}`}
    </Button>
  );
};

export default ButtonVote;
