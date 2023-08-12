import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface, UserTypeStateInterface } from "../types/userTypes";
import { selectAll } from "./users.reducers";
import { getSelectors } from "@ngrx/router-store";

const selectUserState = createFeatureSelector<UserTypeStateInterface>('users')

export const isLoadingSelector = createSelector(selectUserState, (state)=>state.isLoading);
export const userSelector = createSelector(selectUserState, (state)=>selectAll(state));
export const errorSelector = createSelector(selectUserState, (state)=>state.error);

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getSelectors();
