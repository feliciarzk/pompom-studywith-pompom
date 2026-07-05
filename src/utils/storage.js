const KEY = "pompom_stats";

export function getStats() {
  const saved =
    localStorage.getItem(KEY);

  if (!saved) {
    return {
      totalHours: 0,
      sessions: 0,
    };
  }

  return JSON.parse(saved);
}

export function saveStats(
  stats
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(stats)
  );
}

export function addSession(
  minutes
) {
  const stats = getStats();

  stats.sessions += 1;

  stats.totalHours +=
    minutes / 60;

  saveStats(stats);

  return stats;
}