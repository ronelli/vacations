
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Socket } from "socket.io-client";
import store from "../../../Redux/Store";
import { vacationAddedAction } from "../../../Redux/VacationState";
import { userLoggedOut } from "../../../Redux/UserState";
import VacationModel from "../../../Models/VacationModel";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import globals from "../../../Services/Globals";
import "./AddVacation.css";


function AddVacation(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState:{ errors } } = useForm<VacationModel>();
    const socket:Socket = store.getState().UserState.vacationsService.socket;
    
    async function addVacation(vacation: VacationModel) { 
        try {
            if(!store.getState().UserState.user || !socket) {
                notify.error("You are not logged in.");
                history.push('/login');
                return;
            }
            const response = await jwtAxios.post<VacationModel>(globals.vacationsUrl, VacationModel.convertToFormData(vacation));
            const addedVacationId = response.data;
            const addedVacation = await jwtAxios.get<VacationModel>(`${globals.vacationsUrl}vacation/${addedVacationId}`);
            //emit addedVacation data to the server.
            socket.emit("add-vacation-from-admin", addedVacation.data);
            store.dispatch(vacationAddedAction(addedVacation.data));
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

    return (
        <div className="AddVacation">
			<form onSubmit={handleSubmit(addVacation)}>
                <label>Destination:</label><br />
                <input type="text" name="destination" placeholder="destination" {...register("destination", {required: true})}/> <br />
                { errors.destination?.type === "required" && <span>Missing destination</span>}<br /> 
                <label>Check In:</label> <br />
                <input type="date" name="checkIn" {...register("checkIn", {required: true})}/> <br />
                { errors.checkIn?.type === "required" && <span>Missing 'check in' date</span>} <br />
                <label>Check Out:</label> <br />
                <input type="date" name="checkOut"  {...register("checkOut", {required: true})} /> <br />
                { errors.checkOut?.type === "required" && <span>Missing 'check out' date</span>} <br />
                <label>Price:</label> <br />
                <input type="number" name="price" placeholder="price" {...register("price", {
                    required: { value: true, message:"Missing price"},
                    min: { value: 0, message:"Price can't be negative"}
                    })}/> <br />
                <span> {errors.price?.message} </span><br />
                <label>Description:</label> <br />
                <textarea name="description" placeholder="description"  {...register("description", {
                    required: { value: true, message:"Missing description"}, 
                    minLength: { value: 4, message:"Description too short - minimum 4 letters"}}
                )}></textarea> <br />
                <span> {errors.description?.message} </span> <br />

                <label>Photo:</label> <br />
                <input type="file" accept="image/*" {...register("image", {required:false})} /> <br />
                <button>Add Vacation</button>
            </form>
        </div>
    );
}

export default AddVacation;
