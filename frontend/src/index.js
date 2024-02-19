export function updatedAgo(date) {
  const now = new Date();
  date = new Date(date);
  return Math.floor((now - date) / 8640000);
}

export function randomRgbaColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random(); // 0.0 - 1.0
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}
