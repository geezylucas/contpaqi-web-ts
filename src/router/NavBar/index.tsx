import React from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Routes, RouteType } from "../routes";
import { logout } from "../../store/userSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    closeMenuButton: {
      marginRight: "auto",
      marginLeft: 0,
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface IPropsOwn extends RouteComponentProps {}

type Props = IPropsOwn;

const NavBar: React.FC<Props> = (props: Props): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const { location } = props;

  const activeRoute = (routeName: string): boolean => {
    return location.pathname === routeName ? true : false;
  };

  const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen);

  const drawer = (
    <React.Fragment>
      <List>
        {Routes.map(
          (o: RouteType): JSX.Element => (
            <ListItem
              button
              key={o.path}
              component={Link}
              to={o.path}
              selected={activeRoute(o.path)}
            >
              <ListItemIcon>
                <o.icon />
              </ListItemIcon>
              <ListItemText primary={o.sidebarName} />
            </ListItem>
          )
        )}
      </List>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            PROSIS
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            <div className={classes.drawerContainer}>{drawer}</div>;
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>{drawer}</div>;
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
