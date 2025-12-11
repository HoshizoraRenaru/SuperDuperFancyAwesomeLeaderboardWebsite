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
    // If we already have a valid name (and it's not just the UUID again), use it
    if (initialName && initialName !== uuid) {
      setName(initialName);
      return;
    }

    // Check cache
    if (nameCache[uuid]) {
      setName(nameCache[uuid]);
      setLoading(false);
      return;
    }

    // If no name, fetch it
    let isMounted = true;
    const fetchName = async () => {
      setLoading(true);
      try {
        // Using Ashcon's API which is generally CORS-friendly for Minecraft lookups
        // Fallback to playerdb if needed in production logic, but this is a solid start
        const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
        if (response.ok) {
          const data = await response.json();
          if (data.username && isMounted) {
            nameCache[uuid] = data.username;
            setName(data.username);
          }
        } else {
            // Fallback: Try a different API if the first one fails (rate limits etc)
            const backupRes = await fetch(`https://playerdb.co/api/player/minecraft/${uuid}`);
            if (backupRes.ok) {
                const data = await backupRes.json();
                if (data.data?.player?.username && isMounted) {
                    nameCache[uuid] = data.data.player.username;
                    setName(data.data.player.username);
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
  }, [uuid, initialName]);

  if (loading) {
    return <span className={`animate-pulse opacity-50 ${className}`}>Loading...</span>;
  }

  // Fallback to displaying UUID (shortened) if name is still missing
  const displayName = name || initialName || `${uuid.slice(0, 8)}...`;

  return <span className={className}>{displayName}</span>;
}
