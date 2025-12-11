export interface Player {
  // Columns from MySQL 'players' table
  uuid: string;
  group: string;
  kills: number;
  deaths: number;
  xp: number;
  level: number;
  killstreak: number;
  killstreak_top: number;
  multiplier: string;
  lastseen: string;

  // Computed/Fetched fields from Backend (index.js)
  name: string;      // Fetched from mcuuid.net by backend
  kd: number;        // Computed: kills / deaths
  uuid_clean?: string; // Computed: uuid without dashes
}

export const MOCK_PLAYERS: Player[] = [
  {
    uuid: "0657c99d-2c58-49c5-b930-bbba8a9d777c",
    name: "Notch", // Example name for the UUID
    group: "default",
    kills: 1,
    deaths: 2,
    xp: 22259,
    level: 53,
    killstreak: 0,
    killstreak_top: 1,
    multiplier: "0.0 0 0",
    lastseen: "2025-12-08 13:45:58",
    kd: 0.5
  },
  {
    uuid: "84141b51-a989-4a56-8ec9-d8f2e5b3abbf",
    name: "Jeb_", // Example name for the UUID
    group: "default",
    kills: 0,
    deaths: 1,
    xp: 12,
    level: 1,
    killstreak: 0,
    killstreak_top: 0,
    multiplier: "0.0 0 0",
    lastseen: "2025-12-05 13:52:12",
    kd: 0.0
  },
  // Adding more mock data following the schema strictly
  {
    uuid: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    name: "DarkSlayer99",
    group: "admin",
    kills: 15420,
    deaths: 342,
    xp: 2500000,
    level: 150,
    killstreak: 25,
    killstreak_top: 150,
    multiplier: "2.0 0 0",
    lastseen: "2023-10-27 14:30:00",
    kd: 45.09
  },
  {
    uuid: "b2c3d4e5-f678-9012-3456-7890abcdef12",
    name: "PvP_God_KR",
    group: "vip",
    kills: 12500,
    deaths: 500,
    xp: 1800000,
    level: 120,
    killstreak: 10,
    killstreak_top: 89,
    multiplier: "1.5 0 0",
    lastseen: "2023-10-27 10:15:00",
    kd: 25.00
  },
  {
    uuid: "c3d4e5f6-7890-1234-5678-90abcdef1234",
    name: "NoobHunter",
    group: "default",
    kills: 8900,
    deaths: 890,
    xp: 950000,
    level: 95,
    killstreak: 5,
    killstreak_top: 45,
    multiplier: "1.0 0 0",
    lastseen: "2023-10-26 22:00:00",
    kd: 10.00
  },
  {
    uuid: "d4e5f678-9012-3456-7890-abcdef123456",
    name: "SwordMasterX",
    group: "mvp",
    kills: 7500,
    deaths: 750,
    xp: 800000,
    level: 88,
    killstreak: 0,
    killstreak_top: 30,
    multiplier: "1.2 0 0",
    lastseen: "2023-10-25 18:45:00",
    kd: 10.00
  },
  {
    uuid: "e5f67890-1234-5678-90ab-cdef12345678",
    name: "ArcherQueen",
    group: "vip+",
    kills: 6200,
    deaths: 300,
    xp: 720000,
    level: 82,
    killstreak: 15,
    killstreak_top: 60,
    multiplier: "1.8 0 0",
    lastseen: "2023-10-27 09:00:00",
    kd: 20.67
  },
  {
    uuid: "f6789012-3456-7890-abcd-ef1234567890",
    name: "TankBuster",
    group: "default",
    kills: 5000,
    deaths: 2500,
    xp: 500000,
    level: 65,
    killstreak: 2,
    killstreak_top: 15,
    multiplier: "1.0 0 0",
    lastseen: "2023-10-24 16:20:00",
    kd: 2.00
  }
];
