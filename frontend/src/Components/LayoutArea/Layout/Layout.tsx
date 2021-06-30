
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";
import store from "../../../Redux/Store";
import { refreshPageAppear } from "../../../Redux/UserState";
import Menu from "../Menu/Menu";

function Layout(): JSX.Element {

    //useful for cases when page is refreshed.
    useEffect(() => {
        let isMounted = true;
        if(isMounted) {
            store.dispatch(refreshPageAppear(store.getState().UserState.user));
        }
        return () => {isMounted = false}
    },[])
    return (
        <BrowserRouter>
            <div className="Layout">
                <header>
                    <Header />
                </header>
                <aside>
                    <Menu />
                </aside>
                <main>
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default Layout;
