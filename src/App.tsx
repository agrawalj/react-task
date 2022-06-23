import Table from "./components/Pages/Table";
import Form from "./components/Pages/Form";
import { Provider, } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { store } from './store'
import './App.scss';


function RequireAuth({ children, auth }: { children: JSX.Element, auth: boolean }) {
    if (!auth) {
        return <Navigate to="/" />;
    }
    return children;
}

const { token } = store.getState()



export default function () {
    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Table />} />
                        <Route
                            path="/edit/:uid"
                            element={
                                <RequireAuth auth={token}>
                                    <Form />
                                </RequireAuth>
                            }
                        />
                        <Route path="/add" element={<Form />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div >
    )
}