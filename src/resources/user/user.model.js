import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
      trim: true,
    },
    screen_name: {
      type: String,
      maxlength: 15,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    description: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
    location: {
      type: String,
    },
    url: {
      type: String,
    },
    followers_list: {
      type: Array,
    },
    following_list: {
      type: Array,
    },
    profile_picture_url: {
      type: String,
    },
    banner_url: {
      type: String,
    },
    default_profile_picture: {
      type: Boolean,
      default: true,
    },
    default_banner: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function checkPassword(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

export const User = mongoose.model("user", userSchema);