import "./Nav.css";

export interface NavProps {
  address: string;
}

type Component = (props: NavProps) => JSX.Element;

const Nav: Component = (props) => {
  const { address } = props;

  return (
    <div className="address">Your connected address: {address || "-"}</div>
  );
};

export default Nav;
