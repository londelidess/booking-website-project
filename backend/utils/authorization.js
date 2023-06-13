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


  // in a routes, I use this like this
  // const express = require('express');
  // const { requireAuth, requireRole, requirePermission } = require('path-to-your-auth-file');
  // const router = express.Router();

  // router.get('/some-protected-route', requireAuth, requireRole('admin'), requirePermission('read'), (req, res) => {
  //   // your route handler code here
  // });

  module.exports = router;

module.exports = { hasRole, hasPermission };
