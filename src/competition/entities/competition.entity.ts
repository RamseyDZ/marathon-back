import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompetitionDocument = HydratedDocument<Competition>; 

// export class Competition {}
@Schema()
export class Competition {
    
    @Prop({default: "marathon bouaaza - Chahna"})
    competitionName: string; 
    
    @Prop({default: 'waiting'})
    state: 'pending' | 'finished' | 'opened' | 'started'; // Define user roles

    // check the competition name and then define the saison name based on this competition name (if existe so next saison else saison one)
    @Prop({required: true, unique: true})// we cant have the same saison for different competitions
    saison: Number; 
    
    @Prop()
    date: Date; 
    
}

export const UserSchema = SchemaFactory.createForClass(Competition);