import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;




// import mongoose, { Document } from 'mongoose';

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string; // hashed password
// }

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);




// // // models/User.ts
// // import mongoose from 'mongoose';

// // export interface IUser extends Document {
// //   username: string;
// //   email: string;
// //   password: string; // hashed
// // }

// // const userSchema = new mongoose.Schema({
// //   username: { type: String, required: true, unique: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// // }, { timestamps: true });

// // export default mongoose.models.User || mongoose.model('User', userSchema);
