export type ConceptType = {
  codigoConcepto: number;
  nombreConcepto: string;
  noFolio: number;
};

export type ValueLabelType = {
  value: number;
  label: string;
};

export type HeadType = {
  numMoneda: number;
  tipoCambio: number;
  codConcepto: number;
  codigoCteProv: string;
  fecha: string;
  nomMoneda: string;
  nomConcepto: string;
  nomCteProv: string;
  folio: number;
};

export type MovementType = {
  codAlmacen: number;
  codProducto: string;
  precio: number;
  cantidad: number;
  nomProducto: string;
  total: number;
};

export type ExtraType = {
  currencies: ValueLabelType[];
};

export type ExtraAPIType = {
  conceptos: ConceptType[];
};
