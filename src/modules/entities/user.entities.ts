import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column()
    password?: string;

    @Column({ default: false })
    isVerified?: boolean;

    @Column({ nullable: true })
    verificationCode?: string;

    @Column({ nullable: true })
    profilePicture?: string;

    @BeforeInsert()
    async hashPassword?() {
        const secretKey = process.env.HASH_SECRET_KEY!; // Add your secret key to .env
        const hmac = crypto.createHmac('sha256', secretKey).update(this.password).digest('hex');
        this.password = await bcrypt.hash(hmac, 10);
    }
}
