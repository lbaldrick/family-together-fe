import {AsyncDataStateEnum} from "../../UiStates";
import {Family} from "../../model/Family";

export enum FamiliesActionsEnum {
    CREATE_FAMILY = "CREATE_FAMILY",
    FETCH_FAMILY_DATA = "FETCH_FAMILY_DATA",
    FETCH_ALL_FAMILIES_DATA = "FETCH_ALL_FAMILIES_DATA",
}

export interface FamiliesAction {
    type: FamiliesActionsEnum  | AsyncDataStateEnum;
    payload?: Partial<Family>;
}