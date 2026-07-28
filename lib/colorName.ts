export const tailwindColors = [
  { name: "Slate", hex: "#64748b" },
  { name: "Gray", hex: "#6b7280" },
  { name: "Zinc", hex: "#71717a" },
  { name: "Neutral", hex: "#737373" },
  { name: "Stone", hex: "#78716c" },
  { name: "Red", hex: "#ef4444" },
  { name: "Orange", hex: "#f97316" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Lime", hex: "#84cc16" },
  { name: "Green", hex: "#22c55e" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Teal", hex: "#14b8a6" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Sky", hex: "#0ea5e9" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Indigo", hex: "#6366f1" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Fuchsia", hex: "#d946ef" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" }
];

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

export function getColorName(hexCode: string): string {
  if (!hexCode) return "Unknown";
  
  const targetRgb = hexToRgb(hexCode);
  let closestColor = tailwindColors[0];
  let minDistance = Infinity;

  for (const color of tailwindColors) {
    const rgb = hexToRgb(color.hex);
    // Euclidean distance
    const distance = Math.sqrt(
      Math.pow(targetRgb.r - rgb.r, 2) +
      Math.pow(targetRgb.g - rgb.g, 2) +
      Math.pow(targetRgb.b - rgb.b, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }

  // Add shade modifier based on lightness if needed, but basic name is enough for now.
  return closestColor.name;
}
