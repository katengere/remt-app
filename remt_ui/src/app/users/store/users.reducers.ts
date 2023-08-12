import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { UserTypeInterface, UserTypeStateInterface } from "../types/userTypes";
import { createReducer, on } from "@ngrx/store";
import * as usersActions from "./users.actions";


export const usersAdapter: EntityAdapter<UserTypeInterface> = createEntityAdapter<UserTypeInterface>();

const initialState: UserTypeStateInterface = usersAdapter.getInitialState({
  isLoading: false, error:null
});

export const usersReducer = createReducer(
  initialState,
  on(usersActions.getUser, (state, actions)=>({...state, isLoading:true})),
  on(usersActions.getAdminSuccess, (state, {userAdmin})=>{
    return usersAdapter.addMany(userAdmin, {...state, isLoading:false});
  }),
  on(usersActions.getAdminFailure, (state, {error})=>({
    ...state, isLoading:false, error:error
  })),
);

export const {selectAll,selectEntities,selectIds,selectTotal} = usersAdapter.getSelectors();
