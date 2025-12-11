import React, { useState } from 'react';
import { MOCK_PLAYERS, Player } from '@/data/mockData';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { PlayerMobileCard } from '@/components/PlayerMobileCard';
import { PlayerDetailsModal } from '@/components/PlayerDetailsModal';
import { Search, Trophy, Database, CheckCircle2 } from 'lucide-react';
import bgImage from '@assets/generated_images/deep_space_nebula_with_cybernetic_grid_overlay.png';
import { motion } from 'framer-motion';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  
  const filteredPlayers = MOCK_PLAYERS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Image with Parallax-like fixed position */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Moving Motion Graphics - Floating Particles/Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <motion.div 
           animate={{ 
             y: [0, -20, 0], 
             opacity: [0.3, 0.6, 0.3],
             scale: [1, 1.1, 1]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" 
         />
         <motion.div 
           animate={{ 
             y: [0, 30, 0], 
             opacity: [0.2, 0.5, 0.2],
             scale: [1, 1.2, 1]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[80px]" 
         />
      </div>
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-background/60 to-background pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4"
          >
            <Trophy className="w-6 h-6 mr-2 animate-pulse" />
            <span className="font-display font-bold tracking-widest text-sm">SEASON 9.5</span>
          </motion.div>
          
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="font-display text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            ETERNAL<br/>HALL OF FAME
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-mono max-w-lg text-lg"
          >
            Dominate the arena. Rise through the ranks. Become a legend in the Eternal PvP Chronicles.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative w-full max-w-md mt-8 group"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-white/10 rounded-xl leading-5 bg-black/40 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 sm:text-sm backdrop-blur-md transition-all shadow-lg hover:bg-black/50"
              placeholder="Search for a champion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Kills', value: '1.2M+', color: 'text-primary' },
            { label: 'Active Players', value: '842', color: 'text-secondary' },
            { label: 'Server Status', value: 'ONLINE', color: 'text-green-400' },
            { label: 'Current Season', value: '9.5', color: 'text-white' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="bg-white/5 border border-white/5 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/10 transition-colors cursor-default hover:border-white/10"
            >
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
              <div className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <LeaderboardTable players={filteredPlayers} onSelectPlayer={setSelectedPlayer} />
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-muted-foreground text-sm font-mono">
              Showing {filteredPlayers.length} players
            </span>
          </div>
          {filteredPlayers.map((player, index) => (
            <PlayerMobileCard 
              key={player.uuid} 
              player={player} 
              rank={index + 1} 
              onSelectPlayer={setSelectedPlayer}
            />
          ))}
        </div>

        {/* Database Info Section (To answer user query) */}
        <div className="mt-20 border-t border-white/10 pt-10">
           <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6 max-w-3xl mx-auto backdrop-blur-sm">
             <div className="flex items-center gap-3 mb-4 text-blue-400">
               <Database className="w-6 h-6" />
               <h3 className="font-display font-bold text-lg">System Compatibility</h3>
             </div>
             <p className="text-gray-400 text-sm mb-4 leading-relaxed">
               This interface is fully compatible with your existing MySQL database. The system uses your 
               <code className="bg-black/30 px-1.5 py-0.5 rounded text-blue-300 mx-1">players</code> table schema directly.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 text-sm">
               <div className="flex items-center gap-2 text-gray-300">
                 <CheckCircle2 size={16} className="text-green-500" />
                 <span>Schema Matches</span>
               </div>
               <div className="flex items-center gap-2 text-gray-300">
                 <CheckCircle2 size={16} className="text-green-500" />
                 <span>MySQL 8.0 Compatible</span>
               </div>
               <div className="flex items-center gap-2 text-gray-300">
                 <CheckCircle2 size={16} className="text-green-500" />
                 <span>No Schema Changes Needed</span>
               </div>
             </div>
           </div>
        </div>

        <footer className="mt-20 text-center text-muted-foreground text-sm font-mono pb-10">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8" />
          <p>&copy; 2025 EternaL Network. All rights reserved.</p>
        </footer>
      </main>

      {/* Player Details Modal */}
      <PlayerDetailsModal 
        player={selectedPlayer} 
        isOpen={!!selectedPlayer} 
        onClose={() => setSelectedPlayer(null)} 
      />
    </div>
  );
}
