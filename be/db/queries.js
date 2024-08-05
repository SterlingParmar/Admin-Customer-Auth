import { pool } from "./index.js";

export const find = async () => {
  const QUERY = `SELECT * FROM users`;
  try {
    const client = await pool.getConnection();
    const res = await client.query(QUERY);
    return res?.[0] || [];
  } catch (e) {
    console.log("Error occurred while fetching users", e);
    throw e;
  }
};

export const findUserByEmail = async (email) => {
  const QUERY = `SELECT * FROM users WHERE email = ?`;
  try {
    const client = await pool.getConnection();
    const res = await client.query(QUERY, [email]);
    return res?.[0] || [];
  } catch (e) {
    console.log("Error occurred while fetching user by email", e);
    throw e;
  }
};

export const create = async (
  first_name,
  last_name,
  email,
  password,
  is_admin,
  is_verified = false
) => {
  const QUERY = `INSERT INTO users
    (first_name, last_name, email, password, is_admin, is_verified)
    VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    const client = await pool.getConnection();
    const res = await client.query(QUERY, [
      first_name,
      last_name,
      email,
      password,
      is_admin,
      is_verified,
    ]);
    return res;
  } catch (e) {
    console.log("Error occurred while creating user", e);
    throw e;
  }
};

export const verifyUser = async (id) => {
  const QUERY = `UPDATE users SET is_verified = TRUE WHERE id = ?`;
  try {
    const client = await pool.getConnection();
    const res = await client.query(QUERY, [id]);
    return res;
  } catch (e) {
    console.log("Error occurred while updating user", e);
    throw e;
  }
};
