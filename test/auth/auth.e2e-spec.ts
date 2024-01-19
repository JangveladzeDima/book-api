import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { User } from "../../src/core/domain/entities/User.entity";

const userCredentials = {
  email: "test@gmail.com",
  nickname: "test",
  password: "test123",
};
describe("Auth Controller E2E", () => {
  let app: INestApplication;
  let queryRunner: Sequelize;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    queryRunner = moduleFixture.get("SEQUELIZE");
    await app.init();
  });

  afterAll(async () => {
    await queryRunner
      .getRepository(User)
      .destroy({ where: { email: userCredentials.email } });
  });

  it("/auth/sign-up Should Register New User (POST)", async () => {
    await request(app.getHttpServer())
      .post("/auth/sign-up")
      .send(userCredentials)
      .expect(201);
  });

  it("/auth/login Should Login User (POST)", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({
        ...userCredentials,
        nickname: undefined,
      })
      .expect(201);
  });

  it("/auth/sign-up Should Return Email Already Exist Error (POST)", () => {
    return request(app.getHttpServer())
      .post("/auth/sign-up")
      .send(userCredentials)
      .expect(400);
  });

  it("/auth/login Should Not Found User (POST)", async () => {
    await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "example",
        password: userCredentials.password,
      })
      .expect(404);

    await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: userCredentials.email,
        password: "example",
      })
      .expect(404);
  });
});
