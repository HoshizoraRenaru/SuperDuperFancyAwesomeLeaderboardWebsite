export interface Player {
  uuid: string;
  name: string;
  group: string;
  kills: number;
  deaths: number;
  kd: number;
  xp: number;
  level: number;
  killstreak: number;
  killstreak_top: number;
  multiplier: string;
  lastseen: string;
}

export const MOCK_PLAYERS: Player[] = [
  {
    uuid: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    name: "DarkSlayer99",
    group: "Admin",
    kills: 15420,
    deaths: 342,
    kd: 45.09,
    xp: 2500000,
    level: 150,
    killstreak: 25,
    killstreak_top: 150,
    multiplier: "2.0x",
    lastseen: "2023-10-27 14:30:00"
  },
  {
    uuid: "b2c3d4e5-f678-9012-3456-7890abcdef12",
    name: "PvP_God_KR",
    group: "VIP",
    kills: 12500,
    deaths: 500,
    kd: 25.00,
    xp: 1800000,
    level: 120,
    killstreak: 10,
    killstreak_top: 89,
    multiplier: "1.5x",
    lastseen: "2023-10-27 10:15:00"
  },
  {
    uuid: "c3d4e5f6-7890-1234-5678-90abcdef1234",
    name: "NoobHunter",
    group: "Default",
    kills: 8900,
    deaths: 890,
    kd: 10.00,
    xp: 950000,
    level: 95,
    killstreak: 5,
    killstreak_top: 45,
    multiplier: "1.0x",
    lastseen: "2023-10-26 22:00:00"
  },
  {
    uuid: "d4e5f678-9012-3456-7890-abcdef123456",
    name: "SwordMasterX",
    group: "MVP",
    kills: 7500,
    deaths: 750,
    kd: 10.00,
    xp: 800000,
    level: 88,
    killstreak: 0,
    killstreak_top: 30,
    multiplier: "1.2x",
    lastseen: "2023-10-25 18:45:00"
  },
  {
    uuid: "e5f67890-1234-5678-90ab-cdef12345678",
    name: "ArcherQueen",
    group: "VIP+",
    kills: 6200,
    deaths: 300,
    kd: 20.67,
    xp: 720000,
    level: 82,
    killstreak: 15,
    killstreak_top: 60,
    multiplier: "1.8x",
    lastseen: "2023-10-27 09:00:00"
  },
  {
    uuid: "f6789012-3456-7890-abcd-ef1234567890",
    name: "TankBuster",
    group: "Default",
    kills: 5000,
    deaths: 2500,
    kd: 2.00,
    xp: 500000,
    level: 65,
    killstreak: 2,
    killstreak_top: 15,
    multiplier: "1.0x",
    lastseen: "2023-10-24 16:20:00"
  },
  {
    uuid: "78901234-5678-90ab-cdef-1234567890ab",
    name: "HealerPro",
    group: "Helper",
    kills: 3000,
    deaths: 100,
    kd: 30.00,
    xp: 450000,
    level: 60,
    killstreak: 0,
    killstreak_top: 10,
    multiplier: "1.0x",
    lastseen: "2023-10-27 12:00:00"
  },
  {
    uuid: "89012345-6789-0abc-def1-234567890abc",
    name: "Steve_123",
    group: "Default",
    kills: 1200,
    deaths: 1200,
    kd: 1.00,
    xp: 150000,
    level: 30,
    killstreak: 1,
    killstreak_top: 5,
    multiplier: "1.0x",
    lastseen: "2023-10-20 08:30:00"
  },
  {
    uuid: "90123456-7890-abcd-ef12-34567890abcd",
    name: "CreeperAwMan",
    group: "Default",
    kills: 800,
    deaths: 900,
    kd: 0.89,
    xp: 100000,
    level: 25,
    killstreak: 0,
    killstreak_top: 4,
    multiplier: "1.0x",
    lastseen: "2023-10-18 15:10:00"
  },
  {
    uuid: "01234567-890a-bcde-f123-4567890abcde",
    name: "DiamondMiner",
    group: "VIP",
    kills: 500,
    deaths: 50,
    kd: 10.00,
    xp: 80000,
    level: 20,
    killstreak: 3,
    killstreak_top: 8,
    multiplier: "1.5x",
    lastseen: "2023-10-27 11:30:00"
  }
];
