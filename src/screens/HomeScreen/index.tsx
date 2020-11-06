import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import FeaturedPost from "./FeaturedPost";
import { PostType, FeaturedPostType } from "./types";

const mainFeaturedPost: PostType = {
  title: "Empresa sin nombre",
  description: "Eslógan de la empresa ",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
};

const featuredPosts: FeaturedPostType[] = [
  {
    title: "Nueva función",
    date: "Nov 12",
    description:
      "Con las plantillas puedes crear una factura automáticamente, desde Crear factura y activando la opción de Guardar como plantilla.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
  {
    title: "Consejo",
    date: "Nov 11",
    description:
      "Si requieres enviar una factura a tu cliente o proveedor, puedes hacerlo desde Listado de documentos.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
];

const HomeScreen: React.FC<{}> = (): React.ReactElement => {
  return (
    <Container>
      <Header post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map(
          (post: FeaturedPostType): JSX.Element => (
            <FeaturedPost key={post.title} post={post} />
          )
        )}
      </Grid>
    </Container>
  );
};

export default HomeScreen;
