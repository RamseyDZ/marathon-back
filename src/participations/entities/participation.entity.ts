import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/users/entities/user.schema";

@Schema()
export class Participation {
    @Prop({type: mongoose.Types.ObjectId, ref: User})
    idUser: User; 


}
