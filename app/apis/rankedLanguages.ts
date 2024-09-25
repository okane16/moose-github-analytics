import { ConsumptionUtil } from "@514labs/moose-lib";

// This file is where you can define your API templates for consuming your data
// All query_params are passed in as strings, and are used within the sql tag to parameterize you queries
export interface QueryParams {
  rankBy: "total_projects" | "total_repo_size_kb" | "average_repo_size_kb";
}

export default async function handle(
  { rankBy }: QueryParams,
  { client, sql }: ConsumptionUtil
) {
  if (
    rankBy !== "total_projects" &&
    rankBy !== "total_repo_size_kb" &&
    rankBy !== "average_repo_size_kb"
  ) {
    throw new Error("Invalid rankBy value");
    rankBy = "total_projects";
  }
  return client.query(
    sql`SELECT 
          language, 
          countMerge(total_projects) AS total_projects, 
          sumMerge(total_repo_size_kb) AS total_repo_size_kb, 
          avgMerge(average_repo_size_kb) AS average_repo_size_kb 
        FROM TopProgrammingLanguages 
        GROUP BY language 
        ORDER BY ${rankBy} DESC`
  );
}
