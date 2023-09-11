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
    userInfos:{name:'kadet', age:30, phoneNumber:+255744607060,nationId:15121989},
    estates:null
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
    userInfos:{name:'carolene', age:40, phoneNumber:+255688605040,nationId:0},
    estates:null
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
    userInfos:{name:'gladness', age:60, phoneNumber:+255754302010,nationId:0},
    estates:[
      {
        owner_Id:'',
        address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
        rooms:12,
        open:false
      },
      {
        owner_Id:'',
        address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
        rooms:10,
        open:false
      },
      {
        owner_Id:'',
        address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
        rooms:7,
        open:true
      }
    ]
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
    userInfos:{name:'nyanzala', age:20, phoneNumber:+255655101010,nationId:0},
    estates:null
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
    userInfos:{name:'gilo', age:26, phoneNumber:+255754909090,nationId:0},
    estates:null
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
    userInfos:{name:'mika', age:32, phoneNumber:+255644304020,nationId:0},
    estates:null
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
    userInfos:{name:'jaoko', age:28, phoneNumber:+255622653255,nationId:0},
    estates:null
  },
];


