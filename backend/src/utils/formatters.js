exports.formatUserToken = function ({ tokenCode, language, user }) {
  return { tokenCode, user: exports.formatUser(user, language) };
};

exports.formatUser = function (user) {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    isActivated: user.isActivated,
  };
};
