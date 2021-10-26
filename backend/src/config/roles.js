const roles = { user: 'user', admin: 'admin' };

const roleRights = new Map();

const userRights = ['logout'];

roleRights.set(roles.user, userRights);
roleRights.set(roles.admin, userRights.concat([]));

module.exports = {
  roles,
  roleRights,
};
