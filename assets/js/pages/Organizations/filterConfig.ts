/**
 * Filter configuration for Organizations page
 */

import { Building2, Settings, Mail, MapPin } from 'lucide-react';
import type { FilterConfig } from '@/components/flop';

export const organizationsFilterConfig: FilterConfig[] = [
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
    field: 'name',
    label: 'Name',
    type: 'string',
    operators: ['ilike', '==', '!='],
    icon: Building2,
    placeholder: 'Enter organization name...',
  },
  {
    field: 'email',
    label: 'Email',
    type: 'string',
    operators: ['ilike', '=='],
    icon: Mail,
    placeholder: 'Enter email...',
  },
  {
    field: 'city',
    label: 'City',
    type: 'string',
    operators: ['ilike', '=='],
    icon: MapPin,
    placeholder: 'Enter city...',
  },
  {
    field: 'country',
    label: 'Country',
    type: 'string',
    operators: ['==', '!='],
    icon: MapPin,
    placeholder: 'Enter country code...',
  },
];
