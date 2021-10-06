import { render } from "react-dom";
import App from "./App.js";
import { Provider } from "react-redux";
import { store } from "./globals/redux/store/index";
import GlobalStates from "./globals/state/GlobalStates.jsx";

render(
	<Provider store={store}>
		<GlobalStates>
			<App />
		</GlobalStates>
	</Provider>,
	document.getElementById("root")
);
