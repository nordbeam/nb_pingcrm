import { useState, useCallback, useEffect } from 'react';
import { socket, useChannel } from '@/lib/socket';

interface UseTableRealtimeOptions<T> {
  initialData: T[];
  topic: string;
  createEvent: string;
  updateEvent: string;
  deleteEvent: string;
  /** Key in the event payload containing the record (e.g., "contact") */
  recordKey: string;
}

export function useTableRealtime<T extends { id: number }>({
  initialData,
  topic,
  createEvent,
  updateEvent,
  deleteEvent,
  recordKey,
}: UseTableRealtimeOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());

  // Sync with initialData when it changes (e.g., Inertia navigation with pagination/sorting)
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const highlightRecord = useCallback((id: number) => {
    setHighlightedIds((prev) => new Set([...prev, id]));
    setTimeout(() => {
      setHighlightedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 3000);
  }, []);

  // Handle realtime events
  useChannel(socket, topic, {
    [createEvent]: (payload: any) => {
      const record = payload[recordKey] as T;
      if (record) {
        setData((prev) => [record, ...prev]);
        highlightRecord(record.id);
      }
    },
    [updateEvent]: (payload: any) => {
      const record = payload[recordKey] as T;
      if (record) {
        setData((prev) => prev.map((item) => (item.id === record.id ? record : item)));
        highlightRecord(record.id);
      }
    },
    [deleteEvent]: ({ id }: { id: number }) => {
      setData((prev) => prev.filter((item) => item.id !== id));
    },
  });

  return {
    data,
    setData,
    highlightedIds,
    isHighlighted: (id: number) => highlightedIds.has(id),
  };
}
