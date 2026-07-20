import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    role: {
    type: String,
    enum: ["admin", "staff", "user"],
    default: "user",
    },
    status: {
      type: String,
      enum: ["active", "invited", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

membershipSchema.index({ userId: 1, tenantId: 1 }, { unique: true });

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;