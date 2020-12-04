import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProductsTable from "./ProductsTable";

const ProductsScreen: React.FC<{}> = (): React.ReactElement => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Productos, paquetes y servicios
      </Typography>
      <Grid container spacing={3}>
        {/* List products */}
        <Grid item xs>
          <ProductsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsScreen;
