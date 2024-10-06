import TauriDatabase, { QueryResult } from "@tauri-apps/plugin-sql";
import env from "@utils/env";
import { Callback } from "./interfaces";

class Database {
  private static instance: Database;
  private pool?: TauriDatabase;

  constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(callback: Callback) {
    if (this.pool) {
      callback.onSuccess();
      return;
    }
    try {
      const encodedUser = encodeURIComponent(env.db.user);
      const encodedPassword = encodeURIComponent(env.db.password);

      const pool = await TauriDatabase.load(
        `postgres://${encodedUser}:${encodedPassword}@${env.db.host}/${env.db.name}`
      );
      this.pool = pool;
      callback.onSuccess();
    } catch (error) {
      callback.onError({
        name: "DatabaseError",
        message: error as string,
      });
    }
  }

  async select<T>(query: string, bindValues?: unknown[]): Promise<T> {
    if (!this.pool) {
      throw new Error("Database not connected");
    }

    return await this.pool.select(query, bindValues);
  }

  async execute(query: string, bindValues?: unknown[]): Promise<QueryResult> {
    if (!this.pool) {
      throw new Error("Database not connected");
    }

    return await this.pool.execute(query, bindValues);
  }
}

export default Database;
