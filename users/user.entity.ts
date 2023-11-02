import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterUpdate, AfterRemove} from 'typeorm';
import { Exclude } from "class-transformer";

@Entity()
export class User {

@PrimaryGeneratedColumn()
id: number
@Column()
email: string;

@Column()
password: string;

@AfterInsert()
loginsert() {
  console.log('Inserted user with id', this.id);
}

@AfterUpdate()
logupdate() {
  console.log('Updated user with id', this.id);
}

@AfterRemove()
logremove() {
  console.log('Remove user with id', this.id);
}
}

