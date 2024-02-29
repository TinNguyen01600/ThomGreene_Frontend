import CategoriesGrid from "../components/Category/CategoriesGrid";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
	return (
		<div className="home-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<CategoriesGrid />
			</div>
			<div className="footer">
                <Footer />
			</div>
		</div>
	);
};

export default Home;
