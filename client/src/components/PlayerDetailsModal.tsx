import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Player } from "@/data/mockData";
import { motion } from "framer-motion";
import { Trophy, Skull, Crosshair, Zap, Crown, Calendar, TrendingUp, Activity, User } from 'lucide-react';
import { format } from 'date-fns';
import { PlayerName } from "@/components/PlayerName";

interface PlayerDetailsModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlayerDetailsModal({ player, isOpen, onClose }: PlayerDetailsModalProps) {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black/80 backdrop-blur-xl border-white/10 text-white p-0 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        
        {/* Header Banner */}
        <div className="relative h-32 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="absolute -bottom-12 left-8 flex items-end"
           >
             <div className="relative group">
                <div className="w-24 h-24 rounded-xl border-4 border-black bg-black overflow-hidden shadow-xl">
                  <img 
                    src={`https://render.crafty.gg/3d/bust/${player.uuid}?headOnly=true&size=150`} 
                    alt={player.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-black font-bold text-xs px-2 py-1 rounded-full border border-white/20 shadow-lg">
                  Lvl {player.level}
                </div>
             </div>
           </motion.div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <DialogHeader className="mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DialogTitle className="text-3xl font-display font-bold flex items-center gap-3">
                <PlayerName uuid={player.uuid} initialName={player.name} />
                <span className="text-sm font-mono font-normal px-2 py-1 rounded bg-white/10 text-muted-foreground border border-white/5 uppercase tracking-wider">
                  {player.group}
                </span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground font-mono mt-1 flex items-center gap-2">
                <User size={14} /> UUID: {player.uuid}
              </DialogDescription>
            </motion.div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <StatBox icon={<Crosshair className="text-green-400" />} label="Kills" value={player.kills.toLocaleString()} />
                <StatBox icon={<Skull className="text-red-400" />} label="Deaths" value={player.deaths.toLocaleString()} />
              </div>
              <StatBox 
                icon={<Zap className="text-yellow-400" />} 
                label="K/D Ratio" 
                value={player.kd.toFixed(2)} 
                className="bg-gradient-to-r from-yellow-400/10 to-transparent border-yellow-400/20"
              />
            </motion.div>

            {/* Secondary Stats */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="space-y-3"
            >
              <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp size={16} className="text-blue-400" /> Experience
                  </span>
                  <span className="font-mono font-bold text-lg">{player.xp.toLocaleString()} XP</span>
                </div>
                <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((player.level / 200) * 100, 100)}%` }} // Mock progress calculation
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Level {player.level}</span>
                  <span>Next Level</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatBox icon={<Activity className="text-purple-400" />} label="Killstreak" value={player.killstreak} />
                <StatBox icon={<Crown className="text-amber-400" />} label="Best Streak" value={player.killstreak_top} />
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                 <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar size={16} /> Last Seen
                 </span>
                 <span className="font-mono text-sm text-white/80">
                   {player.lastseen}
                 </span>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatBox({ icon, label, value, className }: { icon: React.ReactNode, label: string, value: string | number, className?: string }) {
  return (
    <div className={`bg-white/5 rounded-lg p-3 border border-white/5 flex flex-col justify-center hover:bg-white/10 transition-colors ${className}`}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase mb-1">
        {icon} {label}
      </div>
      <div className="font-mono font-bold text-xl">{value}</div>
    </div>
  );
}
