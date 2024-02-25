import CategoriesGrid from "../features/Category/CategoriesGrid";
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
				<p>Footer</p>
			</div>
		</div>
	);
};

export default Home;
