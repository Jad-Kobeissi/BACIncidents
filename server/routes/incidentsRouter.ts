import express, { type Request, type Response } from "express";
import { verify } from "jsonwebtoken";
import type { TJWT } from "../types";
import { prisma } from "../lib/prisma";
import { isEmpty } from "../isEmpty";

export const incidentsRouter = express.Router();

incidentsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ")[1] as string;

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET!))
      return res.status(401).send("Unauthorized");

    const decoded = verify(authHeader, process.env.JWT_SECRET!) as TJWT;

    const childrenIds = decoded.children.map((child) => child.id);
    console.log(decoded.children);

    const incidents = await prisma.incident.findMany({
      where: {
        childId: {
          in: childrenIds,
        },
      },
      orderBy: {
        occurredAt: "desc",
      },
      include: {
        child: true,
      },
    });

    if (incidents.length == 0)
      return res.status(404).send("No incidents found");
    return res.status(200).json(incidents);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});
incidentsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ")[1] as string;

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET!))
      return res.status(401).send("Unauthorized");

    const decoded = verify(authHeader, process.env.JWT_SECRET!) as TJWT;

    const { childId, title, description, category } = req.body;

    if (
      !childId ||
      !title ||
      !description ||
      !category ||
      isEmpty([title, description, category])
    )
      return res.status(400).send("Missing required fields");
    const child = await prisma.child.findUnique({
      where: {
        id: childId,
      },
    });

    if (!child) return res.status(404).send("Child not found");

    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        occurredAt: new Date(),
        childId: child.id,
        category,
      },
    });

    return res.status(201).json(incident);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});
