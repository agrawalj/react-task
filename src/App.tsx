import Table from "./components/Pages/Table";
import Form from "./components/Pages/Form";
import { Provider } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { store } from './store'
import './App.scss';

export default function () {
    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Table />} />
                        <Route path="/edit/:uid" element={<Form />} />
                        <Route path="/add" element={<Form />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    )
}