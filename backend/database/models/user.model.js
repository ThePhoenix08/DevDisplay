import { Schema, model } from "mongoose";
import Constants from "../../constants.js";

/* 
Model:
  essentials:
    _id: ObjectId
    username: String
    email: String
  
  metadata:
    passwordHash: String
    refreshToken: String
    role: [pioneer, enhancer, innovator, moderator, admin]
    createdAt: Date
    updatedAt: Date
    
  details:
    fullname: String
    location: String
    bio: String
    avatarURL: String
    portfolioURL: String
    skills: [String]
    socials: {
      githubURL: String
      linkedinURL: String
      twitterURL: String
      instagramURL: String
    }
*/

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: Constants.USERNAME_MINLEN,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },

  passwordHash: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["pioneer", "enhancer", "innovator", "moderator", "admin"],
    required: true,
  },

  fullname: {
    type: String,
    maxlength: Constants.FULLNAME_MAXLEN,
    minlength: Constants.FULLNAME_MINLEN,
    required: true,
  },
  location: {
    type: String,
    maxlength: Constants.LOCATION_MAXLEN,
    minlength: Constants.LOCATION_MINLEN,
  },
  bio: {
    type: String,
    maxlength: Constants.BIO_MAXLEN,
    minlength: Constants.BIO_MINLEN,
  },
  avatarURL: {
    type: String,
  },
  portfolioURL: {
    type: String,
  },
  skills: {
    type: [String],
  },
  socials: {
    githubURL: {
      type: String,
    },
    linkedinURL: {
      type: String,
    },
    twitterURL: {
      type: String,
    },
    instagramURL: {
      type: String,
    },
  },
}, { timestamps: true });

const UserModel = model("User", UserSchema);
export default UserModel;