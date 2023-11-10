import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>; // partial is added that we want only to use some of the methods not all 

  beforeEach(async () => {
    // on which the controller is depended on (look inside the constructor of the controller)
    fakeAuthService = {
signin: (email: string, password: string) => {
  // give an fixed user that has signed in
return Promise.resolve({ id: 1, email, password} as User)
}
// signup: () => {}
    };

    fakeUsersService = {
findOne: (id: number) => { 
  return Promise.resolve({ id, email: "sfsfs@fssf.com", password: "mfsdfs"} as User)
},

find: (email: string ) => {

return Promise.resolve([{id: 1 ,email, password: "mfsdfs" } as User] )
},

remove: (id : number) => {

return Promise.resolve({id, email: "sfsfs@fssf.com", password: "mfsdfs" } as User )

},
// update: () => {}

    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });


//cases
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


it('findUser throws error if the user with the given id is not found', () => {
async () => {
fakeUsersService.findOne = () => null;
     
await expect(controller.findUser("1")).rejects.toThrow(NotFoundException);
}
}); 

it('findUser returns a single user with the given id', () => {
  async () => {
    const user = await controller.findUser("1");
     expect(user).toBeDefined();
  }
  }); 


it('findAllUsers returns a list with all the users', () => {
async () => {

  const users = await controller.findAllUsers('asd@asd.com')
expect(users.length).toEqual(1);
expect(users[0].email).toEqual('asd@asd.com')
}
}); 


it('signin updates session object and returns user', () => {
  async () => {
const session = {userId: -10};
const user = await controller.signin(
  { email: 'asdf@asdf.com', password: 'asdf'},
session
);
expect(user.id).toEqual(1);
expect(session.userId).toEqual(1);

  }
})

});
