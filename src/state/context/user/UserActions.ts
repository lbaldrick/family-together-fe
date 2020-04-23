import {User} from "../../model/User";
import {AsyncDataStateEnum} from "../../UiStates";

export enum UserActionsEnum {
    UPDATE_USER_DATA = "UPDATE_USER",
    FETCH_USER_DATA = "FETCH_USER_DATA",
}

export interface UserAction {
    type: UserActionsEnum | AsyncDataStateEnum;
    payload?: Partial<User>;
}