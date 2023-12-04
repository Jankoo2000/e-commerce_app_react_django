import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {Dropdown, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {logout} from "../actions/userActions";
import SearchBox from "./SearchBox";
import {Row, Col} from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {state, userInfo, error} = userLogin
    const dispatch = useDispatch()

    function logoutHandler() {
        dispatch(logout())
    }

    return (

        <Navbar bg="info" variant="dark" expand="lg" collapseOnSelect>
            <Container>


                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">


                    {/*tablet jest medium*/}
                    <div className="d-flex justify-content-center" style={{marginLeft: '20px', marginRight: '150px'}}>
                        <LinkContainer to='/'>
                            <Navbar.Brand>SwiftShop</Navbar.Brand>
                        </LinkContainer>
                    </div>


                    <div className="d-flex justify-content-center">
                        <SearchBox/>
                    </div>

                    <Nav className="ml-auto">

                        <div className="cart-icon">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="30"
                                         height="30"
                                         fill="currentColor"
                                         className="bi bi-cart"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                    </svg>
                                </Nav.Link>
                            </LinkContainer>
                        </div>


                        {userInfo ? (
                            <div className='person-icon-1'>
                                <NavDropdown
                                    // title={userInfo.username}
                                    title={
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="30"
                                             height="30"
                                             fill="currentColor"
                                             className="bi bi-person"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                                        </svg>
                                    }
                                    id='username'
                                    className="text-center"
                                    // style={{marginLeft: '40px'}}
                                >

                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        ) : (
                            <div className='person-icon-2'>
                                <LinkContainer to='/login' className="d-flex align-items-center justify-content-center">
                                    <Nav.Link>
                                        {/*<div className="cart-icon">*/}
                                        {/*    <i className="fas fa-sign-in"></i>*/}
                                        {/*</div>*/}
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="30"
                                             height="30"
                                             fill="currentColor"
                                             className="bi bi-person"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                                        </svg>
                                    </Nav.Link>
                                </LinkContainer>
                            </div>


                        )}


                        {userInfo && userInfo.isAdmin && (
                            <div className='admin-icon'>
                                <NavDropdown
                                    title={
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             width="30"
                                             height="30"
                                             fill="currentColor"
                                             className="bi bi-person-gear"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                        </svg>}
                                    id='adminmenu'
                                    className="text-center"
                                    style={{marginLeft: '40px'}}
                                >
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>


    )


}

export default Header


