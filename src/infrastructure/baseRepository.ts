import { createPagination } from "@blueprint";
import Database from "@database/database";
import { Options, Pagination } from "@types";

class BaseRepository {
  db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  handlePaginator(props: HandlePaginatorProps): string {
    const { newLimit, offset } = this.#validatePaginator(props);
    return ` LIMIT ${newLimit} OFFSET ${offset}`;
  }

  async handlePagination(props: HandlePaginationProps): Promise<Pagination> {
    const { tableName, options, paginator } = props;
    const { newLimit, newPage } = this.#validatePaginator(paginator);

    const pagination = createPagination();
    pagination.limit = newLimit;
    pagination.page = newPage;

    const query = "SELECT COUNT(*) FROM " + tableName + options.where;
    const count = await this.db.count(query, options.values);

    pagination.total_items = count;
    pagination.total_pages = Math.ceil(pagination.total_items / newLimit);

    return pagination;
  }

  buildWhereClause(options: Options): Options {
    const { where, values } = options;
    let whereClause = "";
    const newValues = values || [];

    if (where) {
      const trimmedWhere = where.trim().toUpperCase().startsWith("AND")
        ? where.trim().substring(3).trim()
        : where.trim();
      whereClause = ` WHERE ${trimmedWhere}`;
    }

    return { where: whereClause, values: newValues };
  }

  #validatePaginator(props: paginator): getValidatedPaginatorProps {
    const { page, limit } = props;

    const DEFAULT_LIMIT = 10;
    const DEFAULT_PAGE = 1;
    if (
      typeof page === "number" &&
      typeof limit === "number" &&
      page > 0 &&
      limit > 0
    ) {
      const offset = (page - 1) * limit;
      return { newLimit: limit, newPage: page, offset };
    }

    return {
      newLimit: DEFAULT_LIMIT,
      newPage: DEFAULT_PAGE,
      offset: DEFAULT_PAGE - 1,
    };
  }
}

type HandlePaginatorProps = paginator;

type HandlePaginationProps = {
  tableName: string;
  options: Options;
  paginator: paginator;
};

type paginator = {
  page: number;
  limit: number;
};

type getValidatedPaginatorProps = {
  newLimit: number;
  newPage: number;
  offset: number;
};

export default BaseRepository;
