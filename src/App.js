
import { ToastContainer } from "react-toastify";
import NavigationBar from "./commons/NavigationBar";
import GlobalStates from "./globals/state/GlobalStates";
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './commons/MainRouter';

const App = () => {
	return (
		<BrowserRouter>
			<ToastContainer />
			<GlobalStates>
				<NavigationBar />

				<MainRouter />
			</GlobalStates>
		</BrowserRouter>
	);
};

export default App;
