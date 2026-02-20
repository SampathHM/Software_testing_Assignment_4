import { describe, it, expect, vi } from "vitest";
import express from "express";
import request from "supertest";

vi.mock("../controllers/dogController", () => {
  return {
    getDogImage: (_req: any, res: any) => {
      return res.status(200).json({
        success: true,
        data: {
          imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
          status: "success",
        },
      });
    },
  };
});

import dogRoutes from "../routes/dogRoutes";

describe("DogRoutes - Positive Test", () => {
  it("GET /api/dogs/random should return 200 and mocked dog data", async () => {
    const app = express();
    app.use("/api/dogs", dogRoutes);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain(
      "https://images.dog.ceo/breeds/stbernard/"
    );
  });
});