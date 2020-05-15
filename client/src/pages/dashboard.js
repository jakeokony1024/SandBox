import React, { useState } from 'react';
import {
    StreamApp,
    NotificationDropdown,
    FlatFeed,
    LikeButton,
    Activity,
    CommentList,
    CommentField,
    StatusUpdateForm,
} from "react-activity-feed";

// nav bar
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';


// col and row
import { Container, Row, Col } from 'reactstrap';
import GamesPage from "../pages/gamesPage"
import UserInfo from "../components/UserInfo"


import SearchForm from "../components/SearchForm";
import axios from "axios";
import api from "../utils/api";
import Button from "components/CustomButtons/Button.js";
import Card from "../components/Card/Card";

import DeleteBtn from "components/DeleteBtn";
import { Link } from "react-router-dom"

const Example = (props) => {


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">SandBox</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/ProfilePage/">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Sign Out</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {/* main content */}
            <Container>
                <Row>
                    <Col-md-3>
                        populated with chat feeds to switch between
                    </Col-md-3>

                    <col-md-6>
                        chat api and messages from selected feed
                    </col-md-6>

                    <col-md-3>
                        Games list of 5 favorite games to go to the subreddit (forum) for that game.
                    </col-md-3>

                </Row>
            </Container>
        </div>
    );
}




export default Example;