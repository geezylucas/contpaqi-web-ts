import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AppDispatch, AppThunk } from "..";
import { MovementType, HeadType, ExtraAPIType, ExtraType } from "./types";

export interface IDocumentState {
  head: HeadType;
  movements: MovementType[];
  extra: ExtraType;
  extraAPI: ExtraAPIType;
}

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
    currencies: [
      {
        value: 1,
        label: "Peso Mexicano",
      },
      {
        value: 2,
        label: "Dólar Americano",
      },
    ],
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
    addHead: (state, action: PayloadAction<HeadType>) => {
      state.head = action.payload;
    },
    addMovements: (state, action: PayloadAction<MovementType[]>) => {
      state.movements = action.payload;
    },
    updateExtraAPI: (state, action: PayloadAction<ExtraAPIType>) => {
      state.extraAPI = action.payload;
    },
  },
});

export const { addHead, addMovements } = documentSlice.actions;

export const fetchFillView = (): AppThunk => async (dispatch: AppDispatch) => {
  const response: AxiosResponse<ExtraAPIType> = await axios.get<ExtraAPIType>(
    "http://localhost:5007/api/Documento/FillView"
  );

  dispatch(documentSlice.actions.updateExtraAPI(response.data));
};

export default documentSlice.reducer;
