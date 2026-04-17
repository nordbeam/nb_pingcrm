import { useState, useCallback, useEffect, useRef } from "react";
import { usePage } from "@/lib/inertia";
import { socket, useChannel } from "@/lib/socket";

interface EditingUser {
  userId: number;
  name: string;
  field: string;
  timestamp: number;
}

interface UseEditingIndicatorOptions {
  type: "contact" | "organization" | "user";
  id: number;
}

interface UseEditingIndicatorReturn {
  /** Start broadcasting that current user is editing a field */
  startEditing: (field: string) => void;
  /** Stop broadcasting editing state */
  stopEditing: () => void;
  /** List of other users currently editing */
  editingUsers: EditingUser[];
  /** Check if a specific field is being edited by others */
  isFieldBeingEdited: (field: string) => EditingUser | undefined;
  /** Get all fields being edited by others */
  fieldsBeingEdited: string[];
}

/**
 * Hook for collaborative editing indicators.
 * Shows which users are editing which fields in real-time.
 */
export function useEditingIndicator({
  type,
  id,
}: UseEditingIndicatorOptions): UseEditingIndicatorReturn {
  const { props } = usePage<{ user?: { id: number } }>();
  const currentUserId = props.user?.id;
  const topic = `crm:${type}:${id}`;

  const [editingUsers, setEditingUsers] = useState<EditingUser[]>([]);
  const channelRef = useRef<ReturnType<typeof useChannel> | null>(null);
  const currentFieldRef = useRef<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Join channel and listen for editing events
  channelRef.current = useChannel(socket, topic, {
    user_editing: ({
      user_id,
      name,
      editing,
      field,
    }: {
      user_id: number;
      name: string;
      editing: boolean;
      field?: string;
    }) => {
      if (user_id === currentUserId) return;

      if (editing && field) {
        setEditingUsers((prev) => {
          // Remove existing entry for this user
          const filtered = prev.filter((u) => u.userId !== user_id);
          return [
            ...filtered,
            { userId: user_id, name, field, timestamp: Date.now() },
          ];
        });
      } else {
        // User stopped editing
        setEditingUsers((prev) => prev.filter((u) => u.userId !== user_id));
      }
    },
  });

  // Clean up stale editing indicators (older than 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = Date.now() - 30000;
      setEditingUsers((prev) => prev.filter((u) => u.timestamp > cutoff));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Clean up on unmount - notify others we stopped editing
  useEffect(() => {
    return () => {
      if (currentFieldRef.current && channelRef.current?.channel) {
        channelRef.current.channel.push("editing", { editing: false });
      }
    };
  }, []);

  const startEditing = useCallback(
    (field: string) => {
      // Debounce to avoid flooding the channel
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      currentFieldRef.current = field;

      debounceRef.current = setTimeout(() => {
        if (channelRef.current?.channel) {
          channelRef.current.channel.push("editing", {
            editing: true,
            field,
          });
        }
      }, 300);
    },
    []
  );

  const stopEditing = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    currentFieldRef.current = null;

    if (channelRef.current?.channel) {
      channelRef.current.channel.push("editing", { editing: false });
    }
  }, []);

  const isFieldBeingEdited = useCallback(
    (field: string) => editingUsers.find((u) => u.field === field),
    [editingUsers]
  );

  const fieldsBeingEdited = editingUsers.map((u) => u.field);

  return {
    startEditing,
    stopEditing,
    editingUsers,
    isFieldBeingEdited,
    fieldsBeingEdited,
  };
}
