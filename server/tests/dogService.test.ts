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

        it("should throw an error when fetch fails (ok=false, status 500)", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: async () => ({}),
        });

        vi.stubGlobal("fetch", fetchMock as any);

        await expect(getRandomDogImage()).rejects.toThrow(
            "Failed to fetch dog image: Dog API returned status 500"
        );
    });

});