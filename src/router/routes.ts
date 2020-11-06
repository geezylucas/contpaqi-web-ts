import HomeIcon from "@material-ui/icons/Home";
import { HomeScreen } from "../screens";
import React from "react";

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
];
