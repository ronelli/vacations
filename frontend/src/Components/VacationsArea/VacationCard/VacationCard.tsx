import { Card, CardHeader, CardContent, IconButton, Typography } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import FollowIcon from "../FollowIcon/FollowIcon";
import store from "../../../Redux/Store";
import DeleteIcon from '@material-ui/icons/Delete';
import { vacationDeletedAction } from "../../../Redux/VacationState";
import jwtAxios from "../../../Services/jwtAxios";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Box from '@material-ui/core/Box';
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notify";
import FollowModel from "../../../Models/FollowModel";
import { useEffect, useState } from "react";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const history = useHistory();
    const [numOfFollowers, setNumOfFollowers] = useState<number>();
    const [FollowStatus, setFollowStatus] = useState<boolean>();
    
    //when component mounted: 1. it will get the number of follower of the specific vacation
    //                        2. then it will get user following status (following or not)
    useEffect(() => {
        jwtAxios.get<FollowModel[]>(globals.followsUrl + props.vacation.vacationId)
        .then(response => setNumOfFollowers(response.data.length))
        .then(()=> jwtAxios.get(`${globals.followsUrl}/${store.getState().UserState.user.uuid}/${props.vacation.vacationId}`))
        .then(response => (response.data.length > 0) ? setFollowStatus(true) : setFollowStatus(false))
        .catch(err => notify.error(err));
    });

    async function deleteVacation(vacationId: number) {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await jwtAxios.delete<VacationModel>(globals.vacationsUrl + vacationId);
            store.dispatch(vacationDeletedAction(vacationId));
            store.getState().UserState.vacationsService.socket.emit("delete-from-admin", vacationId);
            history.push('/vacations');
        }
        catch(err) {
            notify.error(err);
        }
    }

    const stopFollowing = async () => {
        await jwtAxios.delete(`${globals.followsUrl}/${store.getState().UserState.user.uuid}/${props.vacation.vacationId}`);
    }
    const startFollowing = async () => {
        await jwtAxios.post(globals.followsUrl + store.getState().UserState.user.uuid, props.vacation);
    }

    //updates number of followers of the current vacation.
    async function updateFollowers() {
        if(FollowStatus) {
            await stopFollowing();
            setFollowStatus(false);
        }
        else {
            await startFollowing();
            setFollowStatus(true);
        }
        const updatedFollowNumber = await jwtAxios.get<FollowModel[]>(globals.followsUrl + props.vacation.vacationId);
        await setNumOfFollowers(updatedFollowNumber.data.length);
    }

    //info about subheader that exists in 'CardHeader'
    const subtitle = (
        <div>
            <span>Check In: {props.vacation.checkIn}</span> <br />
            <span>Check Out: {props.vacation.checkOut}</span>    
        </div>
    );
    return (
        <Card elevation={10} className="VacationCard box">
            <CardHeader title={props.vacation.destination} subheader={subtitle} >
            </CardHeader>
            <CardContent>
                <Typography className="descriptionBox" variant="body2" component="p">
                    {props.vacation.description}
                </Typography>
                <img alt={props.vacation.photoPath} src={globals.vacationsUrl + "images/" + props.vacation.photoPath} /><br />
                <Box fontWeight="fontWeightBold" m={2} position="relative" bottom={0}  >
                    {props.vacation.price} $
                </Box>
            
                {store.getState().UserState.user.isAdmin === 1 &&
                <div className="editVacationBox">
                    <IconButton onClick={()=> deleteVacation(props.vacation.vacationId)}>
                        <DeleteIcon />
                    </IconButton>
                    <NavLink to={"/vacations/edit/" + props.vacation.vacationId} >
                        <IconButton >
                            <EditIcon />
                        </IconButton>
                    </NavLink>
                </div>}
                <div className="followers">
                    <span>{numOfFollowers}</span>
                    <span onClick={() => updateFollowers()}>{store.getState().UserState.user.isAdmin === 0  && <FollowIcon user={store.getState().UserState.user} vacation={props.vacation} />}</span>
                </div>

            </CardContent>
        </Card>
    );
}

export default VacationCard;
