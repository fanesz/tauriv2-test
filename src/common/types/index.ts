import { QueryResult } from "@tauri-apps/plugin-sql";

export type Callback<T = void> = {
  onSuccess: (data?: T) => void;
  onError: (error: Error | unknown) => void;
};

export type SelectReturn<T> = {
  error: Error | unknown;
  isSuccess: boolean;
  data: T[];
};

export type PaginatedSelectReturn<T> = SelectReturn<T> & {
  pagination: Pagination;
};

export type ExecuteReturn = QueryResult & {
  error: Error | unknown;
  isSuccess: boolean;
};

export type ReqPagination = {
  page: number;
  limit: number;
};

export type Pagination = ReqPagination & {
  total_pages: number;
  total_items: number;
};

export type WithPagination<T> = {
  data: T;
  pagination: Pagination;
};

export type Options = {
  where: string;
  values?: unknown[];
};
