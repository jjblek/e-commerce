import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';
import { useSnackbar } from 'notistack';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const handleClick = () => {
        enqueueSnackbar(item.name + ' removed from cart', {
            variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },    
        });
    };

    
    return (
        
        // Card Component - node_modules/material-ui/core
        <Card className={classes.root} raised={true}>
            {/* Media Component: image - node_modules/material-ui/core */}
            
            <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
           
            {/* Content Component: name, price - node_modules/material-ui/core */}
            <CardContent className={classes.cardContent}>
                <Typography variant="subtitle1" noWrap={true}>{item.name}</Typography>
                <Typography variant="h6">
                    {item.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>
            
            {/* Actions Component: quantity/remove button - node_modules/material-ui/core */}
            <CardActions className={classes.cardActions}>

                <div className={classes.buttons}>
                    {/* subtract quantity button */}
                    <Button type="button" size="small" 
                        onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>
                            -
                    </Button>

                    {/* display quantity */}
                    <Typography style={{margin: '10px'}}>{item.quantity}</Typography>
                    
                    {/* add quantity button */}
                    <Button type="button" size="medium" 
                        onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>
                            +
                    </Button>
                </div>
                
                {/* remove item button */}
                <Button variant="contained" type="button" 
                    color="secondary" size="medium" 
                    style={{ marginLeft: "auto", marginRight:'20px' }}
                    onClick={() => {handleClick(); onRemoveFromCart(item.id)}}>
                        Remove
                </Button>
            </CardActions>
        </Card>
    )
}

export default CartItem