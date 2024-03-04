import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

const CheckoutPage: React.FC = () => {
    return (
        <div className="checkout-page">
            <div className="navbar">
                <NavBar />
            </div>
            <div className="main">
                <h2>Sucess !!!</h2>
                <h2>Thank you for shopping.</h2>
            </div>
            <Footer />
        </div>
    )
}

export default CheckoutPage