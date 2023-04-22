import { User } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserService {
  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByRefreshToken(refreshToken: string) {
    return await this.userRepository.findOneBy({ refreshToken });
  }

  async findHashedPasswordById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['password'],
    });

    return user.password;
  }

  async findRefreshTokenById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['refreshToken'],
    });

    return user.refreshToken;
  }

  async save(user: Partial<User>) {
    return await this.userRepository.save(user);
  }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
}
