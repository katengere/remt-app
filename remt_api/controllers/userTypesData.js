//  const dataSource = [
//     {
//         userTypeName: "Admin",
//         permissions: ["manage_users"],
//         ui: {
//           dashboard: true,
//           overview: true,
//         },
//         userInfos:{name:'jaoko', age:30, phoneNumber:+255764779234,nation_Id:15121989},
//         estates:[],
//         createdAt: new Date(2023,10,23)
//       },
//       {
//         userTypeName: "LGA",
//         permissions: ["add_landlords", "add_properties"],
//         ui: {
//           form: {
//             add_landlord: {
//               fields: [
//                 { label: "Name", type: "text" },
//                 { label: "Property Address", type: "text" },
//                 { label: "Owner Name", type: "text" },
//               ],
//             },
//           },
//         },
//         userInfos:{name:'mery', age:40, phoneNumber:+255769044790,nation_Id:0},
//         estates:[],
//         createdAt: new Date(2023, 8,15)
//       },
//       {
//         userTypeName: "Landlord",
//         permissions: [
//           "manage_properties",
//           "manage_tenants",
//           "manage_caretakers",
//           "create_invoices",
//           "view_rental_history",
//         ],
//         ui: {
//           dashboard: true,
//           properties: true,
//           tenants: true,
//           caretakers: true,
//           invoices: true,
//           rental_history: true,
//         },
//         userInfos:{name:'gladness', age:60, phoneNumber:+255767620337,nation_Id:0},
//         estates:[
//           {
//             owner__Id:"cFyV7FopQtly",
//             address:{region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
//             type:'appartments',
//             open:false
//           },
//           {
//             owner__Id:"T7b0ihtnIYh6",
//             address:{region:'dsm',district:'temeke',ward:'tazara',street:'kwampalange'},
//             type:'rooms',
//             open:false
//           }
//         ],
//         createdAt: new Date(2023,6,11)
//       },
//       {
//         userTypeName: "Admin",
//         permissions: ["manage_users"],
//         ui: {
//           dashboard: true,
//           overview: true,
//         },
//         userInfos:{name:'kadet', age:30, phoneNumber:+255754765698,nation_Id:15121989},
//         estates:[
//           {
//             owner__Id:"90n9gtv28Si6",
//             address:{region:'shy',district:'shy dc',ward:'ngokolo',street:'mwinamila'},
//             type:'rooms',
//             open:false
//           },
//           {
//             owner__Id:"JtOQSaFWwe2t",
//             address:{region:'shy',district:'shy dc',ward:'ngokolo',street:'mwinamila'},
//             type:'appartments',
//             open:false
//           }
//         ],
//         createdAt: new Date(2023,5,1)
//       },
//       {
//         userTypeName: "Caretaker",
//         permissions: [
//           "manage_tenants",
//           "create_invoices",
//           "view_rental_history",
//         ],
//         ui: {
//           dashboard: true,
//           tenants: true,
//           invoices: true,
//           rental_history: true,
//         },
//         userInfos:{name:'nyanzala', age:20, phoneNumber:+255655101010,nation_Id:0},
//         estates:[],
//         createdAt: new Date(2023,8,20)
//       },
//       {
//         userTypeName: "Broker",
//         permissions: ["recruit_tenants"],
//         ui: {
//           search: {
//             tenants: true,
//             properties: true,
//           },
//         },
//         userInfos:{name:'swaga', age:26, phoneNumber:+255624992151,nation_Id:0},
//         estates:[],
//         createdAt: new Date(2023,9,12)
//       },
//       {
//         userTypeName: "Tenant",
//         permissions: [
//           "manage_rental_payments",
//           "view_rental_history",
//           "request_invoices",
//           "set_up_auto_payments",
//         ],
//         ui: {
//           dashboard: true,
//           rental_payments: true,
//           rental_history: true,
//           invoices: true,
//           auto_payments: true,
//         },
//         userInfos:{name:'mika', age:32, phoneNumber:+255644304020,nation_Id:0},
//         estates:[],
//         createdAt: new Date(2023, 11,1)
//       },
//       {
//         userTypeName: "Lender",
//         permissions: ["verify_address"],
//         ui: {
//           search: {
//             tenants: true,
//             address_verification: true,
//           },
//         },
//         userInfos:{name:'mery', age:28, phoneNumber:+255620223810,nation_Id:0},
//         estates:[],
//         createdAt: new Date(2023,7,8)
//       }
//  ];


//  module.exports = { dataSource };