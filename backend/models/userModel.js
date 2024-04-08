import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    id:{
        type : Number,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
        type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema);

export default User;