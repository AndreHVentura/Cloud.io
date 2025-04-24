import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

export interface IUser{
    name: string;
    email: string;
    password: string
    // role: string
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // role: { type: String, required: true }
});

//criptografar senha
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default model<IUser>("User", UserSchema);