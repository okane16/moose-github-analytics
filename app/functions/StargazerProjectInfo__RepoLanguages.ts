// Add your models & start the development server to import these types
import { StargazerProjectInfo } from "datamodels/StargazerProjectInfo";
import { RepoLanguages } from "datamodels/ProjectProgrammingLanguages";
import { cliLog } from "@514labs/moose-lib";
import dotenv from "dotenv";

dotenv.config();

// The 'run' function transforms StargazerProjectInfo data to RepoLanguages format.
// For more details on how Moose streaming functions work, see: https://docs.moosejs.com
export default async function run(
  source: StargazerProjectInfo
): Promise<RepoLanguages[] | null> {
  cliLog({
    action: "Looking",
    message: `up languages for ${source.repoFullName}`,
    message_type: "Info",
  });

  cliLog({
    action: "Repo Languages",
    message: `up languages for ${source.language}`,
    message_type: "Info",
  });

  const languages = await callGitHubAPI(source.languagesUrl);

  cliLog({
    action: "Found",
    message: `${languages.length} languages for ${source.repoFullName}`,
    message_type: "Info",
  });

  const repoLanguages = languages.map((language: any) => {
    return {
      repoUrl: source.repoUrl,
      repoName: source.repoName,
      repoOwner: source.stargazerName,
      repoFullName: source.repoFullName,
      language: language.language,
      bytes: language.bytes,
    };
  });

  return repoLanguages;
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
