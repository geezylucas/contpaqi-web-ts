import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ClientsTable from "./ClientsTable";

const ClientsScreen: React.FC<{}> = (): React.ReactElement => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Clientes
      </Typography>
      <Grid container spacing={3}>
        {/* List clients */}
        <Grid item xs={12}>
          <ClientsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientsScreen;
