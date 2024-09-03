import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ImageType } from "./imageType.entities";
import { Provider } from "./providers.entities";

@Entity()
export class ProviderImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  imagePath: string;

  @Column()
  imageCaption: string;

  @Column()
  imageOrder: number;

  @ManyToOne(() => Provider, provider => provider.images)
  @JoinColumn({ name: 'providerCode', referencedColumnName: 'code' }) // Correctly defines the foreign key column
  provider: Provider;

  @Column()
  providerCode: string;

  @Column()
  imageTypeId: number;
}
