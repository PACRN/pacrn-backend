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
        const existingUser = await this.repository.findOneBy({ where: { email: user.email } });
        if (existingUser) throw new Error('Email is already in use');

        user.verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        return await this.repository.create(user);
    };

    public async loginUser(email: string, password: string) {
        const user: User = await this.repository.findOneBy({ where: { email } });
        if (!user) throw new Error('No email present, Please signup');
        if (!user.isVerified) throw new Error('Please complete your email verification');

        const secretKey = process.env.HASH_SECRET_KEY!;
        const hmac = crypto.createHmac('sha256', secretKey).update(password).digest('hex');
        const isPasswordValid = await bcrypt.compare(hmac, user.password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return { token };
    }

    public async verifyEmail(email: string, otp: string) {
        const user = await this.repository.findOneBy({ where: { email } });

        if (!user) throw new Error('User not found');
        if (user.isVerified) throw new Error('User is already verified');
        if (user.verificationCode !== otp) throw new Error('Invalid OTP');

        user.isVerified = true;
        user.verificationCode = null;
        await this.repository.update(user.id, user);

        return { message: 'User verified successfully' };
    }


}