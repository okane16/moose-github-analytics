import { Key } from "@514labs/moose-lib";

export interface HistoricalStarEvent {
  starredAt: Date;
  stargazerName: Key<string>;
  stargazerReposUrl: string;
  stargazerAvatarUrl: string;
}
