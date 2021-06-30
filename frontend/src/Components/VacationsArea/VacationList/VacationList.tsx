import { Component } from "react";
import { History } from "history";
import { Socket } from "socket.io-client";
import { NavLink } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { Container, Grid } from "@material-ui/core";
import store from "../../../Redux/Store";
import { vacationsDownloadedAction } from "../../../Redux/VacationState";
import { refreshPageAppear, userLoggedOut } from "../../../Redux/UserState";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import VacationsService from "../../../Services/VacationsService";
import globals from "../../../Services/Globals";
import "./VacationList.css";

interface VacationListProps {
    history: History;
}

interface VacationListState {
    vacations: VacationModel[];
}

class VacationList extends Component<VacationListProps, VacationListState>{
    
    private vacationsService: VacationsService = new VacationsService();
    public constructor(props:VacationListProps) {
        super(props);
        this.state = { vacations: []};
    }
    
    //socket on events functions:
    public socketOnEvents(socket: Socket){
        socket.on('add-vacation-from-server', vacation => {
            const vacations = [...this.state.vacations];
            vacations.push(vacation);
            this.setState({vacations});
        });

        socket.on('remove-from-server', vacationId => {
            const vacations = [...this.state.vacations];
            const indexToDelete = vacations.findIndex(v => v.vacationId === vacationId);
            if(indexToDelete === -1) return;
            vacations.splice(indexToDelete, 1);
            this.setState({vacations});
        });
        
        socket.on("update-from-server", updatedVacation => {
            const vacations = [...this.state.vacations];
            const indexToUpdate = vacations.findIndex(v => v.vacationId === updatedVacation.vacationId);
            vacations[indexToUpdate] = updatedVacation;
            this.setState({vacations});
        })
    }
    
    public async componentDidMount() {
        try {
            if(!store.getState().UserState.user) {
                notify.error("You are not logged in.");
                this.props.history.push('/login');
                return;
            }
            if(store.getState().UserState.vacationsService.socket === undefined) {
                await store.dispatch(refreshPageAppear(store.getState().UserState.user));
            }
            const socket = store.getState().UserState.vacationsService.socket;
            if(this.state.vacations.length === 0) {
                const vacations = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl + store.getState().UserState.user.uuid);
                await this.setState({vacations: vacations.data});
                store.dispatch(vacationsDownloadedAction(vacations.data));
            }
            //sockets function
            this.socketOnEvents(socket);
        }
        catch(err) {
            if(err.response.data === "Your login session has expired."){
                store.dispatch(userLoggedOut());
                this.props.history.push('/login');
            }
            notify.error(err);
        }
    }

    public componentWillUnmount() {
        //Handle with 'Can't perform a React state update on an unmounted component' warning.
        this.setState = (state,callback) =>{
            return;
        };
    }
    public render(): JSX.Element {
        return (
            <div className="VacationList">
                <NavLink to="/new/vacation" exact>
                     {(store.getState()?.UserState.user && store.getState().UserState.user?.isAdmin === 1) && <Add className="AddSign"/> }
                </NavLink>
				<Container>
                    <Grid container spacing={3}>
                        {this.state.vacations.map(v => <Grid item xs={12} sm={6} md={3} key={v.vacationId}> <VacationCard vacation={v} key={v.vacationId}/> </Grid>)}
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default VacationList;