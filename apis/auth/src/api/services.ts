import { User } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserService {
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async save(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
}
