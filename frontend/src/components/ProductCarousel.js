import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listTopProducts} from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";


function ProductCarousel() {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const {error, loading, products} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch]);


    return (
        loading ? <Loader/>
            : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <Carousel pause='hover' className='bg-gradient'>
                        {products.map(product => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className='center-image' // Add this className
                                    />
                                    <Carousel.Caption className='carousel-caption'>
                                        <h4 className='responsive-h4'>{product.name} (${product.price})</h4>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>


                )
    )
}

export default ProductCarousel