import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList //This line uses object destructuring to extract specific properties from the productList object.





    const location = useLocation()
    const keyword = location.search ? '?' + location.search.split('?')[1] : ''
    console.log(keyword)

    // Some hooks, like useEffect and useCallback have 2 arguments. The first one is a callback (a function),
    // and the second one is the dependency array. It takes the form of an array of variables.
    // https://devtrium.com/posts/dependency-arrays
    // The dependency array basically tells the hook to "only trigger when the dependency array changes".
    // In the above example, it means "run the callback every time the counter variable changes".
    useEffect(() => {
        dispatch(listProducts(keyword)) // loading data and dispatching it to store ?? productListReducers
        // }, []);
    }, [dispatch, keyword]);


    // }, []); This is a very common pattern when you want to do something at the beginning of the lifecycle of a component,
    // for example to do some data fetching.


    return (
        <div>

            {!keyword && <ProductCarousel/>}
            <h1>Latest Products</h1>
            {loading ? <Loader></Loader>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>}


        </div>
    )
}

export default HomeScreen;