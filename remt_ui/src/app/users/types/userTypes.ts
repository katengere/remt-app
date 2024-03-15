import { EntityState } from "@ngrx/entity";
import { Message } from "./message";

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
export interface PersonInfoInterface {
  name: string;
  gender: string
  summary: string
  age: number | null;
  nation_Id: number | null;
  phoneNumber: string;
  password: string
}

export interface RentalHistory {
  from: Date;
  to: Date;
  rent: number;
  client: any;
  house: any;
  rooms: number;
  phoneNumber?: number;
  _id?: string
  action?: string
}
export class HouseInterface {
  owner_Id!: any;
  admin_Id?: string;
  _id!: string;
  region!: string;
  district!: string;
  ward!: string;
  street!: string;
  type!: string;
  open!: boolean;
  rooms?: number;
  description?: string;
  rental_history?: RentalHistory[];
  caretakers?: any[];
  coords?: number[];
  currentTenant_Ids?: any[];
}
export interface InvoiceInterface {
  invoiceId: string,
  invoiceName: string,
  tenantId: string,
  tenantName: string,
  tenantPhoneNumber: string,
  tax: number,
  netTotal: number,
  houseId: string,
  houseType: string,
  start: string,
  end: string,
  rooms: number,
  rent: number,
  rentTotal: number,
  createdAt: Date
}
export class UserTypeInterface {
  _id!: string;
  userTypeName!: string;
  permissions!: string[];
  userInfos!: PersonInfoInterface;
  estates!: any;
  regUserIds?: any[];
  regEstateIds?: any[];
  createdAt!: Date;
  invoices?: InvoiceInterface[];
  coords?: number[];
  distance?: any;
  action?: string;
  constructor() { }
}

export interface UserTypeStateInterface extends EntityState<UserTypeInterface> {
  isLoading: boolean;
  error: Message | null;
}
export interface AppStateInterface {
  userType: UserTypeStateInterface;
  estate: EntityState<HouseInterface>;
}
