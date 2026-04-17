import { Pencil } from "lucide-react";

interface EditingUser {
  userId: number;
  name: string;
  field: string;
}

interface EditingIndicatorProps {
  /** The user currently editing this field */
  editingUser: EditingUser;
}

/**
 * Shows a small indicator when another user is editing a field.
 * Place this near the input field label.
 */
export function EditingIndicator({ editingUser }: EditingIndicatorProps) {
  const firstName = editingUser.name.split(" ")[0];

  return (
    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
      <Pencil className="h-3 w-3 animate-pulse" />
      {firstName} is editing
    </span>
  );
}

interface EditingBannerProps {
  /** List of users currently editing fields */
  editingUsers: EditingUser[];
}

/**
 * Banner showing all users currently editing the form.
 * Display this at the top of the form when there are active editors.
 */
export function EditingBanner({ editingUsers }: EditingBannerProps) {
  if (editingUsers.length === 0) {
    return null;
  }

  // Group by user
  const userFields = editingUsers.reduce(
    (acc, user) => {
      if (!acc[user.userId]) {
        acc[user.userId] = { name: user.name, fields: [] };
      }
      acc[user.userId].fields.push(user.field);
      return acc;
    },
    {} as Record<number, { name: string; fields: string[] }>
  );

  const userList = Object.values(userFields);

  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800/50 dark:bg-blue-900/20">
      <Pencil className="h-4 w-4 animate-pulse text-blue-600 dark:text-blue-400" />
      <span className="text-sm text-blue-800 dark:text-blue-200">
        {userList.map((u, i) => (
          <span key={i}>
            {i > 0 && (i === userList.length - 1 ? " and " : ", ")}
            <span className="font-medium">{u.name.split(" ")[0]}</span>
            {" is editing "}
            <span className="font-medium">{formatFields(u.fields)}</span>
          </span>
        ))}
      </span>
    </div>
  );
}

function formatFields(fields: string[]): string {
  const formatted = fields.map((f) =>
    f
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );

  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(", ")}, and ${formatted[formatted.length - 1]}`;
}
