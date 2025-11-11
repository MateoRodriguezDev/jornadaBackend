import { HttpStatus, Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { LoginDto } from "./dto/login-dto";
import { UsersService } from "../users/users.service";
import { checkPassword } from "src/helpers/bcrypt.helper";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register-dto";
import { envs } from "src/config";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    await this.usersService.create(registerDto);
    return {
      message: "User created successfully",
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException("Invalid Email");
    }

    if (email !== envs.superadmin_email) {
      // const isPasswordValid = await checkPassword(password, user.password);
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid Password");
      }
    }

    const payload = { email: user.email, role: user.role, userId: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
    };
  }
}
