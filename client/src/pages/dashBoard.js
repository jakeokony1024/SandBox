import React, { Component } from 'react'
import Nav from '@bit/react-bootstrap.react-bootstrap.nav'
import Button from '@bit/react-bootstrap.react-bootstrap.button'
import Form from '@bit/react-bootstrap.react-bootstrap.form'
import FormControl from '@bit/react-bootstrap.react-bootstrap.form-control'
import Navbar from '@bit/react-bootstrap.react-bootstrap.navbar'
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

import { Link } from "react-router-dom";

class Example extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" style={{ minWidth: 700 }}>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                <br />
                <Navbar bg="primary" variant="dark" style={{ minWidth: 700 }}>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar>

                <br />
                <Navbar bg="light" variant="light" style={{ minWidth: 700 }}>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default () => (<div><ReactBootstrapStyle /><Example /></div>)