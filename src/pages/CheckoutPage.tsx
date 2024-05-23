import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
	return (
		<div className="checkout-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<h2>Sucess !!!</h2>
				<h2>Your order is created. Thank you for shopping.</h2>
				<button
					className="order-btn"
					onClick={() => navigate("/orders")}
				>
					View my orders
				</button>
			</div>
			<Footer />
		</div>
	);
};

export default CheckoutPage;
