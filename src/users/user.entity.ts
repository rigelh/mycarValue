import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterUpdate, AfterRemove, OneToMany} from 'typeorm';
import { Report } from 'src/reports/reports.entity';

@Entity()
export class User {

@PrimaryGeneratedColumn()
id: number

@Column()
email: string;

@Column()
password: string;

// associating relation
@OneToMany(()=> Report, (report) => report.user) // mesoji permenddsh eshte si te besh join
reports: Report[];


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

