/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({unique: true})
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

}
