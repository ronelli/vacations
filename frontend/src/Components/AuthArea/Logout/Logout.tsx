import { useEffect } from "react";
import { useHistory } from "react-router";
import store from "../../../Redux/Store";
import { userLoggedOut } from "../../../Redux/UserState";

function Logout(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
        store.dispatch(userLoggedOut());
        history.push("/home");
        
    });
    return null;
}

export default Logout;
