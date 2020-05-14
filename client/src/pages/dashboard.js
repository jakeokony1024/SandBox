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
                            <NavLink href="/profilePage/">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
              </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            <Container>
            <Row>
                <Col>
                <br></br>
                <UserInfo/></Col>
                <Col>
                {/* <StreamApp
                    apiKey={process.env.REACT_APP_CHAT_KEY}
                    appId={process.env.REACT_APP_CHAT_ID}
                    token={process.env.REACT_APP_CHAT_TOKEN}
                    >
                    <NotificationDropdown notify />
                    <StatusUpdateForm
                        feedGroup="timeline"
                        userId="user-one" />
                    <FlatFeed
                        options={{ reactions: { recent: true } }}
                        notify
                        Activity={(props) =>
                        <Activity {...props}
                            Footer={() => (
                            <div style={{ padding: '8px 16px' }}>
                                <LikeButton {...props} />
                                <CommentField
                                activity={props.activity}
                                onAddReaction={props.onAddReaction} />
                                <CommentList activityId={props.activity.id} />
                            </div>
                            )}
                        />
                        }
                    />
                    </StreamApp> </Col> */}</Col>
                <Col><GamesPage/></Col>
            </Row>
        </Container>
        </div>
    );
}

const rows = (props) => {
    return (
        <Container>
            <Row>
                <Col>.Friends list displayed here. switch between chatting with them.</Col>
                <Col>.Chat about whichever section you're in. game chat or friend</Col>
                <Col>populate your favorite games here</Col>
            </Row>
        </Container>
    );
}




export default Example;