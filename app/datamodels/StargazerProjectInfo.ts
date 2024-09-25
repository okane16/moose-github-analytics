import { Key } from "@514labs/moose-lib";

export interface StargazerProjectInfo {
  starred_at: Key<Date>;
  stargazerName: string;
  repoName: string;
  repoFullName: string;
  description: string;
  repoUrl: string;
  repoSizeKb: number;
  repoStars: number;
  repoWatchers: number;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
