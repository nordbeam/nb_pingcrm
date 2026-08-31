import { useMemo } from 'react';
import { usePage } from '@/lib/inertia';
import { socket, usePresence, useChannel } from '@/lib/socket';

interface PresenceMeta {
  user_id: number;
  name: string;
  email: string;
  online_at: number;
}

interface Viewer {
  userId: number;
  name: string;
  email: string;
  initials: string;
}

interface UseRecordPresenceOptions {
  type: 'contact' | 'organization' | 'user';
  id: number;
}

interface UseRecordPresenceReturn {
  viewers: Viewer[];
  isBeingViewedByOthers: boolean;
  viewerCount: number;
}

/**
 * Hook to track who is viewing a specific record.
 * Uses Phoenix Presence to show real-time viewers.
 */
export function useRecordPresence({ type, id }: UseRecordPresenceOptions): UseRecordPresenceReturn {
  const { props } = usePage();
  const currentUserId = props.user?.id;
  const topic = `crm:${type}:${id}`;

  // Join the record-specific channel
  useChannel(socket, topic, {});

  // Track presence
  const presence = usePresence<PresenceMeta>(socket, topic);
  const presenceList = presence.list();

  // Filter out current user and map to viewer format
  const viewers = useMemo(() => {
    const allViewers: Viewer[] = [];

    for (const entry of presenceList) {
      for (const meta of entry.metas) {
        if (meta.user_id !== currentUserId) {
          allViewers.push({
            userId: meta.user_id,
            name: meta.name,
            email: meta.email,
            initials: meta.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2),
          });
        }
      }
    }

    // Dedupe by user ID (in case of multiple tabs)
    const seen = new Set<number>();
    return allViewers.filter((v) => {
      if (seen.has(v.userId)) return false;
      seen.add(v.userId);
      return true;
    });
  }, [presenceList, currentUserId]);

  return {
    viewers,
    isBeingViewedByOthers: viewers.length > 0,
    viewerCount: viewers.length,
  };
}
