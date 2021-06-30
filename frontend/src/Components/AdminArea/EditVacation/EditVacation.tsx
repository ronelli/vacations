import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import store from "../../../Redux/Store";
import { vacationUpdatedAction } from "../../../Redux/VacationState";
import { userLoggedOut } from "../../../Redux/UserState";
import VacationModel from "../../../Models/VacationModel";
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals"
import notify from "../../../Services/Notify";
import "./EditVacation.css";


function EditVacation(): JSX.Element {
    const location = useLocation();
    const history = useHistory();
    
    async function editVacation(updatedDetails: VacationModel) {
        try {
            const updatedVacation = await jwtAxios.post<VacationModel>(globals.rootUrl + "/api" + location.pathname, VacationModel.convertToFormData(updatedDetails));
            store.dispatch(vacationUpdatedAction(updatedVacation.data));
            store.getState().UserState.vacationsService.socket.emit("update-from-admin", updatedVacation.data);
            history.push("/vacations");
        }
        catch(err) {
            if(err.response.data === "Your login session has expired."){
                store.dispatch(userLoggedOut());
                history.push('/login');
            }
            notify.error(err);
        }  
    }
    const {register, handleSubmit,  formState:{ errors } } = useForm<VacationModel>();
    
    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(editVacation)}>
                <label>Destination</label> <br />
                <input type="text" {...register("destination")} placeholder="Destination" /> <br />
                <label>Check In</label> <br />
                <input type="date" {...register("checkIn")} placeholder="Check In" /> <br />
                <label>Check Out</label> <br />
                <input type="date" {...register("checkOut")} placeholder="Check Out" /> <br />
                <label>Price</label> <br />
                <input type="number" name="price" placeholder="Price" {...register("price", {
                    min: { value: 0, message:"Price can't be negative"}})}  /> <br />
                <span> {errors.price?.message} </span> <br /><br />
                <label>Description</label> <br />
                <textarea name="description" placeholder="description" {...register("description", {
                    minLength: { value: 4, message:"Description too short - minimum 4 letters"}
                })}  /> <br />
                <span> {errors.description?.message} </span> <br />
                <input type="file" accept="image/*" {...register("image", {required:false})} /> <br />
                <button>Update Details</button>
            </form>
        </div>
    );
}

export default EditVacation;
