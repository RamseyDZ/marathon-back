// import { OmitType } from "@nestjs/mapped-types"
import { OmitType } from "@nestjs/swagger"
import { User } from "../entities/user.schema"

export class PayloadUserDto extends OmitType(User, ['password', "email"] as const) {
    // createdA?: string
    // updateAt?: string
}