import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { SessionContext } from '../App';
import { Button } from 'react-bootstrap';

function MoveflixNavbar() {
  const session = useContext(SessionContext);

  async function signIn() {
    try {
      // Get request token
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const requestToken = response.data.request_token;

      // Forward the user to the TMDB login page
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/authenticated`;
    } catch (error) {
      console.error(error);
    }
  }

  async function signOut() {
    try {
      await axios.delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`,
        {
          data: {
            session_id: localStorage.getItem('sessionId'),
          },
        }
      );

      localStorage.removeItem('sessionId');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src="img/logo.png" alt="moveflix" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/" relative="path">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Library" relative="path">
                <Nav.Link>Library</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Contact" relative="path">
                <Nav.Link>Contact Us</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form className="d-flex btn-search">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            {session?.userDetails.avatar.tmdb.avatar_path && (
              <img
                title={session.userDetails.username}
                src={`https://image.tmdb.org/t/p/w500${session.userDetails.avatar.tmdb.avatar_path}`}
                className="avatar-prof"
              />
            )}
            {session !== null ? (
              <Button className="btn-sign" variant="primary" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Button className="btn-sign" variant="primary" onClick={signIn}>
                Sign In
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MoveflixNavbar;
