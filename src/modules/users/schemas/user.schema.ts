import {Schema} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './../interfaces/user.entity.interface';


let UserSchema = new Schema({
    email: String,
    password: String,
    roles: [String],
},{ bufferCommands: false , timestamps:true});

UserSchema.pre<UserEntity>('save', async function(next){
    //'this' refers to the current document about to be saved
    const user = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
});

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

UserSchema.plugin(mongoosePaginate);

export {UserSchema};