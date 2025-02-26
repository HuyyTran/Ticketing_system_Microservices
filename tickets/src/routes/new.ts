import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@datn242/common";

const router = require("express").Router();

router.post(
	"/api/tickets",
	requireAuth,
	[
		body("title").notEmpty().withMessage("Title is required"),
		body("price")
			.isFloat({ gt: 0 })
			.withMessage("Price must be a positive number"),
	],
	validateRequest,
	(req: Request, res: Response) => {
		res.sendStatus(200);
	},
);

export { router as createTicketRouter };
