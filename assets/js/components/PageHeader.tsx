import { ClientModalLink } from '@/lib/inertia';
import type { ModalConfig } from '@/lib/inertia';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Route } from '@/routes';

type PrefetchMode = 'hover' | 'mount' | 'click';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: Route | string;
    icon?: React.ReactNode;
    loadingComponent?: React.ComponentType;
    modalConfig?: ModalConfig;
    prefetch?: boolean | PrefetchMode | PrefetchMode[];
    cacheFor?: number;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <ClientModalLink
          href={action.href}
          loadingComponent={action.loadingComponent}
          modalConfig={action.modalConfig}
          prefetch={action.prefetch}
          cacheFor={action.cacheFor}
        >
          <Button size="sm" className="gap-1.5">
            {action.icon ?? <Plus className="h-4 w-4" />}
            {action.label}
          </Button>
        </ClientModalLink>
      )}
    </div>
  );
}
