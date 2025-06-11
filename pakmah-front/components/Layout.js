import Navbar from "./Navbar";
import Meta from "./Meta";
import Footer from "./Footer";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
    const config = useSelector((state) => state.config);

    return (
        <>
            <div className="h-full min-h-screen">
                <Meta
                    title={config?.title_website}
                    description={config?.description_website}
                    keywords={config?.keywords_website}
                />
                <Navbar />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
}
