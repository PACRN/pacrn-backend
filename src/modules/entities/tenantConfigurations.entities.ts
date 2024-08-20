import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TenantConfigurations {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    slogan?: string;

    @Column({ type: 'varchar', length: 255 })
    primaryColor: string;

    @Column({ type: 'varchar', length: 255 })
    secondaryColor: string;

    @Column({ type: 'bigint', nullable: true })
    borderRadius?: number;

    @Column({ type: 'varchar', length: 255 })
    logo: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    darkLogo?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    semiLogo?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    textOnlyLogo?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    logoOnly?: string;

    @Column({ type: 'boolean', default: true })
    disableDark: boolean;
}
