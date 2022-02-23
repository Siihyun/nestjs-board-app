import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  signIn(
    authCredentialsDto: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const payload = { username: authCredentialsDto.username };
    const accessToken = this.jwtService.sign(payload);

    return this.userRepository.singIn(authCredentialsDto, accessToken);
  }
}
