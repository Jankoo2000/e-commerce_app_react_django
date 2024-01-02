import {useDispatch, useSelector} from "react-redux";
import {deleteUser, listUsers} from "../actions/userActions";
import {useEffect} from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Col, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useNavigate} from "react-router-dom";
import {createProduct, deleteProduct, listProducts} from "../actions/productActions";
import {CREATE_PRODUCT_RESET} from "../constants/productConstants";


function ProductListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        dispatch({type: CREATE_PRODUCT_RESET})

        if (!userInfo && userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }


    }, [dispatch, navigate, userInfo, successDelete, successCreate]);

    function deleteHandler(id) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            // deleteProduct(id) without dispatch won't work
            dispatch(deleteProduct(id))
            console.log('product deleted: ' + id)
        }
    }

    function createProductHandler() {
        dispatch(createProduct())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col md={10}>
                    <h1>Products</h1>
                </Col>
                <Col md={2} className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {errorCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}


            {loading
                ? <Loader/>
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>

                            </thead>

                            <tbody>
                            {/*/!*{users.map((user) => (*!/*!/ thath does not work and i don't know why */}
                            {products && products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm'
                                                onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
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

export default ProductListScreen