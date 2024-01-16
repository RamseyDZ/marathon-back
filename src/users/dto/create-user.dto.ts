import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, classToPlain } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsDateString, IsPhoneNumber, MinLength, MaxLength, IsEnum} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Exclude({toClassOnly: true})
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(25)
  username: string;

  @IsDateString()
  birthdate: string;

  @IsNotEmpty()
  @IsPhoneNumber('DZ', { message: 'Invalid phone number, we accept only algerian numbers' })
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Exclude({toClassOnly: true, toPlainOnly: true})
  password: string;

  @IsEnum(['runner', 'manager', 'admin'], {each: true})
  @Exclude({toClassOnly: true})
  // @Validate(IsValidRoles)
  @Transform(({ value }) => {return ( value.length>0 ? value : ['runner'])}) // Assigns 'runner' if no roles are provided
  roles: ('runner' | 'admin' | 'manager')[];

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Exclude({toClassOnly: true})
  familyname: string;

  // constructor(partial: Partial<CreateUserDto>) {
  //   Object.assign(this, partial);
  // }
}
