import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

// we will update only the password
export class UpdatePasswordDTO extends PickType(CreateUserDto, ['password'] as const) {}