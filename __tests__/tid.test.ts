import { generateTId, padNumericId, generateNumericId } from "@/lib/utils/tid";
import { NUMERIC_LENGTH, MINIMUM_NUM, MAXIMUM_NUM } from "@/lib/constants/tid";

describe("T.id Generation", () => {
  describe("padNumericId", () => {
    it("pads a number to the correct length", () => {
      expect(padNumericId(1)).toBe("00001");
      expect(padNumericId(123)).toBe("00123");
      expect(padNumericId(99999)).toBe("99999");
    });

    it("returns correct length string", () => {
      const result = padNumericId(42);
      expect(result.length).toBe(NUMERIC_LENGTH);
    });
  });

  describe("generateNumericId", () => {
    it("generates a number within valid range", () => {
      const id = generateNumericId();
      expect(id).toBeGreaterThanOrEqual(MINIMUM_NUM);
      expect(id).toBeLessThanOrEqual(MAXIMUM_NUM);
    });

    it("generates an integer", () => {
      const id = generateNumericId();
      expect(Number.isInteger(id)).toBe(true);
    });
  });

  describe("generateTId", () => {
    it("generates correct ATH prefix format", () => {
      const tid = generateTId("ATH");
      expect(tid).toMatch(/^ATH-\d{5}$/);
    });

    it("generates correct SCT prefix format", () => {
      const tid = generateTId("SCT");
      expect(tid).toMatch(/^SCT-\d{5}$/);
    });

    it("contains the separator", () => {
      const tid = generateTId("ATH");
      expect(tid).toContain("-");
    });
  });
});
