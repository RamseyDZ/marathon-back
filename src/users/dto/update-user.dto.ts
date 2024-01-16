import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// we cant update email or password
export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), ['password', 'email', 'roles', 'familyname'] as const)
 {}


