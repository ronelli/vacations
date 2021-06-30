import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState { 
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

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
            <div className="AuthMenu">
				{
                    this.state.user && 
                    <>
                        <span>Hello {this.state.user.firstName + " " + this.state.user.lastName}</span>
                        <span> | </span>
                        <NavLink to="/logout" exact>Log out</NavLink>
                    </>
                }
                {
                    !this.state.user &&
                    <>
                        <span>Hello Guest</span>
                        <span> | </span>
                        <NavLink to="/login" exact>Log In</NavLink>
                        <span> | </span>
                        <NavLink to="/register" exact>Register</NavLink>
                    </>
                }
            </div>
        );
    }
}

export default AuthMenu;
