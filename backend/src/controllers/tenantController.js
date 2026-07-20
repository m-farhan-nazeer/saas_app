import Tenant from "../models/Tenant.js";
import Membership from "../models/Membership.js";

export const createTenant = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Name and slug are required",
      });
    }

    const existingTenant = await Tenant.findOne({ slug });

    if (existingTenant) {
      return res.status(409).json({
        message: "Tenant slug already exists",
      });
    }

    const tenant = await Tenant.create({
      name,
      slug,
      createdBy: req.user.userId,
    });

    await Membership.create({
      userId: req.user.userId,
      tenantId: tenant._id,
      role: "admin",
      status: "active",
    });

    res.status(201).json({
      message: "Tenant created successfully",
      tenant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};