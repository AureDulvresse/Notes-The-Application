export function randomRgbaColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random(); // 0.0 - 1.0
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}
