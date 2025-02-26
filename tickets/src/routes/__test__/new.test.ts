import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
	const response = await request(app).post("/api/tickets").send({});
	expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is signed in", async () => {
	await request(app).post("/api/tickets").send({}).expect(401);
});

it("return status other than 401 if user is signin", async () => {
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", global.signin())
		.send({});
	expect(response.status).not.toEqual(401);
});

it("return an error if an invalid title is provided", async () => {
	await request(app)
		.post("/api/tickets")
		.set("Cookie", global.signin())
		.send({
			title: "",
			price: 10,
		})
		.expect(400);

	await request(app)
		.post("/api/tickets")
		.set("Cookie", global.signin())
		.send({
			price: 10,
		})
		.expect(400);
});

it("return an error if an invalid price is provided", async () => {
	await request(app)
		.post("/api/tickets")
		.set("Cookie", global.signin())
		.send({
			title: "random title",
			price: -1010,
		})
		.expect(400);

	await request(app)
		.post("/api/tickets")
		.set("Cookie", global.signin())
		.send({
			title: "random title",
		})
		.expect(400);
});

it("create a ticket with valid input", async () => {
	// add in a check to ensure a ticket was saved

	await request(app)
		.post("/api/tickets")
		.set("Cookie", global.signin())
		.send({
			title: "random title",
			price: 10,
		})
		.expect(201);
});
