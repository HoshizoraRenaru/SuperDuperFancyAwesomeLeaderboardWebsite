import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PlayerNameProps {
  uuid: string;
  initialName?: string;
  className?: string;
}

// Simple in-memory cache to prevent redundant fetches
const nameCache: Record<string, string> = {};

export function PlayerName({ uuid, initialName, className }: PlayerNameProps) {
  const [name, setName] = useState<string>(initialName || nameCache[uuid] || '');
  const [loading, setLoading] = useState(!name && !initialName);

  useEffect(() => {
    let isMounted = true;

    // Always fetch to ensure freshness, even if initialName is provided.
    // This fixes issues where the backend might send an old cached username.
    const fetchName = async () => {
      // Only set loading if we don't have a name yet to avoid flickering
      if (!name) setLoading(true);
      
      try {
        // 1. Try Ashcon API (Fast, usually up-to-date)
        const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
        if (response.ok) {
          const data = await response.json();
          if (data.username && isMounted) {
            nameCache[uuid] = data.username;
            // Only update if different to avoid re-renders
            if (data.username !== name) setName(data.username);
          }
        } else {
            // 2. Fallback to PlayerDB
            const backupRes = await fetch(`https://playerdb.co/api/player/minecraft/${uuid}`);
            if (backupRes.ok) {
                const data = await backupRes.json();
                if (data.data?.player?.username && isMounted) {
                    nameCache[uuid] = data.data.player.username;
                    if (data.data.player.username !== name) setName(data.data.player.username);
                }
            }
        }
      } catch (error) {
        console.error("Failed to fetch username for", uuid, error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchName();

    return () => { isMounted = false; };
  }, [uuid, name]);

  if (loading) {
    return <span className={`animate-pulse opacity-50 ${className}`}>Loading...</span>;
  }

  // Fallback to displaying UUID (shortened) if name is still missing
  const displayName = name || initialName || `${uuid.slice(0, 8)}...`;

  return <span className={className}>{displayName}</span>;
}
