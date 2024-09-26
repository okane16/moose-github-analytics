// Add your models & start the development server to import these types
import { HistoricalStarEvent } from "datamodels/HistoricalStarEvent";
import { StargazerProjectInfo } from "datamodels/StargazerProjectInfo";
import { cliLog } from "@514labs/moose-lib";
export default async function run(
  source: HistoricalStarEvent
): Promise<StargazerProjectInfo[] | null> {
  const repositories = await callGitHubAPI(source.stargazerReposUrl);

  cliLog({
    action: "Repositories",
    message: repositories,
    message_type: "Info",
  });

  if (!repositories) {
    return null;
  }

  const stargazerProjects = repositories.map((repo: any) => ({
    starred_at: new Date(source.starredAt),
    stargazerName: source.stargazerName,
    repoName: repo.name,
    repoFullName: repo.full_name,
    description: repo.description,
    repoUrl: repo.html_url,
    repoStars: repo.stargazers_count,
    repoWatchers: repo.watchers_count,
    language: repo.language || "Multiple Languages",
    languagesUrl: repo.languages_url,
    repoSizeKb: repo.size,
    createdAt: new Date(repo.created_at),
    updatedAt: new Date(repo.updated_at),
  }));

  return stargazerProjects;
}

async function callGitHubAPI(url: string): Promise<any> {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  cliLog({
    action: "Calling",
    message: token,
    message_type: "Info",
  });

  if (!token) {
    throw new Error("Please set the GITHUB_ACCESS_TOKEN environment variable.");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  cliLog({
    action: "Response",
    message: response.status.toString(),
    message_type: "Info",
  });

  return response.json();
}
