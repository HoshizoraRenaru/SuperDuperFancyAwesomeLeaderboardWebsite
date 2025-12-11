import React, { useState } from 'react';
import { MOCK_PLAYERS } from '@/data/mockData';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { PlayerMobileCard } from '@/components/PlayerMobileCard';
import { Search, Trophy } from 'lucide-react';
import bgImage from '@assets/generated_images/deep_space_nebula_with_cybernetic_grid_overlay.png';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPlayers = MOCK_PLAYERS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-background/60 to-background pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 animate-pulse">
            <Trophy className="w-6 h-6 mr-2" />
            <span className="font-display font-bold tracking-widest text-sm">SEASON 9.5</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            ETERNAL<br/>HALL OF FAME
          </h1>
          
          <p className="text-muted-foreground font-mono max-w-lg text-lg">
            Dominate the arena. Rise through the ranks. Become a legend in the Eternal PvP Chronicles.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mt-8 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-white/10 rounded-xl leading-5 bg-black/40 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 sm:text-sm backdrop-blur-md transition-all shadow-lg"
              placeholder="Search for a champion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Summary (Optional - just to look cool) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Kills', value: '1.2M+', color: 'text-primary' },
            { label: 'Active Players', value: '842', color: 'text-secondary' },
            { label: 'Server Status', value: 'ONLINE', color: 'text-green-400' },
            { label: 'Current Season', value: '9.5', color: 'text-white' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/10 transition-colors cursor-default">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
              <div className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <LeaderboardTable players={filteredPlayers} />
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-muted-foreground text-sm font-mono">
              Showing {filteredPlayers.length} players
            </span>
          </div>
          {filteredPlayers.map((player, index) => (
            <PlayerMobileCard key={player.uuid} player={player} rank={index + 1} />
          ))}
        </div>

        <footer className="mt-20 text-center text-muted-foreground text-sm font-mono">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8" />
          <p>&copy; 2025 EternaL Network. All rights reserved.</p>
          <p className="mt-2 opacity-50">Last updated: {new Date().toLocaleTimeString()}</p>
        </footer>
      </main>
    </div>
  );
}
