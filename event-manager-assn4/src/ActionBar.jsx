import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./ActionBar.css";

const ActionBar = () => {
  return (
    <Navbar className="action-bar" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>EVENT_ually</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default ActionBar;
