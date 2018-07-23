export default function getTimeParts(time) {
  const ms = String(time % 1000);
  const s = String(Math.floor(time / 1000) % 60);
  const m = String(Math.floor(time / 60000) % 60);
  const h = String(Math.floor(time / 3600000) % 24);
  const d = String(Math.floor(time / 216000000));

  return {
    d, h, m, s, ms,
  };
}
