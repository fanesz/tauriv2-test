import { createExecuteReturn, createSelectReturn } from "@blueprint";
import TauriDatabase from "@tauri-apps/plugin-sql";
import { Callback, ExecuteReturn, SelectReturn } from "@types";
import env from "@utils/env";

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
      callback.onError(new Error("Failed to connect to database"));
    }
  }

  async select<T>(
    query: string,
    bindValues?: unknown[]
  ): Promise<SelectReturn<T>> {
    const result = createSelectReturn<T>();

    if (!this.pool) {
      result.error = new Error("Database not connected");
      return result;
    }

    try {
      const data = await this.pool.select<T[]>(query, bindValues);
      result.isSuccess = true;
      result.data = data;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  async execute(query: string, bindValues?: unknown[]): Promise<ExecuteReturn> {
    const result = createExecuteReturn();

    if (!this.pool) {
      result.error = new Error("Database not connected");
      return result;
    }

    try {
      const data = await this.pool.execute(query, bindValues);
      result.isSuccess = true;
      result.lastInsertId = data.lastInsertId;
      result.rowsAffected = data.rowsAffected;
    } catch (error) {
      result.error = error;
    }

    return result;
  }

  async count(query: string, bindValues?: unknown[]): Promise<number> {
    const result = await this.select<{ count: number }>(query, bindValues);
    return result.data[0]?.count ?? 0;
  }
}

export default Database;
