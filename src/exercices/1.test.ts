import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getCount, groupMeasurements } from "./1.ts";

const { test } = Deno;

test("getCount", () => {
  // Given
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  // When
  const res = getCount(input);
  // Then
  assertEquals(res, 7);
});

test("groupMeasurements", () => {
  // Given
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  const expected = [607, 618, 618, 617, 647, 716, 769, 792];
  // When
  const res = getCount(input);
  // Then
  assertEquals(res, 7);
});
