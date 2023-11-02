import { Injectable } from '@nestjs/common';
import {Repository } from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
// ben inject repository me user repository brenda servis ne menyre qe te besh pjesen llogjike te crud operations
constructor(@InjectRepository(User) private repo: Repository<User>) {}

//create with post in controller
create(email: string, password: string){

  // me metoden create() krijon nje entity instance (shembull) dhe i jep te dhenat
  const user = this.repo.create({ email, password});

  // me metoden save() te dhenat ruhen ne databaze
  return this.repo.save(user);
}

findOne( id: number ) {
  if(id === undefined || !id){
    return null;
  } 
    return this.repo.findOne({ where: { id } });
}

find(email: string){
  return this.repo.find({ where: { email } });
}

// partial is a keyword in NestJS that makes partial update when you use patch operation 
async update(id: number, attrs: Partial<User> ){
  // marrim objektin e ati useri duke e kaur nga id, nga databaza
   const user = await this.findOne(id);
   // is shtojme te dhenat dhenat attrs dhe i bejm save prape ne databaze
   Object.assign(user, attrs);
   return this.repo.save(user);
}

async remove(id: number, ){
  const user = await this.findOne(id);
   return this.repo.remove(user);
}
}

