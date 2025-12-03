/**
 * Filter configuration for Contacts page
 */

import { User, Building2, Settings, Mail, MapPin, Phone } from 'lucide-react';
import type { FilterConfig } from '@/components/flop';

export const contactsFilterConfig: FilterConfig[] = [
  {
    field: 'organization_id',
    label: 'Organization',
    type: 'relation',
    operators: ['==', '!='],
    icon: Building2,
    optionsKey: 'organizations', // loaded from filterOptions prop
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
    icon: User,
    placeholder: 'Enter first name...',
  },
  {
    field: 'last_name',
    label: 'Last Name',
    type: 'string',
    operators: ['ilike', '==', '!='],
    icon: User,
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
  {
    field: 'phone',
    label: 'Phone',
    type: 'string',
    operators: ['ilike', '=='],
    icon: Phone,
    placeholder: 'Enter phone...',
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
