import { RawStarEvent } from "datamodels/RawStarEvent";
import { StargazerProjectInfo } from "datamodels/StargazerProjectInfo";

export default async function run(
  source: RawStarEvent
): Promise<StargazerProjectInfo[] | null> {
  if (source.action === "deleted" || !source.starred_at) {
    return null;
  }

  const repositories = await callGitHubAPI(source.sender.repos_url);

  if (!repositories) {
    return null;
  }

  const stargazerProjects = repositories.map((repo: any) => ({
    starred_at: new Date(source.starred_at),
    stargazerName: source.sender.login,
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
  const response = await fetch(url);
  return await response.json();
}
