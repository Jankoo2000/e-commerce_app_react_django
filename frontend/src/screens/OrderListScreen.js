import {useDispatch, useSelector} from "react-redux";
import {deleteUser, listUsers} from "../actions/userActions";
import {useEffect} from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useNavigate} from "react-router-dom";
import {listOrders} from "../actions/orderActions";


function OrderListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const orderList = useSelector(state => state.orderList)
    const {orders, error, loading} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    // to prevent no admin going to get list of users
    useEffect(() => {
        if (userInfo && userInfo.isAdmin)
            dispatch(listOrders())
        else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <div>
            <h1>ORDERS</h1>
            {loading
                ? <Loader/>
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            {orders && orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.email}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.substring(0, 10)}</td>
                                    <td>{order.isPaid
                                        ? (order.paidAt.substring(0, 10))
                                        : (<i className='fas fa-times' style={{color: 'red'}}></i>)}
                                    </td>

                                    <td>{order.isDelivered
                                        ? (order.deliveredAt && order.deliveredAt.substring(0, 10))
                                        : (<i className='fas fa-times' style={{color: 'red'}}></i>)}
                                    </td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='dark' className='btn-sm'>
                                                DETAILS
                                            </Button>
                                        </LinkContainer>

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )
            }
        </div>
    )
}

export default OrderListScreen