import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from './users.service';
import {BadRequestException} from '@nestjs/common'
import { promisify } from 'util';
import { NotFoundException } from '@nestjs/common/exceptions';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

constructor( private userService: UsersService) {}

async signup(email: string, password: string) {
  
// See if email is in use
const users = await this.userService.find(email);
if (users.length){
  throw new BadRequestException('email in use');
}
// Hash the users password

// a- generate a salt
const salt = randomBytes(8).toString('hex');

// b- join the hash and the salt together
const hash = await (scrypt(password, salt, 32)) as Buffer; // buffer eshte interface, por as a type in ts perfaqson binary data

// c-joining the hash and the salt together 
const result = salt  + '.' +  hash.toString('hex')

// Create a new user and save it
const user= await this.userService.create(email, result);
return user;
}


async signin(email: string, password: string) {
// find the email of the user in database
const [user] = await this.userService.find(email);
if(!user) {
  throw new NotFoundException('user not found');
}
//take from the database the salt and the hash and store them in var
const [salt, storedHash] = user.password.split('.');
// create the new hash with the old salt
const  hash = (await scrypt(password, salt, 32)) as Buffer
// if the old hash wth new hash is not the same dont accept the user
if (storedHash !== hash.toString('hex') ){
  throw new BadRequestException('wrong password')
}
// if yes accept
return user
}
}

