// auth/auth.service.ts

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Aquí tu lógica para validar usuario y contraseña
  }

  async login(user: any) {
    const payload = { userId: user.userId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
