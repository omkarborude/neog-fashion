import axios from "axios";
import getApiProduct from "./api-calls";

jest.mock("axios");

describe("get products response", () => {
  test("should return response status when APP call is successful", async () => {
    axios.get.mockResolvedValue({ data: { status: 200 } });
    const products = await getApiProduct();

    expect(products).toEqual({ status: 200 });
  });
});
