import { ExecuteReturn, Pagination, SelectReturn } from "@types";

export function createSelectReturn<T>(): SelectReturn<T> {
  return {
    error: null,
    isSuccess: false,
    data: [],
  };
}

export function createExecuteReturn(): ExecuteReturn {
  return {
    error: null,
    isSuccess: false,
    lastInsertId: 0,
    rowsAffected: 0,
  };
}

export function createPagination(): Pagination {
  return {
    page: 1,
    limit: 10,
    total_pages: 0,
    total_items: 0,
  };
}
