import { EntityState } from "@ngrx/entity";

export interface UIConfigInterface {
  dashboard?: boolean;
  overview?: boolean;
  form?: {
    [key: string]: {
      fields: { label: string; type: string }[];
    };
  };
  properties?: boolean;
  tenants?: boolean;
  caretakers?: boolean;
  invoices?: boolean;
  rental_history?: boolean;
  search?: {
    [key: string]: boolean;
  };
  rental_payments?: boolean;
  auto_payments?: boolean;
  address_verification?: boolean;
}
export interface PersonInfoInterface{
  id:string;
  name:string;
  age:number;
  nationId:number;
  phoneNumber:number;
}
export interface LocationInterface{
  id:string;
  region:string;
  district:string;
  ward:string;
  street:string;
}
export interface RentalHistory{
  from:Date;
  to: Date;
  client: PersonInfoInterface
}
export interface HouseInterface{
  owner:PersonInfoInterface;
  address:LocationInterface;
  rooms:number;
  rental_history?:RentalHistory;
  tenants?:PersonInfoInterface[];
}
export interface UserTypeInterface {
  id:string;
  userTypeName: string;
  permissions: string[];
  ui: UIConfigInterface;
  userInfos?:PersonInfoInterface;
}

export interface UserTypeStateInterface extends EntityState<UserTypeInterface> {
  isLoading: boolean;
  error: string|null;
}
export interface AppStateInterface{
  userType: UserTypeStateInterface;
  estate:EntityState<HouseInterface>;
}
