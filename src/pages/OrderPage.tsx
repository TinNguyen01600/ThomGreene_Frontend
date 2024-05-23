import { useEffect } from "react";
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllOrdersOfUserAsync } from "../redux/slices/orderSlice";

const OrderPage: React.FC = () => {
    const orders = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllOrdersOfUserAsync());
    }, [dispatch]);

    return (
        <div className="order-page">
            <div className="navbar">
                <NavBar />
            </div>
            <div className="main">
                Order page
            </div>
            <Footer />
        </div>
    )
}

export default OrderPage