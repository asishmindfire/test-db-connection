require("dotenv").config();

const { DefaultAzureCredential, ManagedIdentityCredential } = require("@azure/identity");
const { Client } = require("pg");

async function getConnection() {
  try {
    // const credential = new DefaultAzureCredential({
    //   managedIdentityClientId: "d40b35c0-8ff4-4828-a153-f3ae593c6bfa",
    // });
    const credential = new ManagedIdentityCredential("d40b35c0-8ff4-4828-a153-f3ae593c6bfa");
    const scopes = ["https://ossrdbms-aad.database.windows.net/.default"];
    const token = await credential.getToken(scopes);
    console.log(`Token generation is successful =>`, token.token);

    // const client = new Client({
    //   user: "flightplandb",
    //   database: "postgres",
    //   password: token.token,
    //   host: "tailwind.postgres.database.azure.com",
    //   port: 5432,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // });
    // await client.connect();
    // return client;

    // return;
  } catch (error) {
    console.log(
      `Error in getConnection function while connecting with managed identity =>`,
      error
    );
    return error;
  }
}

module.exports = getConnection;




// require("dotenv").config();

// const { DefaultAzureCredential } = require("@azure/identity");
// const { Client } = require("pg");

// async function getConnection() {
//   try {
//     // For user-assigned identity.
//     const credential = new DefaultAzureCredential({
//       managedIdentityClientId: "d40b35c0-8ff4-4828-a153-f3ae593c6bfa",
//     });
//     // Acquire the access token.
//     var accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');

//     console.log(`Token generation is successful =>`, accessToken.token);

//     const client = new Client({
//       // user: "flightplandb",
//       // database: "postgres",
//       // password: token.token,
//       // host: "tailwind.postgres.database.azure.com",
//       // port: 5432,
//       // ssl: {
//       //   rejectUnauthorized: false,
//       // },
//       host: "tailwind.postgres.database.azure.com",
//       user: "aad_postgresql_ab1b1",
//       password: accessToken.token,
//       database: "postgres",
//       port: Number(5432) ,
//       ssl: true
//     });
//     await client.connect();
//     return client;

//     // return;
//   } catch (error) {
//     console.log(
//       `Error in getConnection function while connecting with managed identity =>`,
//       error
//     );
//     return error;
//   }
// }

// module.exports = getConnection;
