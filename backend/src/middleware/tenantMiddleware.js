import Membership from "../models/Membership.js";

export const requireTenant = async (req, res, next) => {
  try {
    const tenantId = req.headers["x-tenant-id"];

    if (!tenantId) {
      return res.status(400).json({
        message: "Tenant id is required",
      });
    }

    const membership = await Membership.findOne({
      userId: req.user.userId,
      tenantId,
      status: "active",
    });

    if (!membership) {
      return res.status(403).json({
        message: "You do not belong to this tenant",
      });
    }

    req.tenant = {
      tenantId: membership.tenantId,
      role: membership.role,
      membershipId: membership._id,
    };

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};