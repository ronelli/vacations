import UserModel from "../Models/UserModel";
import VacationsService from "../Services/VacationsService";
export class UserState {
    public user: UserModel = null;
    public vacationsService: VacationsService = new VacationsService();
    public constructor() {
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.vacationsService.disconnectFromServer();
        if(user) {
            this.user = user;
        }
    }
    
}

export enum UserActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "LoggedIn",
    UserLoggedOut = "LoggedOut",
    RefreshPage = "RefreshPage"
}

export interface UserAction {
    type: UserActionType;
    payload?: any;
}

export function userRegisteredAction(user: UserModel): UserAction { 
    return {type: UserActionType.UserRegistered, payload: user };
}

export function userLoggedIn(user: UserModel): UserAction {
    return {type: UserActionType.UserLoggedIn, payload: user}
}

export function userLoggedOut(): UserAction {
    return {type: UserActionType.UserLoggedOut}
}
export function refreshPageAppear(user: UserModel): UserAction {
    return { type: UserActionType.RefreshPage, payload: user}
}

export function userReducer(currentState: UserState = new UserState(), action: UserAction): UserState {
    const newState = {...currentState};
    switch(action.type) {
        case UserActionType.UserRegistered:
        case UserActionType.UserLoggedIn:     
            newState.user = action.payload;
            newState.vacationsService.createConnection();
            sessionStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case UserActionType.UserLoggedOut:
            newState.vacationsService.disconnectFromServer();   
            newState.user = null;
            sessionStorage.removeItem("user");
            break;
        case UserActionType.RefreshPage:
            newState.user = action.payload;
            if(newState.user) {
                newState.vacationsService.createConnection();
            }
            break;
    }
    return newState;
}
