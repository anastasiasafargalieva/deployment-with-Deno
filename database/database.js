import { Pool } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
    hostname: "castor.db.elephantsql.com",
    database: "dpxogwqb",
    user: "dpxogwqb",
    password: "sm1O5Dq4x6U7cBdOYeyEaCvcHkP3Rcuh",
    port: 5432,
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

export { executeQuery };