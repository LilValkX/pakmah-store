import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { wrapper } from "../redux/store";
import { loadconfig, loadmember } from "../services/";

function App({ Component, pageProps }) {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(loadmember());
    // }, [dispatch]);
    useEffect(() => {
        dispatch(loadmember());
        dispatch(loadconfig());
    }, [dispatch]);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default wrapper.withRedux(App);
