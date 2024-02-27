import CategoriesGrid from "../features/Category/CategoriesGrid";
import Footer from "./Footer";
import NavBar from "./NavBar";

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
