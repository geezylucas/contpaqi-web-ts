import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AppDispatch, AppThunk } from "..";
import { MovementType, HeadType, ExtraType, ConceptType } from "./types";

export interface IDocumentState {
  head: HeadType;
  movements: MovementType[];
  extra: ExtraType;
  conceptos: ConceptType[];
}

export const initialState: IDocumentState = {
  head: {
    numMoneda: 0,
    tipoCambio: 0,
    codConcepto: 0,
    codigoCteProv: "",
    fecha: "",
    nomMoneda: "",
    nomConcepto: "",
    nomCteProv: "",
    folio: 0,
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
  conceptos: [],
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
    updateConceptos: (state, action: PayloadAction<ConceptType[]>) => {
      state.conceptos = action.payload;
    },
  },
});

export const { addHead, addMovements } = documentSlice.actions;

export const fetchConceptos = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: AxiosResponse<ConceptType[]> = await axios.get<
      ConceptType[]
    >("http://localhost:5007/api/Concepto/GetConcepto");

    dispatch(documentSlice.actions.updateConceptos(response.data));
  } catch (error) {
    console.log(error);
  }
};

export default documentSlice.reducer;
