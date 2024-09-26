SELECT 
  language, 
  countMerge(total_projects) AS total_projects, 
  sumMerge(total_repo_size_kb) AS total_repo_size_kb, 
  avgMerge(average_repo_size_kb) AS average_repo_size_kb 
FROM TopProgrammingLanguages 
GROUP BY language;

