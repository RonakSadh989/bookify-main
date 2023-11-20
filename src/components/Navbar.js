import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
export default function MyNav() {
  const firebase = useFirebase()
  function logout(){
    firebase.signOutUser();
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/home">Home</Nav.Link>
            <Nav.Link href="#/book/list">Add Listing</Nav.Link>
            <Nav.Link href="#/book/orders">Orders</Nav.Link>
            <Nav.Link href="#/book/booking">Bookings</Nav.Link>
            <Nav.Link href="#/register">Register</Nav.Link>
            <Nav.Link href="#/login">Login</Nav.Link>
            <Nav.Link href="#" onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Container>
        {/* <Outlet /> */}
      </Navbar>
    </div>
  );
}
