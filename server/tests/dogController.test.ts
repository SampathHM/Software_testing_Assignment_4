import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

function createMockResponse() {
  const res: any = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res;
}

describe("DogController - Positive Test", () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return success true and mocked JSON from service", async () => {

    const mockServiceData = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    // Stub dogService return value
    vi.spyOn(dogService, "getRandomDogImage")
      .mockResolvedValue(mockServiceData as any);

    const req: any = {};
    const res = createMockResponse();

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceData
    });

  });

});