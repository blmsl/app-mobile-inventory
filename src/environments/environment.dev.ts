export const environment = {
  production: false,
  dimissTimeout: 2000,
  supportedLanguages: ['es'],
  auth0: {
    domain: "https://inventory-system.auth0.com/", // auth0 domain.
    clientid: "FK7SHa0ycyrxlGAh9CZOKGVY4MtCQvXd", // inventory-system-web-client id.
    clientsecret: "xfhDAepRHs-H2OQmG0ZrG45n9U1rTkaImP3nHfeQGbvxe5o3bqIYuGxymMqZRZA4", // inventory-system-web-client secret.
    audience: "inventory-system-api", // audience.
    callback: "com.inventory.system://inventory-system.auth0.com/cordova/com.inventory.system/callback", // Callback url.
    scope: "openid profile email offline_access", // scopes.
    packageId: "com.inventory.system"
  },
  api: {
    url: "https://inventory-system-backend-alobaton.c9users.io:8081/v1/" // api endpoint.
  }
};
