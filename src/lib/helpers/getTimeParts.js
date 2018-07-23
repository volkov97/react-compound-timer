export default function getTimeParts(time) {
  const ms = time % 1000;
  const s = Math.floor(time / 1000) % 60;
  const m = Math.floor(time / 60000) % 60;
  const h = Math.floor(time / 3600000) % 24;
  const d = Math.floor(time / 216000000);

  return {
    d, h, m, s, ms,
  };
}
