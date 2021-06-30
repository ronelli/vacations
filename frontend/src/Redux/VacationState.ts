// import { socketIOClient } from 'socket.io-client';
import VacationModel from "../Models/VacationModel";

export class VacationState {
    public vacations: VacationModel[] = [];
}

// Vacations Action Type: 
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted"
}

// Vacations Action:
export interface VacationsAction {
    type: VacationsActionType;
    payload?: any; 
}

// Products Action Creators: 
export function vacationsDownloadedAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationAddedAction(addedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationAdded, payload: addedVacation };
}
export function vacationUpdatedAction(updatedVacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.VacationUpdated, payload: updatedVacation };
}
export function vacationDeletedAction(id: number): VacationsAction {
    return { type: VacationsActionType.VacationDeleted, payload: id };
}

// Products Reducer: 
export function vacationsReducer(currentState: VacationState = new VacationState(), action: VacationsAction): VacationState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.VacationsDownloaded: // payload = all products
            newState.vacations = action.payload;
            break;

        case VacationsActionType.VacationAdded: // payload = added product
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.VacationUpdated: // payload = updated product
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id);
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.VacationDeleted: // payload = product id to delete
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;
    }
    return newState;
}