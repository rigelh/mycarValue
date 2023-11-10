import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException,NotFoundException} from '@nestjs/common';

// describing what we are doing
describe('AuthService', () => {

  // Calling the service and the fakeUsersService in a higher scope so we can access it later
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  // creating an instance for each case
  beforeEach(async () => {

   // creating an array where to store the data inside the service 
   const users: User[] = [];

    // Create a fake users service (more complicated user array) to avoid .find method of the fake service witten is the cases
    fakeUsersService = {
      find: (email:string ) => {
        const filteredUSers = users.filter(user => user.email === email )
        return Promise.resolve(filteredUSers)
      },
      create: (email: string, password: string) =>{
      const user = { id: Math.floor(Math.random() * 9999), email, password } as User;
      users.push(user)
        return  Promise.resolve(user as User);
      }
     };

    // Create the DI container
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    // Get the instance of AuthService
    service = module.get<AuthService>(AuthService);
  });

  // making cases
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  // case that the password gets hashed 
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('afa@fff.com', 'ajsfs');
    expect(user.password).not.toEqual('ajsfs');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });


  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    // throw a fake account
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj')).rejects.toThrow(NotFoundException);  // reject if that isnt it these is done the test is correctly done
    })

    it('throws if an invalid password is provided', async () => {
     
      await service.signup('asdf@asdf.com', 'laskdjf');
      await expect(
        service.signin('asdf@asdf.com', 'passowrd'),
      ).rejects.toThrow(BadRequestException);

    });

    it('returns a user if a corrected password is provided', async () => {
    
      await service.signup('asdf@asdf.com', 'laskdjf'); // sign it up the accound in the user which is declared at the top as an array  and acces it below

      const user = await service.signin('asdf@asdf.com', 'laskdjf');
       expect(user).toBeDefined();
    });

})
