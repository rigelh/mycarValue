import { Body, Controller, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor, Session} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from './interceptors/seriliaze.interceptors'
import { UserDto } from './dtos/user.dto';
import { Seriliaze } from './interceptors/seriliaze.interceptors';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';



@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}



@Post('/signout')
signOut(@Session() session: any){
session.userId = null;
}

@Get('/whoami')
whoAmI(@Session() session:any){
  console.log('hello')
  return this.usersService.findOne(session.userId);
}

@Post('/signup')
async createUser(@Body() body: (CreateUserDto), @Session() session: any) {
 const user = await this.authService.signup(body.email, body.password)
 session.UserId = user.id;
 return user;
}

@Post('/signin')
async signUser(@Body() body: (CreateUserDto), @Session() session: any) {
 const user = await this.authService.signin(body.email, body.password)
 session.UserId = user.id;
return user;
}

// id nga request body merret si string kshuqe id e marrim si string ne parameter dhe i bejme parseINt() qe te
// beje match me metoden ne service e cila e cileson id si number

@Get('/:id')
async findUser(@Param('id') id : string){
  console.log('handler is running')
const user = await this.usersService.findOne(parseInt(id));
if( !user){
  throw new NotFoundException('user not found!');
}
  return user;
}

// marrim te gjithe objektet e tabeles ku perfshihet useri qe duam te marrim
// ne fund mund te shtosh userat me te clin email do te marresh me get method


// gjithashtu duke bere kete request http://localhost:3000/auth merr te gjithe userat nqs do
// @Seriliaze(UserDto)
@Get()
async findAllUsers(@Query('email') email : string){
  const user = await this.usersService.find(email);
  if(!user){
    throw new NotFoundException('user not found!');
  }
  return user;
}


@Delete('/:id')
 removeUser(@Param('id') id:string){
return this.usersService.remove(parseInt(id))
}

// ne menyre qe te krijojme nje llogjik nqs useri do te ndryshoje passw, emailin ose te dyja do ndertojme 
// nje dto file te ri (update-user.dto)
@Patch('/:id')
updatepartialy(@Param('id') id:string, @Body() body: (UpdateUserDto)){
return this.usersService.update(parseInt(id), body)
}
}
