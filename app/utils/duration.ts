/**
 * Parses a duration string (e.g., "3:45" or "1:02:30") into total seconds.
 * @param durationStr The duration string to parse.
 * @returns The total number of seconds.
 */
export const parseDuration = (durationStr: string): number => {
  const durationParts = durationStr.split(":").map(Number);
  let durationInSeconds = 0;

  if (durationParts.length === 3) {
    // HH:MM:SS
    durationInSeconds =
      durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2];
  } else if (durationParts.length === 2) {
    // MM:SS
    durationInSeconds = durationParts[0] * 60 + durationParts[1];
  } else {
    // SS
    durationInSeconds = durationParts[0];
  }

  return durationInSeconds;
};

/**
 * Formats a total number of seconds into a duration string (e.g., "3:45" or "1:02:30").
 * @param seconds The total number of seconds.
 * @returns The formatted duration string.
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  } else {
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  }
};

/**
 * Calculates the total duration in seconds of an array of tracks.
 * @param tracks An array of tracks with a duration property.
 * @returns The total duration in seconds.
 */
export const calculateTotalDuration = (
  tracks: Array<{ duration: string }>,
): number => {
  return tracks.reduce((total, track) => {
    return total + parseDuration(track.duration);
  }, 0);
};
