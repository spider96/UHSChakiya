// src/constants/roles.js

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  VIEWER: 'VIEWER',
  GUEST: 'GUEST',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: ['create', 'read', 'update', 'delete'],
  [USER_ROLES.TEACHER]: ['create', 'read', 'update'],
  [USER_ROLES.VIEWER]: ['read'],
};

