import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    //  create an app from the app module
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {

    const email = 'asdfsdf123aefs4@asdf.com'; //! ndyshoje emailin pas cdo testi ndryshe te jep error 400 bad request

    const res = await request(app.getHttpServer()) // make a request to http server
      .post('/auth/signup')
      .send({ email, password: 'asdsffs' })
      .expect(201);
    const { id, email: email_1 } = res.body;
    expect(id).toBeDefined();
    expect(email_1).toEqual(email_1);
    
  });




  it('signup as a new user then get the currently logged in ', async () => {

    const email = 'testsignupe2e@123.com';

    const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send( {email, password: 'asdsffs' })
    .expect(201);

    // we save and put the cookie inside the body of the response manually inside a test enviroment
    const cookie = res.get('Set-Cookie');

    const {body} = await request(app.getHttpServer())
    .get('/auth/whoami')
    .set('Cookie', cookie)
    .expect(200)

    expect(body.email).toEqual(email);
  })

});
