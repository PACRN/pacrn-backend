import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';
import { User } from "../entities/user.entities";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { omit } from '../../utilities/omitKeys';

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
        if (!user) throw new Error('Invalid email address or password');
        if (!user.isVerified) return null;

        const secretKey = process.env.HASH_SECRET_KEY!;
        const hmac = crypto.createHmac('sha256', secretKey).update(password).digest('hex');
        const isPasswordValid = await bcrypt.compare(hmac, user.password);
        if (!isPasswordValid) throw new Error('Invalid email or password');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return { ...omit(user, ['password', 'isVerified', 'verificationCode']), token };
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

    public async updateUser(user: User) {
        const existingUser = await this.repository.findOneBy({ where: { email: user.email } });
        if (existingUser) {
            if (!user.profilePicture) {
                user.profilePicture = existingUser.profilePicture;
            }
            let result = await this.repository.update(existingUser.id, user);
            return result;
        }
        throw new Error('No user found');
    }

    public async getUserByEmail(email: string) {
        const user = await this.repository.findOneBy({ where: { email } });
        if (!user) throw new Error('User not found');
        return { ...omit(user, ['id', 'password', 'isVerified', 'verificationCode']) };
    }

    public async removeProfilePicture(email: string) {
        const user = await this.repository.findOneBy({ where: { email } });
        if (!user) throw new Error('User not found');
        user.profilePicture = null;
        await this.repository.update(user.id, user);
        return { message: 'Profile picture removed successfully' };
    }

}