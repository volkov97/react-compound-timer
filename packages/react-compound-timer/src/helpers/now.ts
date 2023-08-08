export function now(): number {
  // if (typeof window === 'undefined' || !('performance' in window)) {
  //   return Date.now();
  // }
  // return performance.now();

  // we do not use performance.now() anymore, read links below for more info
  // https://medium.com/@mihai/performance-now-sleep-16a5b774560c
  // https://persistent.info/web-experiments/performance-now-sleep/
  return Date.now();
}
