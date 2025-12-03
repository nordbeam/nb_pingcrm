/**
 * Filter configuration for Users page
 */

import { User, Settings, Mail, UserCircle } from 'lucide-react';
import type { FilterConfig } from '@/components/flop';

export const usersFilterConfig: FilterConfig[] = [
  {
    field: 'role',
    label: 'Role',
    type: 'enum',
    operators: ['==', '!='],
    icon: User,
    customParam: 'role',
    options: [
      { value: 'owner', label: 'Owner' },
      { value: 'user', label: 'User' },
    ],
  },
  {
    field: 'trashed',
    label: 'Status',
    type: 'enum',
    operators: ['=='],
    icon: Settings,
    customParam: 'trashed',
    options: [
      { value: 'not_trashed', label: 'Active' },
      { value: 'with', label: 'With Deleted' },
      { value: 'only', label: 'Only Deleted' },
    ],
  },
  {
    field: 'first_name',
    label: 'First Name',
    type: 'string',
    operators: ['ilike', '==', '!='],
    icon: UserCircle,
    placeholder: 'Enter first name...',
  },
  {
    field: 'last_name',
    label: 'Last Name',
    type: 'string',
    operators: ['ilike', '==', '!='],
    icon: UserCircle,
    placeholder: 'Enter last name...',
  },
  {
    field: 'email',
    label: 'Email',
    type: 'string',
    operators: ['ilike', '=='],
    icon: Mail,
    placeholder: 'Enter email...',
  },
];
