// This file is where you can define your SQL queries to shape and manipulate batches
// of data using Blocks. There is a collection of helper functions to create SQL queries
// within the @514labs/moose-lib package.

// Blocks can also manage materialized views to store the results of your queries for
// improved performance. A materialized view is the recommended approach for aggregating
// data. For more information on the types of aggregate functions you can run on your existing data,
// consult the Clickhouse documentation: https://clickhouse.com/docs/en/sql-reference/aggregate-functions

import {
  Blocks,
  createAggregation,
  dropAggregation,
  ClickHouseEngines,
} from "@514labs/moose-lib";

const MV_NAME = "TopProgrammingLanguages_MV";
const TABLE_NAME = "TopProgrammingLanguages";

const createTableOptions = {
  name: TABLE_NAME,
  columns: {
    language: "String",
    total_projects: "AggregateFunction(count, UInt64)",
    total_repo_size_kb: "AggregateFunction(sum, Float64)",
    average_repo_size_kb: "AggregateFunction(avg, Float64)",
  },
  engine: ClickHouseEngines.AggregatingMergeTree,
  orderBy: "language",
};

const selectQuery = `
SELECT
  language,
  countState(*) AS total_projects,
  sumState(repoSizeKb) AS total_repo_size_kb,
  avgState(repoSizeKb) AS average_repo_size_kb
FROM StargazerProjectInfo_0_0
GROUP BY language
`;

export default {
  teardown: [...dropAggregation({ viewName: MV_NAME, tableName: TABLE_NAME })],
  setup: [
    ...createAggregation({
      materializedViewName: MV_NAME,
      tableCreateOptions: createTableOptions,
      select: selectQuery,
    }),
  ],
} as Blocks;
