import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IJwtService, IJwtServicePayload } from 'src/domain/adapters/jwt.interface';
import { JwtConfig } from 'src/domain/config/jwt.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class LoginUseCases {
  constructor(
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JwtConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  getJwtToken(username: string) {
    const payload: IJwtServicePayload = { username };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return {
      token,
      maxAge: this.jwtConfig.getJwtExpirationTime(),
    };
  }

  getJwtRefreshToken(username: string) {
    const payload: IJwtServicePayload = { username };
    const secret = this.jwtConfig.getJwtRefreshTokenSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshTokenExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return {
      token,
      maxAge: this.jwtConfig.getJwtRefreshTokenExpirationTime(),
    };
  }

  async validateUserForLocalStragtegy(username: string, pass: string) {
    console.log('🚀 ~ LoginUseCases ~ validateUserForLocalStragtegy ~ username:', username);
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (user && match) {
      const { password, ...result } = user;
      console.log('🚀 ~ LoginUseCases ~ validateUserForLocalStragtegy ~ password:', password);
      return result;
    }
    return null;
  }

  async validateUserForJWTStragtegy(username: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (user) {
      return user;
    }
    return null;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userRepository.getUserByUsername(username);

    // const ifRefreshTokenMatches = await this.bcryptService.compare(refreshToken, user.hashRefreshToken);
    if (true) {
      return user;
    }
    return null;
  }
}
