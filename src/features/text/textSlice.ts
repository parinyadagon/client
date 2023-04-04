import useFetch from "@/hooks/useFetch";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchText = createAsyncThunk(
  "text/fetchText",
  async (text: string) => {
    const api_endpoint: string =
      process.env.API_ENDPOINT || "http://localhost:3001";
    const response = await fetch(`${api_endpoint}/api/text?text=${text}`);
    const data = await response.json();

    return data as TextSlice;
  }
);

export interface TextSlice {
  text: string;
}

const TextState: TextSlice = {
  text: "",
};

export const textSlice = createSlice({
  name: "counter",
  initialState: TextState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchText.fulfilled,
        (state: TextSlice, action: PayloadAction<TextSlice>) => {
          state.text = action.payload.text;
        }
      )
      .addCase(fetchText.rejected, (state: TextSlice) => {
        state.text = "Error";
      })
      .addCase(fetchText.pending, (state: TextSlice) => {
        state.text = "Loading";
      });
  },
});

export const { setText } = textSlice.actions;
export const textSelector = (store: RootState) => store.textSlice.text;

export default textSlice.reducer;
