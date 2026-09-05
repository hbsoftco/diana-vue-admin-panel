import type { Variant } from '@/shared/types/models'

/**
 * Self-contained mock data for the Tables showcase. Names, emails, and dates
 * are fixture identifiers (not translated UI copy) and stay literal across
 * every locale, matching how the rest of the catalogue treats sample data.
 */

export type Person = {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  date: string
  online: boolean
}

export const people: Person[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    role: 'Product Designer',
    status: 'active',
    date: '2024-01-12',
    online: true,
  },
  {
    id: 2,
    name: 'Liam Carter',
    email: 'liam.carter@example.com',
    role: 'Frontend Engineer',
    status: 'active',
    date: '2024-02-08',
    online: false,
  },
  {
    id: 3,
    name: 'Sophia Nguyen',
    email: 'sophia.nguyen@example.com',
    role: 'Product Manager',
    status: 'inactive',
    date: '2024-03-21',
    online: true,
  },
  {
    id: 4,
    name: 'Noah Bennett',
    email: 'noah.bennett@example.com',
    role: 'Backend Engineer',
    status: 'active',
    date: '2024-04-02',
    online: false,
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@example.com',
    role: 'QA Engineer',
    status: 'inactive',
    date: '2024-05-17',
    online: true,
  },
]

export type Invoice = {
  id: string
  customer: string
  date: string
  amount: string
  status: 'paid' | 'cancelled'
}

export const invoices: Invoice[] = [
  { id: 'INV-2041', customer: 'Ava Thompson', date: '2024-06-01', amount: '$1,240.00', status: 'paid' },
  { id: 'INV-2042', customer: 'Ethan Walker', date: '2024-06-03', amount: '$860.50', status: 'cancelled' },
  { id: 'INV-2043', customer: 'Mia Johnson', date: '2024-06-05', amount: '$2,015.00', status: 'paid' },
  { id: 'INV-2044', customer: 'Lucas Perez', date: '2024-06-08', amount: '$430.00', status: 'paid' },
  { id: 'INV-2045', customer: 'Grace Kim', date: '2024-06-11', amount: '$1,120.75', status: 'cancelled' },
]

export type Project = {
  name: string
  team: string[]
  extraMembers: number
  progress: number
  variant: Variant
}

export const projects: Project[] = [
  { name: 'Diana Design System', team: ['OM', 'LC', 'SN'], extraMembers: 3, progress: 82, variant: 'primary' },
  { name: 'Workspace Onboarding', team: ['NB', 'ER'], extraMembers: 5, progress: 46, variant: 'warning' },
  { name: 'Billing Migration', team: ['OM', 'NB', 'ER', 'LC'], extraMembers: 1, progress: 97, variant: 'success' },
]

export type Order = {
  id: string
  name: string
  email: string
  category: string
  team: string[]
  extraMembers: number
  revenue: string
  progress: number
}

export const orders: Order[] = [
  {
    id: 'ORD-9001',
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    category: 'Design',
    team: ['OM', 'LC'],
    extraMembers: 2,
    revenue: '$18,240',
    progress: 72,
  },
  {
    id: 'ORD-9002',
    name: 'Liam Carter',
    email: 'liam.carter@example.com',
    category: 'Engineering',
    team: ['LC', 'NB', 'ER'],
    extraMembers: 4,
    revenue: '$26,900',
    progress: 58,
  },
  {
    id: 'ORD-9003',
    name: 'Sophia Nguyen',
    email: 'sophia.nguyen@example.com',
    category: 'Product',
    team: ['SN'],
    extraMembers: 0,
    revenue: '$9,410',
    progress: 90,
  },
  {
    id: 'ORD-9004',
    name: 'Noah Bennett',
    email: 'noah.bennett@example.com',
    category: 'Engineering',
    team: ['NB', 'ER'],
    extraMembers: 1,
    revenue: '$14,750',
    progress: 33,
  },
]
