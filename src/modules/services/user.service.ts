import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';
import { User } from "../entities/user.entities";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

@Service()
export class UserService extends BaseService<User> {
    constructor(@Inject(() => UserRepository) private userRepository: UserRepository) {
        super(userRepository)
    }

    public async createUser(user: User) {
        const existingUser = (await this.repository.findAll({ where: { email: user.email } })).length > 0;
        if (existingUser) throw new Error('Email is already in use');

        return await this.repository.create(user);
    };

    public async loginUser(email: string, password: string) {
        const users: User[] = await this.repository.findAll({ where: { email } });
        if (users.length == 0) throw new Error('No email present, Please signup');
        
        const user = users[0];
        const secretKey = process.env.HASH_SECRET_KEY!;
        const hmac = crypto.createHmac('sha256', secretKey).update(password).digest('hex');

        const isPasswordValid = await bcrypt.compare(hmac, user.password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return { token };
    }


}