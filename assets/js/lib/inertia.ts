// Enhanced Inertia.js integration with nb_routes support (React)
//
// This file re-exports enhanced components from nb_inertia that provide
// automatic integration with nb_routes rich mode. Import from this file
// instead of @inertiajs/react to get the enhanced functionality.
//
// Example:
//   import { router, Link, useForm } from '@/lib/inertia';
//   import { user_path } from '@/routes';
//
//   router.visit(user_path(1));           // Works with RouteResult objects
//   <Link href={user_path(1)}>User</Link> // Works with RouteResult objects

export { router } from '@nordbeam/nb-inertia/react/router';
export { Link } from '@nordbeam/nb-inertia/react/Link';
export { useForm } from '@nordbeam/nb-inertia/react/useForm';

// Modal components
export {
  Modal,
  HeadlessModal,
  ModalLink,
  ModalContent,
  SlideoverContent,
  CloseButton,
  ModalStackProvider,
  useModalStack,
  useModal
} from '@nordbeam/nb-inertia/react/modals';

// Re-export everything else from Inertia
export * from '@inertiajs/react';
