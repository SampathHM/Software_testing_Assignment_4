import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import cors from "cors";
import dogRoutes from "../routes/dogRoutes";

// Create test app instance
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/dogs", dogRoutes);

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

describe("Dog API Tests", () => {
  describe("Test 1: Positive API test - GET /api/dogs/random", () => {
    it("should return 200 status code", async () => {
      const response = await request(app).get("/api/dogs/random");
      expect(response.status).toBe(200);
    });

    it("should have success property set to true", async () => {
      const response = await request(app).get("/api/dogs/random");
      expect(response.body.success).toBe(true);
    });

    it("should return data object", async () => {
      const response = await request(app).get("/api/dogs/random");
      expect(response.body.data).toBeDefined();
      expect(typeof response.body.data).toBe("object");
    });

    it("should have imageUrl in data", async () => {
      const response = await request(app).get("/api/dogs/random");
      expect(response.body.data.imageUrl).toBeDefined();
    });

    it("should have imageUrl as a string", async () => {
      const response = await request(app).get("/api/dogs/random");
      expect(typeof response.body.data.imageUrl).toBe("string");
    });
  });

  describe("Test 2: Negative API test - Invalid route", () => {
    it("should return 404 status code", async () => {
      const response = await request(app).get("/api/dogs/invalid");
      expect(response.status).toBe(404);
    });

    it("should return error message", async () => {
      const response = await request(app).get("/api/dogs/invalid");
      expect(response.body.error).toBeDefined();
    });

    it("should have correct error message", async () => {
      const response = await request(app).get("/api/dogs/invalid");
      expect(response.body.error).toBe("Route not found");
    });
  });
});