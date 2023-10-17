import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes component
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-5">
                <Container>
                    <Routes> {/* Wrap Routes around your Route components */}

                        {/* exact prop is used to specify that the route should only be matched when the URL path matches exactly, and not just partially.*/}
                        <Route path='/' element={<HomeScreen />} exact /> {/* URL ("/") and renders the HomeScreen component when the URL matches exactly */}
                        <Route path='/product/:id' element={<ProductScreen/>} exact /> {/* URLs with a path that starts with "/product/" followed by a dynamic parameter ":id. To access that value use  useParams() hook  */}
                        <Route path='/cart/:id?' element={<CartScreen/>} exact /> {/* Use the "element" prop */}
                        <Route path='/login' element={<LoginScreen/>} /> {/* Use the "element" prop */}
                        <Route path='/register' element={<RegisterScreen/>} /> {/* Use the "element" prop */}
                        <Route path='/profile' element={<ProfileScreen/>} /> {/* Use the "element" prop */}
                        <Route path='/shipping' element={<ShippingScreen/>} /> {/* Use the "element" prop */}
                        <Route path='/payment' element={<PaymentScreen/>} /> {/* Use the "element" prop */}
                        <Route path='/placeorder' element={<PlaceOrderScreen/>} /> {/* Use the "element" prop */}
                        <Route path='/order/:id' element={<OrderScreen/>} /> {/* Use the "element" prop */}
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
