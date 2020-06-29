import { change as role } from './role';
import { searchSchemas } from '@instaql/db-utils';
import { searchRoles } from '@instaql/db-utils';
import { searchTables } from '@instaql/db-utils';

export const requires = (res) => [
  role({ role: res.role }),
  role({ role: res.grantee }),
];

export const change = ({ grantee, role }) => [
  'roles',
  grantee,
  'grants',
  role,
];

const questions = [
  {
    type: 'autocomplete',
    name: 'role',
    message: 'choose the role to grant',
    source: searchRoles,
    required: true,
  },
  {
    type: 'autocomplete',
    name: 'grantee',
    message: 'choose the role to grant to',
    source: searchRoles,
    required: true,
  },
];
export default questions;
