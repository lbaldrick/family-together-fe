export enum FamilyPositionsEnum {
    MOTHER = "MOTHER",
    FATHER = "FATHER",
    GRAND_MOTHER = "GRAND_MOTHER",
    GRAND_FATHER = "GRAND_FATHER",
    STEP_FATHER = "STEP_FATHER",
    STEP_MOTHER = "STEP_MOTHER",
    DAUGHTER = "DAUGHTER",
    SON = "SON",
    GUARDIAN = "GUARDIAN",
    OTHER = "OTHER",
}

export interface FamilyMember {
    id: string;
    firstName: string;
    lasName: string;
    dateOfBirth?: number;
    familyPosition: FamilyPositionsEnum;
}

export interface Family {
    id: string;
    name: string;
    creationDate: string;
    members: FamilyMember[];
}