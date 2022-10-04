import Spinner from "react-bootstrap/Spinner";

export interface LoadingProps {
  isSmall?: boolean;
}

type Component = (props: LoadingProps) => JSX.Element;

const Loading: Component = (props) => {
  const { isSmall } = props;

  return (
    <div className="d-flex justify-content-center">
      <Spinner
        animation="border"
        variant="primary"
        {...(isSmall && { size: "sm" })}
      />
    </div>
  );
};

export default Loading;
