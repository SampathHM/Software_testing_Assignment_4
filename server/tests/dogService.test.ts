import { describe, it, expect, vi, afterEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("DogService - Positive Test", () => {

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return dog image data when fetch succeeds", async () => {
    const mockApiResponse = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockApiResponse,
    });

    vi.stubGlobal("fetch", fetchMock as any);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe("success");
    expect(fetchMock).toHaveBeenCalledOnce();
  });

});