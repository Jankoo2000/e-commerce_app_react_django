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

                        <div className="news-icon">
                            <LinkContainer to='/news'>
                                <Nav.Link>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="30"
                                        height="30"
                                    >
                                        <path
                                            d="M20 5v14H4V5h16m0-2H4c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2m-2 12H6v2h12v-2m-8-8H6v6h4V7m2 2h6V7h-6v2m6 2h-6v2h6v-2z"/>
                                    </svg>
                                </Nav.Link>
                            </LinkContainer>
                        </div>

                        <div className="curr-icon">
                            <LinkContainer to='/currency'>
                                <Nav.Link>
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        height="30"
                                        width="30"

                                    >
                                        <path
                                            d="M0 5a5.002 5.002 0 004.027 4.905 6.46 6.46 0 01.544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 00-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 014.97-3.113A5.002 5.002 0 000 5zm16 5.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>
                                    </svg>
                                </Nav.Link>
                            </LinkContainer>
                        </div>

                        <div className="flight-icon">
                            <LinkContainer to='/flights'>
                                <Nav.Link>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="30"
                                        height="30"
                                    >
                                        <path
                                            d="M9.55 9.63l1.35 2.59c.6-1.05 1.51-1.91 2.6-2.48l-.77-3.29 3.89-3.89c.58-.59.58-1.56 0-2.122s-1.54-.586-2.12 0L10.61 4.33l-9.2-2.12L0 3.62 7.43 7.5l-3.89 3.9-2.48-.35L0 12.11l3.18 1.76 1.77 3.19L6 16l-.34-2.5 3.89-3.87M16.5 11c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L22 22.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 000 5 2.5 2.5 0 000-5"/>
                                    </svg>
                                </Nav.Link>
                            </LinkContainer>
                        </div>


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


