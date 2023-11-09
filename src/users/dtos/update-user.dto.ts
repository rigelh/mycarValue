import { IsString, IsEmail, IsOptional   } from "class-validator";

export class UpdateUserDto {
// nqs request body ka email kontrollo a eshte string
  @IsEmail()
  @IsOptional() // nqs jo ska gje eshte optional te kete email
  email: string

  // nqs request body ka password kontrollo a eshte string
  @IsString()
  @IsOptional() // nqs jo ska gje eshte optional te kete password
  password: string

}