import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; // Import Routes component
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
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import FlightsScreen from "./screens/FlightsScreen";
import CurrencyScreen from "./screens/CurrencyScreen";
import NewsScreen from "./screens/NewsScreen";

function App() {
    return (
        <Router>
            <Header/>

            <main className="py-5">
                <Container>
                    <Routes> {/* Wrap Routes around your Route components */}

                        {/* exact prop is used to specify that the route should only be matched when the URL path matches exactly, and not just partially.*/}
                        <Route path='/' element={<HomeScreen/>}
                        /> {/* URL ("/") and renders the HomeScreen component when the URL matches exactly */}
                        <Route path='/product/:id' element={<ProductScreen/>}
                               exact/> {/* URLs with a path that starts with "/product/" followed by a dynamic parameter ":id. To access that value use  useParams() hook  */}
                        <Route path='/cart/:id?' element={<CartScreen/>} exact/>
                        <Route path='/login' element={<LoginScreen/>}/>
                        <Route path='/register' element={<RegisterScreen/>}/>
                        <Route path='/profile' element={<ProfileScreen/>}/>
                        <Route path='/shipping' element={<ShippingScreen/>}/>
                        <Route path='/payment' element={<PaymentScreen/>}/>
                        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
                        <Route path='/order/:id' element={<OrderScreen/>}/>

                        <Route path='/flights' element={<FlightsScreen/>}/>
                        <Route path='/currency' element={<CurrencyScreen/>}/>
                        <Route path='/news' element={<NewsScreen/>}/>


                        <Route path='/admin/userlist' element={<UserListScreen/>}/>
                        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>

                        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
                        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
                        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
                    </Routes>
                </Container>
            </main>

            <Footer/>

        </Router>
    );
}

export default App;
