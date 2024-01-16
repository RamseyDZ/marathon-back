import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ParticipationsModule } from './participations/participations.module';
import { CompetitionModule } from './competition/competition.module';
import { MongoModule } from './mongodb/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
    	ThrottlerModule.forRoot([{ limit: 10, ttl: 60 }]),
		AuthModule, 
		UsersModule, 
		ParticipationsModule, 
		CompetitionModule, 
		MongoModule
	],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
