import { BadGatewayException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model, isValidObjectId } from 'mongoose';
import { PayloadUserDto } from './dto/payload-user.dto';
import { plainToClass, plainToClassFromExist, plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async create(createUserDto: CreateUserDto): Promise<PayloadUserDto> {
		const createdUser = new this.userModel(createUserDto);
		return plainToClass(PayloadUserDto, await createdUser.save()); 
	}

	async findAll(role?: 'runner' | 'manager' | 'admin') : Promise<PayloadUserDto[]>{
		const users = role 	? await this.userModel.find({roles: [role]}).lean().exec()
							: await this.userModel.find().lean().exec();
		return users;
	}

	async findOne(id: string): Promise<PayloadUserDto> {
		const user = await this.userModel.findOne({ _id: id }).lean().exec();
		if (user) {
			return user;
		} 
		throw new NotFoundException(`User with _id:${id} not found `);		
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<PayloadUserDto> {

		console.log("User update dto on the service : ", updateUserDto); 
		const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {new: true})
		if(updatedUser){
			return updatedUser;
		}
		else {
			throw new NotFoundException(`User with _id:${id} not found `);		
		}

	}

	async remove(id: string): Promise<void> {
		const deletedItem = await this.userModel.findOneAndDelete({ _id: id })
		if(!deletedItem) {
			throw new NotFoundException("User not found or already deleted");
		}
	}
}

