import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// const mongoUser = process.env.MONGO_USER;
// const mongoPassword = process.env.MONGO_PASSWORD;
// const mongoHostname = process.env.MONGO_URI;
// console.log("Mongo uri : ", process.env.MONGO_URI); 
// const dbName = process.env.DB_NAME;

// console.log("Process db user : ", process.env.DB_USER)
// const userDb = process.env.DB_USER;
// const pwdDb = process.env.DB_PWD;

// const url = `${mongoHostname}`;

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      // auth: {
      //   username: userDb,
      //   password: pwdDb,
      // },
    }),
  ],
})
export class MongoModule {}
