import { query } from "../db";
import { User } from "../models/user";

export async function getUser(id: number): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}

//obtener usuarios de la db
export async function getAllUsers(): Promise<User[]> {
  return (await query("SELECT id, username, role FROM users")).rows;
}

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  return (await query("SELECT * FROM users WHERE username = $1", [username]))
    .rows[0];
}

export async function createUser(
  username: string,
  password: string,
  role: string
): Promise<User> {
  return (
    await query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",

      [username, password, role]
    )
  ).rows[0];
}

export async function updateUser(
  id: number,
  username: string,
  password: string ,
  role: string
): Promise<User | undefined> {
  return (
    await query(
      "UPDATE users SET username = $2, password = $3, role = $4 WHERE id = $1 RETURNING *",
      [id, username, password, role]
    )
  ).rows[0];
}

export async function deleteUser(id: number): Promise<void> {
  await query("DELETE FROM users WHERE id = $1", [id]);
}

