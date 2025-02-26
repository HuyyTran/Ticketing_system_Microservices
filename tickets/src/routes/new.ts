import express, { Request, Response } from "express";
import { requireAuth } from "@datn242/common";

const router = require("express").Router();

router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
	res.sendStatus(200);
});

export { router as createTicketRouter };
