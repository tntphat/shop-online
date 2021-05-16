import React from "react";
import { connect } from "react-redux";

import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

import { selectProductSpecified } from "../../redux/product/product.selector";
import SlateRender from "../../components/controls/SlateRender";


const useStyles = makeStyles((theme) => ({
  title: {
    bold: true,
    marginTop: 20,
    marginBottom: 20
  },
  price: {
    color: '#ffb26b',
    marginTop: 20,
    marginBottom: 20
  }
}))

const theme = createMuiTheme({
  
})

const ProductDetail = (props) => {
  const { selectProductSpecified } = props;
  const classes = useStyles();
  console.log("test product: ", selectProductSpecified);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <Grid container justify="space-around">
          <Grid item xs={5}>
            <Typography variant="h2" class={classes.title}>{selectProductSpecified.name}</Typography>
            <CardMedia
              style={{ height: 0, paddingTop: '56%' }}
              image={selectProductSpecified.imgs}
              title="img"
            />
          </Grid>
          <Grid item xs={5} style={{padding: 20}}>
            <SlateRender content={selectProductSpecified.description}/>
            <Typography variant="h4" class={classes.price}>{selectProductSpecified.price} VND</Typography>
            <Button style={{margin: 20}} variant="contained" color="secondary">chọn mua</Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProp = (state, ownProps) => ({
  selectProductSpecified: selectProductSpecified(
    ownProps.match.params.productId
  )(state),
});

export default connect(mapStateToProp)(ProductDetail);

// export default ProductDetail;
