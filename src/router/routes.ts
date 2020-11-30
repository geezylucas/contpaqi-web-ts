import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import ListIcon from "@material-ui/icons/List";
import {
  HomeScreen,
  CreateDocumentScreen,
  DocumentsScreen,
  CreateProductScreen,
  CreateClientScreen,
  ClientsScreen,
  ProductsScreen,
} from "../screens";

export type RouteType = {
  path: string;
  sidebarName: string;
  component: React.FC;
  exact: boolean;
  icon: React.ElementType;
};

export const Routes: RouteType[] = [
  {
    path: "/",
    sidebarName: "Inicio",
    component: HomeScreen,
    icon: HomeIcon,
    exact: true,
  },
  {
    path: "/createdocument",
    sidebarName: "Crear Factura",
    component: CreateDocumentScreen,
    icon: CreateIcon,
    exact: false,
  },
  {
    path: "/documents",
    sidebarName: "Listado de facturas",
    component: DocumentsScreen,
    icon: ListIcon,
    exact: false,
  },
  {
    path: "/createproduct",
    sidebarName: "Crear producto",
    component: CreateProductScreen,
    icon: CreateIcon,
    exact: false,
  },
  {
    path: "/products",
    sidebarName: "Listado de productos",
    component: ProductsScreen,
    icon: ListIcon,
    exact: false,
  },
  {
    path: "/createclient",
    sidebarName: "Crear cliente",
    component: CreateClientScreen,
    icon: CreateIcon,
    exact: false,
  },
  {
    path: "/clients",
    sidebarName: "Listado de clientes",
    component: ClientsScreen,
    icon: ListIcon,
    exact: false,
  },
];
