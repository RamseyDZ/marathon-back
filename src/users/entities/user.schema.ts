import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>; 

// export class User {}
@Schema({ collection: 'users', timestamps: true })
export class User {

    // id: string;
    @Prop({required: true})
    username: string;
    
    @Prop({select: false})
    password: string;

    @Prop()
    roles: ('runner' | 'manager' | 'admin')[]; // Define user roles

    @Prop({required: true, unique: true})// an email is related to one and only one user 
    email: string; 
    
    @Prop()
    firstname: string; 
    
    @Prop()
    familyname: string; 
    
    @Prop({required: true, unique: true}) // a phone number can be used only with one account. 
    phone: string; 
    
    @Prop()
    birthdate: Date; 
}

export const UserSchema = SchemaFactory.createForClass(User);