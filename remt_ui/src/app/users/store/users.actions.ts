import { createAction, props } from "@ngrx/store";
import { PersonInfoInterface, UserTypeInterface } from "../types/userTypes";
import { Message } from "../types/message";

export const getUser = createAction('[Admin Page] get admin');
export const getAdminSuccess = createAction('[Admin Page] get admin success', props<{userAdmin:UserTypeInterface[]}>());
export const getAdminFailure = createAction('[Admin Page] get admin failure', props<{error: Message}>());

export const login = createAction('[Login Page] login', props<PersonInfoInterface>());
export const loginSuccess = createAction('[Login Page] login success', props<{person:UserTypeInterface}>());
export const loginFailure = createAction('[Login Page] login failure', props<{error:Message}>());

export const register = createAction('[Register Page] register', props<PersonInfoInterface>());
export const registerSuccess = createAction('[Register Page] register success', props<{person:UserTypeInterface}>());
export const registerFailure = createAction('[Register Page] register failure', props<{error:Message}>());
