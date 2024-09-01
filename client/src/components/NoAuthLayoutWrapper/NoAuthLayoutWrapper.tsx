import { FC } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { NoAuthLayoutWrapperProps } from "./models";

const NoAuthLayoutWrapper: FC<NoAuthLayoutWrapperProps> = ({ children }) => {
  return (
    <Container fluid className="p-5">
      <div className="p-4">
        <h3>
          <Link to="/" className="text-black">
            Chat App
          </Link>
        </h3>
      </div>
      <div>{children}</div>
    </Container>
  );
};

export default NoAuthLayoutWrapper;
