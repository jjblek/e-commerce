import React from 'react'

import { 
    Box,
    Card, 
    CardMedia, 
    CardContent, 
    CardActions,   
    CardActionArea,
    IconButton,
    Typography,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import useStyles from './styles';
import { Backdrop } from '@mui/material';
// Product Component - representing a single product
const Product = ({ product, onAddToCart }) => {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };
    const handleToggle = () => {
        setOpen(true)
    };
    const { enqueueSnackbar } = useSnackbar();
    const handleClick = () => {
        enqueueSnackbar(product.name + ' added to cart', {
            variant:'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
        });
    };
  
    return (
        /* Card Component - from material-ui/core - card with product info */
        <Card className={classes.root} raised={true} elevation={0}>
        
            {/* Media Component - from material-ui/core - image */}
            <CardActionArea onClick={handleToggle}>
            
            <CardMedia  component="img" className={classes.media} image={product.image.url} title={product.name} />
            </CardActionArea>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <Card className={classes.popup}>
                    <CardMedia className={classes.popupMedia} component="img" image={product.image.url} title={product.name} />
                    {/* Product Name */} 
                    <div className={classes.cardContent}>
                    {/* Product Name */} 
                    <Typography variant="h5" gutterBottom noWrap={true} className={classes.popupText}>
                        {product.name}
                    </Typography>
                    {/* Product Price */}
                    <Typography variant="h4" className={classes.popupText}>
                        {product.price.formatted_with_symbol}
                    </Typography>
                    
                    </div>
                    
                    
                    <Typography variant="subtitle1" className={classes.popupText}>Description:</Typography>
                    <div className={classes.cardContent}>
                    
                    <Typography dangerouslySetInnerHTML={{ __html: product.description}} 
                        variant="caption" color="textSecondary" className={classes.popupText}/>
                    
                    {product.inventory.managed === false ? 
                        <Typography variant="caption" className={classes.popupStock}>
                            Infinite Stock 
                        </Typography> : 
                        <Typography variant="caption" className={classes.popupStock}>
                            Limited Stock: {product.inventory.available}
                        </Typography>
                    }
                    </div>
                    <CardActions disableSpacing className={classes.cardActions}>
                    {/* Button Icon - from material-ui/core */}
                    <IconButton className={classes.button} title={'Add to Cart'} aria-label="Add to Cart" onClick={() => {handleClick(); onAddToCart(product.id, 1);}}>
                        {/* Add to Shopping Cart Icon - from material-ui/icons */}
                        <AddShoppingCart color="secondary"/>
                    </IconButton>
                    </CardActions>
                </Card>
            </Backdrop>
            
            {/* Content Component - from material-ui/core - name, price, description */}
            <CardContent >
                <div className={classes.cardContent}>
                    {/* Product Name */} 
                    <Typography variant="subtitle1" gutterBottom noWrap={true} >
                        {product.name}
                    </Typography>
                    {/* Product Price */}
                    <Typography variant="h6">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                {/* Product Description - render HTML dangerously*/}
                <Box component="div" className={classes.box}>
                <Typography dangerouslySetInnerHTML={{ __html: product.description}} 
                variant="caption" color="textSecondary"/>
                </Box>
                {/*<Rating name="read-only" value={product.rating} readOnly />*/}

            </CardContent>

            {/* Card Actions Component - from material-ui/core - Add to cart icon button */}
            <CardActions disableSpacing className={classes.cardActions}>
                {/* Button Icon - from material-ui/core */}
                <IconButton className={classes.button} title={'Add to Cart'} aria-label="Add to Cart" onClick={() => {handleClick(); onAddToCart(product.id, 1);}}>
                    {/* Add to Shopping Cart Icon - from material-ui/icons */}
                    <AddShoppingCart color="secondary"/>
                </IconButton>

            </CardActions>

        </Card>
    )
}

export default Product