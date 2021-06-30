import { useEffect, useState } from "react";
import SVG from 'react-inlinesvg';
import { useHistory, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import { userRegisteredAction } from "../../../Redux/UserState";
import notify from "../../../Services/Notify";
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals";


function Register(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const [captcha, setCaptcha] = useState<any>([]);

    useEffect(()=> {
        jwtAxios.get(globals.authCaptchaUrl, {withCredentials: true})
        .then(response => setCaptcha(response.data))
        .catch(err => notify.error(err));   
    },[]);


    async function signUp(newUser: UserModel) {
        try {
            if(newUser.password !== newUser.confirmPassword){
                return notify.error("The password and confirmation password do not match.");
            }
            newUser.confirmPassword = null;
            const response = await jwtAxios.post(globals.registerUrl, newUser, {withCredentials: true});
            if(response){
                store.dispatch(userRegisteredAction(response.data));
                notify.success("You have been successfully registered.");
                history.push("/");
            }
        }
        catch(err) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(signUp)}>
                <h3> Register <DescriptionIcon fontSize="large" /> </h3> <br />
                <label>FirstName * </label>
                <input type="text" name="firstName" autoFocus {...register("firstName",
                    {   required: { value: true, message:"Missing first name."},
                        minLength: {value: 2, message:"First name too short."}    
                })} />
                <div>{formState.errors.firstName?.message}</div>

                <label>LastName *</label>
                <input type="text" name="lastName" {...register("lastName",
                    {   required: { value: true, message:"Missing last name."},
                        minLength: { value: 2, message:"Last name too short."}
                    })} />
                <div>{formState.errors.lastName?.message}</div>
                
                <label>Username * </label>
                <input type="text" name="username" {...register("username",
                    {   required: { value: true, message:"Missing username"},
                        minLength: { value: 4, message:"username too short."}
                    })} />
                <div>{formState.errors.username?.message}</div>
                
                <label>Password * </label>
                <input type="password" name="password" placeholder="min length - 4 letters" {...register("password",
                    {   required: { value: true, message:"Missing password"}, 
                        minLength: { value: 4, message:"password too short"},
                        maxLength: { value: 12, message:"password too long - max characters is 12."}
                    })} />
                <div>{formState.errors.password?.message}</div>
                <label>Confirm Password * </label><br />
                <input type="password" name="confirmPassword" placeholder="min length - 4 letters" {...register("confirmPassword",
                    { required: { value: true, message:"Missing password"}, 
                        minLength: { value: 4, message:"password too short"},
                        maxLength: { value: 12, message:"password too long - max characters is 12."}})} />
                <div>{formState.errors.confirmPassword?.message}</div>
                <div>
                    <SVG src={`'${captcha}'`} />
                </div>
                
                <input type="text" name="userText" placeholder="Image text..." {...register("userText", {
                    required: {value: true, message: "Must insert image text here"}})} />
                <div>{formState.errors.userText?.message}</div>
                <br />
                <Button variant="contained" color="primary" size="large" type="submit">Sign up</Button>
                <section>
                    <span>Have an account? </span>
                    <NavLink to="/login" exact>Sign in</NavLink>
                </section>
            </form>
        </div>
    );
}

export default Register;
