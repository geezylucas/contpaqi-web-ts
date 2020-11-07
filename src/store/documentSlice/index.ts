import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { MovementType, HeadType, ExtraAPIType, ExtraType } from "./types";

export interface IDocumentState {
  head: HeadType;
  movements: MovementType[];
  extra: ExtraType;
  extraAPI: ExtraAPIType;
}

export const fetchFillView = createAsyncThunk<ExtraAPIType>(
  "document/fetchPropsDoc",
  async (_args, thunkAPI) => {
    try {
      const response: AxiosResponse<ExtraAPIType> = await axios.get<
        ExtraAPIType
      >("http://localhost:5007/api/Documento/FillView");

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const initialState: IDocumentState = {
  head: {
    numMoneda: 0,
    tipoCambio: 0,
    codConcepto: "",
    codigoCteProv: "",
    fecha: "",
  },
  movements: [],
  extra: {
    currencies: [],
  },
  extraAPI: {
    productosYServicios: [],
    clientesYProveedores: [],
    conceptos: [],
  },
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    addCabecera: (state, action: PayloadAction<HeadType>) => {
      state.head = action.payload;
    },
    addMovements: (state, action: PayloadAction<MovementType[]>) => {
      state.movements = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchFillView.fulfilled,
      (state, action: PayloadAction<ExtraAPIType>) => {
        state.extraAPI = action.payload;
      }
    );
  },
});

export const { addCabecera, addMovements } = documentSlice.actions;

export default documentSlice.reducer;
