export type HeaderType = {
  date: string;
  folio: number;
  client: {
    code: string;
    businessName: string;
    rfc: string;
    currency: number;
    nomCurrency: string;
  };
  exchangeRate: number;
  concept: number;
  nomConcept: string;
};

export type MovementTableType = {
  uuid: string;
  code: string;
  name: string;
  amount: number;
  unit: number;
  price: number;
  tax: number;
  subtotal: number;
  total: number;
  prices: number[];
};

export type HeadCell = {
  disablePadding: boolean;
  id: keyof MovementTableType;
  label: string;
  numeric: boolean;
};

export type MovementTypeSend = {
  codAlmacen: number;
  codProducto: string;
  precio: number;
  unidades: number;
};

export type DataTypeSend = {
  cabecera: {
    numMoneda: number;
    serie: {
      m_MaxCapacity: number;
      Capacity: number;
      m_StringValue: string;
      m_currentThread: number;
    };
    tipoCambio: number;
    codConcepto: number;
    codigoCteProv: string;
    fecha: string;
  };
  movimientos: MovementTypeSend[];
  guardarPlantilla: boolean;
  timbrar: boolean;
};
