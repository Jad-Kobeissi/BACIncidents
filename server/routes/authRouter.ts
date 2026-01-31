import express, { type Request, type Response } from "express";
import { isEmpty } from "../isEmpty";
import { prisma } from "../lib/prisma";
import axios from "axios";
import { sign } from "jsonwebtoken";

export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password || isEmpty([identifier, password]))
      return res.status(400).send("Username and password are required.");

    let bacToken;
    try {
      const response = await axios.post("https://sisapi.bac.edu.lb/api/login", {
        identifier,
        password,
      });

      if (response.data.success) {
        bacToken = response.data.data._token;
      } else {
        return res.status(500).send("BAC authentication failed.");
      }
    } catch (error: any) {
      return res
        .status(error.response.status)
        .send(error.response.data.message);
    }

    let children: Array<{ id: string; class: string; learner: string }> = [];
    let lastName: string;
    try {
      const response = await axios.get(
        `https://sisapi.bac.edu.lb/api/select-child`,
        {
          headers: {
            Authorization: `Bearer ${bacToken}`,
          },
        },
      );

      children = response.data.data.learners;

      lastName = children[0]?.learner
        .split(" ")[1]
        ?.toLocaleLowerCase() as string;
    } catch (error: any) {
      return res
        .status(error.response.status)
        .send(error.response.data.message);
    }

    const parent = await prisma.parent.findFirst({
      where: {
        email: identifier,
      },
      include: {
        children: true,
      },
    });

    if (!parent) {
      const newParent = await prisma.parent.create({
        data: {
          email: identifier,
          name: lastName,
        },
      });

      children.map(async (child) => {
        await prisma.child.create({
          data: {
            name: ((child.learner.split(" ")[0] as string) +
              child.learner.split(" ")[1]) as string as string,
            parentId: newParent.id,
            grade: child.class,
          },
        });
      });
    }

    const token = await sign(
      { id: parent?.id, children, parent },
      process.env.JWT_SECRET as string,
    );

    return res.status(200).json({ bacToken, token });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
});
