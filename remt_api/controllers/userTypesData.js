 const dataSource = [
    {
        id:"HQ2xHxwvQfMg",
        userTypeName: "Admin",
        permissions: ["manage_users"],
        ui: {
          dashboard: true,
          overview: true,
        },
        userInfos:{name:'jaoko', age:30, phoneNumber:+255764779234,nationId:15121989},
        estates:[],
        createdAt: new Date(2023,10,23)
      },
      {
        id:"KnsjkJyLUm5T",
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
        userInfos:{name:'mery', age:40, phoneNumber:+255769044790,nationId:0},
        estates:[],
        createdAt: new Date(2023, 8,15)
      },
      {
        id:"zDC2yBBY2O1j",
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
        userInfos:{name:'gladness', age:60, phoneNumber:+255767620337,nationId:0},
        estates:[
          {
            owner_Id:"cFyV7FopQtly",
            address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
            type:'appartments',
            open:false
          },
          {
            owner_Id:"T7b0ihtnIYh6",
            address:{id:'2', region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
            type:'rooms',
            open:false
          }
        ],
        createdAt: new Date(2023,6,11)
      },
      {
        id:"eorV6y9pVTB1",
        userTypeName: "Admin",
        permissions: ["manage_users"],
        ui: {
          dashboard: true,
          overview: true,
        },
        userInfos:{name:'kadet', age:30, phoneNumber:+255754765698,nationId:15121989},
        estates:[
          {
            owner_Id:"90n9gtv28Si6",
            address:{id:'2', region:'shy',district:'shy dc',ward:'ngokolo',street:'mwinamila'},
            type:'rooms',
            open:false
          },
          {
            owner_Id:"JtOQSaFWwe2t",
            address:{id:'2', region:'shy',district:'shy dc',ward:'ngokolo',street:'mwinamila'},
            type:'appartments',
            open:false
          }
        ],
        createdAt: new Date(2023,5,1)
      },
      {
        id:"edaapX1LtqzD",
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
        estates:[],
        createdAt: new Date(2023,8,20)
      },
      {
        id:"rSWIPsOnBM5P",
        userTypeName: "Broker",
        permissions: ["recruit_tenants"],
        ui: {
          search: {
            tenants: true,
            properties: true,
          },
        },
        userInfos:{name:'swaga', age:26, phoneNumber:+255624992151,nationId:0},
        estates:[],
        createdAt: new Date(2023,9,12)
      },
      {
        id:"J09QZJsYG1Zg",
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
        estates:[],
        createdAt: new Date(2023, 11,1)
      },
      {
        id:"EIEl1RVTNFfJ",
        userTypeName: "Lender",
        permissions: ["verify_address"],
        ui: {
          search: {
            tenants: true,
            address_verification: true,
          },
        },
        userInfos:{name:'mery', age:28, phoneNumber:+255620223810,nationId:0},
        estates:[],
        createdAt: new Date(2023,7,8)
      }
 ];


 module.exports = { dataSource };