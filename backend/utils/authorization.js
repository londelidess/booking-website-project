const { User } = require('../db/models');

const hasRole = (role) => {
    return function (req, res, next) {
      if (req.user && req.user.role === role) {
        next();
      } else {
        res.status(403).json({ message:
        "Forbidden" });
      }
    };
  };

  const hasPermission = (permission) => {
    return function (req, res, next) {
      if (req.user && req.user.permissions.includes(permission)) {
        next();
      } else {
        res.status(403).json({
            message: "Forbidden"
        });
      }
    };
  };

module.exports = { hasRole, hasPermission };
