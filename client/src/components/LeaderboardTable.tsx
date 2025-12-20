import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Skull, Crosshair, Zap, Crown, ChevronUp, ChevronDown } from 'lucide-react';
import { Player } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { PlayerName } from '@/components/PlayerName';
import { getTierFromKills } from '@/lib/tierCalculator';

interface LeaderboardTableProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

type SortKey = 'kills' | 'deaths' | 'kd' | 'xp' | 'level' | 'killstreak';
type SortDirection = 'asc' | 'desc';

export function LeaderboardTable({ players: initialPlayers, onSelectPlayer }: LeaderboardTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('kills');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...initialPlayers].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <span className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-30 transition-opacity">↕</span>;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1 text-primary" /> : <ChevronDown className="w-4 h-4 ml-1 text-primary" />;
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-display font-bold text-lg text-primary text-center w-20">#</th>
              <th className="p-4 font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Player</th>
              <th 
                className="p-4 font-display font-bold text-sm uppercase tracking-wider text-muted-foreground cursor-pointer group hover:text-white transition-colors text-center"
                onClick={() => handleSort('kills')}
              >
                <div className="flex items-center justify-center">
                  <Crosshair className="w-4 h-4 mr-2" /> Kills <SortIcon column="kills" />
                </div>
              </th>
              <th 
                className="p-4 font-display font-bold text-sm uppercase tracking-wider text-muted-foreground cursor-pointer group hover:text-white transition-colors text-center"
                onClick={() => handleSort('deaths')}
              >
                <div className="flex items-center justify-center">
                  <Skull className="w-4 h-4 mr-2" /> Deaths <SortIcon column="deaths" />
                </div>
              </th>
              <th 
                className="p-4 font-display font-bold text-sm uppercase tracking-wider text-muted-foreground cursor-pointer group hover:text-white transition-colors text-center"
                onClick={() => handleSort('kd')}
              >
                <div className="flex items-center justify-center">
                  <Zap className="w-4 h-4 mr-2" /> K/D <SortIcon column="kd" />
                </div>
              </th>
              <th 
                className="p-4 font-display font-bold text-sm uppercase tracking-wider text-muted-foreground cursor-pointer group hover:text-white transition-colors text-center"
                onClick={() => handleSort('level')}
              >
                <div className="flex items-center justify-center">
                  <Crown className="w-4 h-4 mr-2" /> Level <SortIcon column="level" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;
              let rankColor = "text-muted-foreground";
              if (rank === 1) rankColor = "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]";
              if (rank === 2) rankColor = "text-gray-300 drop-shadow-[0_0_10px_rgba(209,213,219,0.5)]";
              if (rank === 3) rankColor = "text-amber-600 drop-shadow-[0_0_10px_rgba(217,119,6,0.5)]";

              return (
                <motion.tr 
                  key={player.uuid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                  onClick={() => onSelectPlayer(player)}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <td className={cn("p-4 text-center font-display text-2xl font-bold", rankColor)}>
                    {rank}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={cn(
                          "w-12 h-12 rounded-lg overflow-hidden border-2 bg-black/50 transition-transform group-hover:scale-110",
                          isTop3 ? "border-primary shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "border-white/20"
                        )}>
                          <img 
                            src={`https://render.crafty.gg/3d/bust/${player.uuid}?headOnly=true&size=100`} 
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isTop3 && (
                          <div className="absolute -top-2 -right-2 text-yellow-400 animate-pulse">
                            <Crown size={16} fill="currentColor" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-lg tracking-wide group-hover:text-primary transition-colors">
                          <PlayerName uuid={player.uuid} initialName={player.name} />
                        </span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded w-fit">
                             {getTierFromKills(player.kills)}
                           </span>
                           <span className="md:hidden text-xs text-secondary font-mono">
                             Lvl {player.level}
                           </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-mono text-xl text-white/90">
                    {player.kills.toLocaleString()}
                  </td>
                  <td className="p-4 text-center font-mono text-xl text-white/60">
                    {player.deaths.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className={cn(
                      "font-mono text-xl font-bold px-3 py-1 rounded bg-white/5 border border-white/10 inline-block min-w-[80px]",
                      player.kd >= 5 ? "text-primary border-primary/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]" : "text-white"
                    )}>
                      {player.kd.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono text-xl text-secondary font-bold">
                    {player.level}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
