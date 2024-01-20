import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { User } from "../../src/core/domain/entities/user.entity";
import { Book } from "../../src/core/domain/entities/book/book.entity";

const userCredentials = {
  email: "test1@gmail.com",
  nickname: "test",
  password: "test123",
};
const testBook = {
  title: "TEST BOOK",
  pages: ["First Page", "Second Page", "Third Page"],
};
describe("Book Controller E2E", () => {
  let app: INestApplication;
  let queryRunner: Sequelize;
  let accessToken: string;
  let book: Book;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    queryRunner = moduleFixture.get("SEQUELIZE");
    await app.init();

    await request(app.getHttpServer())
      .post("/auth/sign-up")
      .send(userCredentials);
    accessToken = (
      await request(app.getHttpServer())
        .post("/auth/login")
        .send(userCredentials)
    ).body["access-token"];
  });

  afterAll(async () => {
    const userRepository = queryRunner.getRepository(User);
    const bookRepository = queryRunner.getRepository(Book);

    const user = await userRepository.findOne({
      where: { email: userCredentials.email },
    });

    await bookRepository.destroy({ where: { userId: user.id } });

    await userRepository.destroy({ where: { id: user.id } });
  });

  it("/book Should Create Book (POST)", async () => {
    const page = await request(app.getHttpServer())
      .post("/book")
      .send(testBook)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(201);
    book = page.body;
    return page;
  });

  it("/book Should Return List Books (GET)", async () => {
    await request(app.getHttpServer())
      .get("/book")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    await request(app.getHttpServer())
      .get("/book?pageIndex=0")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    await request(app.getHttpServer())
      .get("/book?pageSize=10")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    await request(app.getHttpServer())
      .get("/book?pageIndex=1&pageSize=10")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });

  it("/book/:id Should Return Book (GET)", () => {
    return request(app.getHttpServer())
      .get(`/book/${book.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });

  it("/book/:id/last-read-page Should Update Book Last Read Page (PUT)", () => {
    return request(app.getHttpServer())
      .put(`/book/${book.id}/last-read-page`)
      .send({ pageId: book.pages[0].id })
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });

  it("/book/:id Should Update Book (PATCH)", () => {
    return request(app.getHttpServer())
      .patch(`/book/${book.id}`)
      .send({
        title: "TEST TITLE",
        pages: ["PAGE 1", "PAGE 2", "PAGE 3"],
      })
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });
});
