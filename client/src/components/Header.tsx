import { Navbar, Container } from "react-bootstrap";

export interface NavProps {
  account: string;
}

type Component = (props: NavProps) => JSX.Element;

const Header: Component = (props) => {
  const { account } = props;

  return (
    <Navbar bg="dark" variant="dark" className="shadow-lg">
      <Container className="justify-content-center">
        <Navbar.Brand>
          <h6 className="mb-0">Your connected address: {account || "-"}</h6>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
