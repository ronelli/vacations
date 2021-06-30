import { Component } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import { Unsubscribe } from "redux";

interface AuthMenuState { 
    user: UserModel;
}

class Menu extends Component <{}, AuthMenuState> {

    private unsubscribe: Unsubscribe;
    public constructor(props:{}) {
        super(props);
        this.state = {user: store.getState().UserState.user}
    }

    public componentDidMount(): void {
        this.unsubscribe = store.subscribe(() => this.setState({ user: store.getState().UserState.user}));
    }
    
    public componentWillUnmount():void {
        this.unsubscribe();
    }

    public render(): JSX.Element {
        return (
            <div className="Menu">
			<nav>
                <NavLink to="/home" exact>Home</NavLink>
                <NavLink to="/vacations" exact>Vacations</NavLink>
                {   
                    store.getState()?.UserState?.user &&
                    store.getState().UserState.user.isAdmin === 1 && 
                    <NavLink to="/reports" exact>Reports</NavLink>
                }
            </nav>
        </div>
        );
    }
}

export default Menu;
