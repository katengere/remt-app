import { HouseInterface, UserTypeInterface } from "./userTypes";

export const dataSource: UserTypeInterface[] = [
  {
    id:'1',
    userTypeName: "Admin",
    permissions: ["manage_users"],
    ui: {
      dashboard: true,
      overview: true,
    },
  },
  {
    id:'2',
    userTypeName: "LGA",
    permissions: ["add_landlords", "add_properties"],
    ui: {
      form: {
        add_landlord: {
          fields: [
            { label: "Name", type: "text" },
            { label: "Property Address", type: "text" },
            { label: "Owner Name", type: "text" },
          ],
        },
      },
    },
  },
  {
    id:'3',
    userTypeName: "Landlord",
    permissions: [
      "manage_properties",
      "manage_tenants",
      "manage_caretakers",
      "create_invoices",
      "view_rental_history",
    ],
    ui: {
      dashboard: true,
      properties: true,
      tenants: true,
      caretakers: true,
      invoices: true,
      rental_history: true,
    },
  },
  {
    id:'4',
    userTypeName: "Caretaker",
    permissions: [
      "manage_tenants",
      "create_invoices",
      "view_rental_history",
    ],
    ui: {
      dashboard: true,
      tenants: true,
      invoices: true,
      rental_history: true,
    },
  },
  {
    id:'5',
    userTypeName: "Broker",
    permissions: ["recruit_tenants"],
    ui: {
      search: {
        tenants: true,
        properties: true,
      },
    },
  },
  {
    id:'6',
    userTypeName: "Tenant",
    permissions: [
      "manage_rental_payments",
      "view_rental_history",
      "request_invoices",
      "set_up_auto_payments",
    ],
    ui: {
      dashboard: true,
      rental_payments: true,
      rental_history: true,
      invoices: true,
      auto_payments: true,
    },
  },
  {
    id:'7',
    userTypeName: "Lender",
    permissions: ["verify_address"],
    ui: {
      search: {
        tenants: true,
        address_verification: true,
      },
    },
  },
];

export const Buildings: HouseInterface[] = [
  {
    owner:{id:'3',name:'jaoko', age:45, nationId:11,phoneNumber:1345},
    address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
    rooms:12,
  },
  {
    owner:{id:'7',name:'mika', age:55, nationId:15,phoneNumber:5375},
    address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
    rooms:10,
  },
  {
    owner:{id:'9',name:'john', age:35, nationId:18,phoneNumber:1985},
    address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
    rooms:7,
  }
];
