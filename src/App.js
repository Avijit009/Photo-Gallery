import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import MainComponent from './components/MainComponent.js';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <MainComponent />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
