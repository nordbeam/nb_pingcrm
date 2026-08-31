/**
 * Custom Modal Stack Renderer using shadcn Dialog and Sheet components
 *
 * This is the app-specific renderer that uses the hook-first API from nb_inertia.
 * You can customize the UI completely using your preferred component library.
 */

import { Suspense, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { HeadlessModal, ModalPageProvider, useModalStack } from '@nordbeam/nb-inertia/react/modals';
import type { ModalConfig } from '@nordbeam/nb-inertia/react/modals';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// Animation duration in ms (should match CSS)
const ANIMATION_DURATION = 200;

/**
 * Get Dialog content width class based on size config
 */
function getDialogSizeClass(size: ModalConfig['size']): string {
  switch (size) {
    case 'sm':
      return 'sm:max-w-sm';
    case 'md':
      return 'sm:max-w-md';
    case 'lg':
      return 'sm:max-w-lg';
    case 'xl':
      return 'sm:max-w-xl';
    case '2xl':
      return 'sm:max-w-2xl';
    case '3xl':
      return 'sm:max-w-3xl';
    case '4xl':
      return 'sm:max-w-4xl';
    case '5xl':
      return 'sm:max-w-5xl';
    case 'full':
      return 'sm:max-w-full';
    default:
      return 'sm:max-w-lg';
  }
}

/**
 * Get Sheet side based on position config
 */
function getSheetSide(position: ModalConfig['position']): 'top' | 'right' | 'bottom' | 'left' {
  switch (position) {
    case 'left':
      return 'left';
    case 'right':
      return 'right';
    case 'top':
      return 'top';
    case 'bottom':
      return 'bottom';
    default:
      return 'right';
  }
}

/**
 * Individual modal wrapper that handles animated closing
 */
function AnimatedModal({
  modal,
  onClose,
}: {
  modal: ReturnType<typeof useModalStack>['modals'][number];
  onClose: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const isSlideover = modal.config.slideover === true;
  const showCloseButton = modal.config.closeButton !== false;
  const closeExplicitly = modal.config.closeExplicitly === true;
  const closeOnClickOutside = modal.config.closeOnClickOutside !== false;
  const Component = modal.component;

  const handleClose = useCallback(() => {
    if (closeExplicitly) return;

    // Trigger close animation
    setIsOpen(false);

    // Call onClose callback immediately for URL update
    if (modal.onClose) {
      modal.onClose();
    }

    // Remove from stack after animation completes
    setTimeout(() => {
      onClose(modal.id);
    }, ANIMATION_DURATION);
  }, [modal.id, modal.onClose, onClose, closeExplicitly]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  // Default loading fallback component
  const DefaultLoadingFallback = () => (
    <div className="p-6 flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  // Render loading state or actual content
  const LoadingComponent = modal.loadingComponent;
  const content = (
    <HeadlessModal modal={modal} onClose={handleClose} isOpen={isOpen}>
      {({ close }) => (
        <ModalPageProvider
          component={modal.componentName}
          props={modal.props}
          url={modal.url}
          baseUrl={modal.baseUrl}
          returnUrl={modal.returnUrl}
        >
          {modal.loading ? (
            LoadingComponent ? (
              <LoadingComponent />
            ) : (
              <DefaultLoadingFallback />
            )
          ) : (
            <Suspense fallback={<DefaultLoadingFallback />}>
              <Component {...modal.props} onClose={close} />
            </Suspense>
          )}
        </ModalPageProvider>
      )}
    </HeadlessModal>
  );

  if (isSlideover) {
    const side = getSheetSide(modal.config.position);

    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent
          side={side}
          showCloseButton={showCloseButton}
          className="overflow-y-auto p-0"
          onInteractOutside={(e) => {
            if (closeExplicitly || !closeOnClickOutside) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (closeExplicitly) {
              e.preventDefault();
            }
          }}
        >
          <VisuallyHidden>
            <SheetTitle>Modal</SheetTitle>
            <SheetDescription>Modal content</SheetDescription>
          </VisuallyHidden>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  const sizeClass = getDialogSizeClass(modal.config.size);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`overflow-y-auto max-h-[90vh] ${sizeClass}`}
        showCloseButton={showCloseButton}
        onInteractOutside={(e) => {
          if (closeExplicitly || !closeOnClickOutside) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (closeExplicitly) {
            e.preventDefault();
          }
        }}
      >
        <VisuallyHidden>
          <DialogTitle>Modal</DialogTitle>
          <DialogDescription>Modal content</DialogDescription>
        </VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}

/**
 * Modal Stack Renderer - renders modals from the stack using shadcn components
 *
 * The component is already resolved by InitialModalHandler before being pushed
 * to the stack, so we just render modal.component directly.
 */
export function ModalStackRenderer() {
  const { modals, popModal } = useModalStack();

  return (
    <>
      {modals.map((modal) => (
        <AnimatedModal key={modal.id} modal={modal} onClose={popModal} />
      ))}
    </>
  );
}

export default ModalStackRenderer;
