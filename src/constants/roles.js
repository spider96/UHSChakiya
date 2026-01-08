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

export const COLORS = {
  PRIMARY: '#4A90E2',
  SECONDARY: '#50E3C2',
  ADMIN: '#FF5733',
  TEACHER: '#33C1FF',
  VIEWER: '#75FF33',
  GUEST: '#CCCCCC',
};