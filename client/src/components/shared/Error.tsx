export interface ErrorProps {
  // isSmall?: boolean;
}

type Component = (props: ErrorProps) => JSX.Element;

const Error: Component = (props) => {
  // const { isSmall } = props;

  return (
    <div className="d-flex justify-content-center">
      <span className="text-danger">Oops... Something went wrong</span>
    </div>
  );
};

export default Error;
