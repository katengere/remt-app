const initialUserData = [
    {
        userTypeName: "Admin",
        permissions: ["manage_users"],
        ui: {
          dashboard: true,
          overview: true,
        },
      },
      {
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
        userTypeName: "Lender",
        permissions: ["verify_address"],
        ui: {
          search: {
            tenants: true,
            address_verification: true,
          },
        },
      }
 ]
 module.exports = {initialUserData};