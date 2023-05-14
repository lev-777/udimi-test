export function secondsToTime(totalSeconds: number): string  {
  if (!totalSeconds) {
    return '00:00:00'
  }

  const totalMinutes: number = Math.floor(totalSeconds / 60)
  const seconds: number = totalSeconds % 60
  const hours: number = Math.floor(totalMinutes / 60)
  const minutes: number = totalMinutes % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}
