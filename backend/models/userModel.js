import mongoose from "mongoose";
import brcypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await brcypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
