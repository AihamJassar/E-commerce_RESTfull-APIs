const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "E-mail required"],
      unique: [true, "E-mail must be unique"],
      lowercase: true,
    },
    phone: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetCode: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    passwordResetVerified: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.profileImage) {
    doc.profileImage = `${process.env.BASE_URL}users/${doc.profileImage}`;
  }
};

userSchema.post("init", (doc) => setImageURL(doc));
userSchema.post("save", (doc) => setImageURL(doc));

userSchema.pre("save", async function (next) {
  if (!this.isModified()) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
