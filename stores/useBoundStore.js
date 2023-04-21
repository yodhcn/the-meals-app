import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createMealSlice } from "./mealSlice";

export const useBoundStore = create(
  immer((...a) => ({
    ...createMealSlice(...a),
  }))
);
