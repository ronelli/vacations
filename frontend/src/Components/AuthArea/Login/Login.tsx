import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import store from "../../../Redux/Store";
import { userLoggedIn } from "../../../Redux/UserState";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import globals from "../../../Services/Globals";

function Login(): JSX.Element {
    const history = useHistory();
    const {register, handleSubmit, formState} = useForm();
    
    async function login(credentials: CredentialsModel) {
        try {
            const response = await jwtAxios.post<UserModel>(globals.loginUrl, credentials);
            store.dispatch(userLoggedIn(response.data));
            notify.success("Logged in successfully!");
            history.push("/");
        }
        catch(err) {
           notify.error(err);
        }
    }
    return (
        <div className="Login">
			<form onSubmit={handleSubmit(login)}>
                <h3>Login </h3> 
                <label>username * </label>
                <input type="text" name="username" placeholder="min length - 4 letters" {...register("username", 
                    {   required: { value: true, message:"Missing username"},
                        minLength: { value: 4, message:"username too short"}
                })}/>
                <div>{formState.errors.username?.message}</div>
                <br />
                <label>password * </label>
                <input type="password" name="password" placeholder="min length - 4 letters"  {...register("password", 
                    {   required: { value: true, message:"Missing password"}, 
                        minLength: { value: 4, message:"password too short"},
                        maxLength: { value: 12, message:"password too long - max characters is 12."}
                })} />
                <div>{formState.errors.password?.message}</div>
                <br />
                <Button variant="contained" color="primary" size="large" type="submit">Login</Button>
                <section>
                    <span>Create an account? </span>
                    <NavLink to="/register" exact>Sign up</NavLink>
                </section>
            </form>
        </div>
    );
}

export default Login;
