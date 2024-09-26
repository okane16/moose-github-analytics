import { Key } from "@514labs/moose-lib";

export interface RepoLanguages {
  repoUrl: Key<string>;
  repoName: string;
  repoOwner: string;
  repoFullName: string;
  language: string;
  bytes: number;
}
