import request from "supertest";
import { app } from "../../app";

// supertest by default does not manage cookies, so we need to manually manage them

it("responds with details about the current user", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .get("/api/users/currentuser")
    .send({})
    .expect(200);
});
