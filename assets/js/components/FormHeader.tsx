import { Link } from "@/lib/inertia";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { Route } from "@/routes";

interface FormHeaderProps {
  title: string;
  backHref: Route | string;
  backLabel: string;
  isDeleted?: boolean;
}

export function FormHeader({ title, backHref, backLabel, isDeleted }: FormHeaderProps) {
  return (
    <div className="mb-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {isDeleted && <Badge variant="destructive">Deleted</Badge>}
      </div>
    </div>
  );
}
