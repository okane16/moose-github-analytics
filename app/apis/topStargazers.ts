import { ConsumptionUtil } from "@514labs/moose-lib";

// This file is where you can define your API templates for consuming your data
// All query_params are passed in as strings, and are used within the sql tag to parameterize you queries
export interface QueryParams {}

export default async function handle(
  {}: QueryParams,
  { client, sql }: ConsumptionUtil
) {
  return client.query(sql`
      SELECT 
        stargazer,
        countMerge(total_projects) AS total_projects,
        sumMerge(total_repo_size_kb) AS total_repo_size_kb,
        avgMerge(average_repo_size_kb) AS average_repo_size_kb,
        argMaxMerge(most_popular_project) AS most_popular_project,
        argMaxMerge(most_popular_project_language) AS most_popular_project_language,
        sumMerge(total_stars) AS total_stars,
        maxMerge(most_popular_project_stars) AS most_popular_project_stars,
        argMaxMerge(most_popular_project_description) AS most_popular_project_description
      FROM TopStargazers
      GROUP BY stargazer
    `);
}
