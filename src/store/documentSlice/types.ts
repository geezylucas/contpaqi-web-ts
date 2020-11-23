export type ProductServiceType = {
  codigo: string;
  nombre: string;
  precios: number[] | null;
};

export type ClientProviderType = {
  codigo: string;
  razonSocial: string;
  rfc: string;
  moneda: number;
};

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
  codConcepto: string;
  codigoCteProv: string;
  fecha: string;
};

export type MovementType = {
  codAlmacen: string;
  codProducto: string;
  precio: number;
  unidades: number;
};

export type ExtraType = {
  currencies: ValueLabelType[];
};

export type ExtraAPIType = {
  productosYServicios: ProductServiceType[];
  clientesYProveedores: ClientProviderType[];
  conceptos: ConceptType[];
};
