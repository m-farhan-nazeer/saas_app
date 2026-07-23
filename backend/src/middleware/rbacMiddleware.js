export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.tenant || !req.tenant.role) {
      return res.status(403).json({
        message: "Tenant role information is missing",
      });
    }

    if (!allowedRoles.includes(req.tenant.role)) {
      return res.status(403).json({
        message: "You are not allowed to perform this action",
      });
    }

    next();
  };
};