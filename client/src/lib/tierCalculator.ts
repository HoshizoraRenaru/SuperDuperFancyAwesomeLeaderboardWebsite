export function getTierFromKills(kills: number): string {
  if (kills < 5) return "LT8";
  if (kills < 11) return "HT8";
  if (kills < 21) return "LT7";
  if (kills < 31) return "HT7";
  // Add more tiers as needed
  return "LEGENDARY";
}
