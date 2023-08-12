import { createAction, props } from "@ngrx/store";
import { UserTypeInterface } from "../types/userTypes";

export const getUser = createAction('[Admin Page] get admin');
export const getAdminSuccess = createAction('[Admin Page] get admin success', props<{userAdmin:UserTypeInterface[]}>());
export const getAdminFailure = createAction('[Admin Page] get admin failure', props<{error: string|null}>());
