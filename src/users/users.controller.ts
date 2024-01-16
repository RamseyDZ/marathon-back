import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UseFilters } from '@nestjs/common';
import { CastExceptionFilter, MongoExceptionFilter } from 'src/mongodb/mongo.handler';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PayloadUserDto } from './dto/payload-user.dto';
import { classToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { json } from 'stream/consumers';

@Controller({
	path: 'users',
	version: '1'
})
@UseFilters(MongoExceptionFilter)
@UseFilters(CastExceptionFilter)
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<PayloadUserDto> {
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll(@Query('role') role?: 'runner' | 'manager' | 'admin') {
		return this.usersService.findAll(role);
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<PayloadUserDto> {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
		const buffer = plainToInstance(UpdateUserDto, updateUserDto)
		console.log("User upadete dto: ",  buffer); 
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
