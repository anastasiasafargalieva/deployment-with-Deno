import { executeQuery } from "../database/database.js";

const create = async (sender, message) => {
  await executeQuery(
    "INSERT INTO messages  (sender, message) VALUES ($1, $2);",
    sender,
    message,
  );
};

const deleteById = async (id) => {
  await executeQuery("DELETE FROM messages  WHERE id = $1;", id);
};

const findAll = async () => {
  const result = await executeQuery("SELECT * FROM messages ORDER BY id DESC LIMIT 5;");
  return result.rows;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  const result = await executeQuery(
    "SELECT * FROM messages  WHERE sender ILIKE $1 OR message ILIKE $2;",
    likePart,
    likePart,
  );

  return result.rows;
};

export { create, deleteById, findAll, findByNameOrAddressLike };