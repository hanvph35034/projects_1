import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICounterState {
  quantity: number;
}

const initialState: ICounterState = {
  quantity: 0,
};

export const couterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.quantity += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.quantity -= action.payload;
    },
  },
});

export const { increment, decrement } = couterSlice.actions;
export const counterReducer = couterSlice.reducer;
