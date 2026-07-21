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

export const getMyTenants = async (req, res) => {
  try {
    const memberships = await Membership.find({
      userId: req.user.userId,
      status: "active",
    }).populate("tenantId");

    const tenants = memberships.map((membership) => ({
      membershipId: membership._id,
      role: membership.role,
      status: membership.status,
      tenant: membership.tenantId,
    }));

    res.status(200).json({
      message: "Tenants fetched successfully",
      tenants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};