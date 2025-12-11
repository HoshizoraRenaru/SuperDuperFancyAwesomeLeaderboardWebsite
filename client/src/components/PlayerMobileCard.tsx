import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Skull, Zap, Crown, BarChart3, ChevronRight } from 'lucide-react';
import { Player } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { PlayerName } from '@/components/PlayerName';

interface PlayerMobileCardProps {
  player: Player;
  rank: number;
  onSelectPlayer: (player: Player) => void;
}

export function PlayerMobileCard({ player, rank, onSelectPlayer }: PlayerMobileCardProps) {
  const isTop3 = rank <= 3;
  let rankColor = "text-muted-foreground bg-white/5 border-white/10";
  if (rank === 1) rankColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.2)]";
  if (rank === 2) rankColor = "text-gray-300 bg-gray-300/10 border-gray-300/50";
  if (rank === 3) rankColor = "text-amber-600 bg-amber-600/10 border-amber-600/50";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectPlayer(player)}
      className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm p-4 mb-4 active:bg-white/10 transition-colors"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full font-display font-bold text-lg border",
          rankColor
        )}>
          #{rank}
        </div>
        
        <div className="relative">
          <div className={cn(
            "w-14 h-14 rounded-lg overflow-hidden border-2 bg-black/50",
            isTop3 ? "border-primary shadow-[0_0_10px_rgba(6,182,212,0.4)]" : "border-white/20"
          )}>
            <img 
              src={`https://render.crafty.gg/3d/bust/${player.uuid}?headOnly=true&size=100`} 
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <span className="font-bold text-white text-lg tracking-wide flex items-center justify-between">
            <PlayerName uuid={player.uuid} initialName={player.name} />
            <ChevronRight size={16} className="text-white/30" />
          </span>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-xs text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded w-fit">
              {player.group}
             </span>
             <span className="text-xs text-secondary font-mono font-bold">
               Lvl {player.level}
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center border border-white/5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase mb-1">
            <Crosshair size={12} /> Kills
          </div>
          <span className="font-mono text-xl font-bold text-white">{player.kills.toLocaleString()}</span>
        </div>

        <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center border border-white/5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase mb-1">
            <Skull size={12} /> Deaths
          </div>
          <span className="font-mono text-xl font-bold text-white/70">{player.deaths.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
