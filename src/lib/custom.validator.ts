import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.schema';
import { Model, isValidObjectId } from 'mongoose';

@ValidatorConstraint({ name: 'isValidRoles', async: false })
export class IsValidRoles implements ValidatorConstraintInterface {
  validate(roles: any, args: ValidationArguments) {
    const allowedRoles = ['runner', 'admin', 'manager'];

    if (!roles || !Array.isArray(roles)) {
      return false;
    }

    return roles.every(role => allowedRoles.includes(role));
  }

  defaultMessage(args: ValidationArguments) {
    return `Roles must be one or more of the following: runner, admin, manager`;
  }
}


@Injectable()
@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
export class IsEmailUnique implements ValidatorConstraintInterface {
//   constructor(private readonly userRepository: YourUserRepository) {} // Inject your user repository
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async validate(email: string, args: ValidationArguments) {
    const existingUser = await this.userModel.findOne({email:email});
    return !existingUser; // Returns true if email is unique (doesn't exist), false otherwise
  }

  defaultMessage(args: ValidationArguments) {
    return `Email '${args.value}' is already in use`;
  }
}