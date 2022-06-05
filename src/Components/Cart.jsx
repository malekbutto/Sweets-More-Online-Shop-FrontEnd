import Footer from "./Footer";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import {Container, Wrapper, Title, TopText, Bottom, Info,
        Product, ProductDetail, Image, Details, PriceDetails,
        ProductAmountContainer, ProductAmount, ProductPrice,
        Hr, Summary, SummaryTitle, SummaryItem, SummaryItemText,
        SummaryItemPrice, Button } from '../Styled_Components/Cart_Styled';

const Cart = ({ user, setUser, cart, setCart, handleChange, setCartList }) => {

    const [price, setPrice] = useState(0);
    const [hover, sethover] = useState(false);
    let total = 0;
    const navigate = useNavigate();
    // const classes = useStyles();

    const useStyles = makeStyles(theme => ({
        iconHover: {
            '&:hover': {
                border: '1px solid green',
                //TODO display the text CREATE ITEM instead of AddIcon
            }
        },
        floatBtn: {
            marginRight: theme.spacing(1),
        },
    }));

    const handleRemove = (id) => {
        const arr = cart.filter((item) => item.Item.id !== id);
        setCart(arr);
        handlePrice();
    };

    const handlePrice = () => {
        cart.map((item) => (total += item.amount * item.price));
        setPrice(total);
    };

    useEffect(() => {
        handlePrice();
    });

    const placeOrder = () => {
        if (cart.length === 0)
            toast.error("Cart is empty", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        else
            navigate("/PlaceOrder", setCart = { setCart }, setCartList = { setCartList });
    }

    return (
        <Container>
            <Wrapper>
                <Title>Your Basket</Title>
                <Bottom>
                    <Info>
                        <Product>
                            <TopText>{cart?.length === 0 && <div>Cart Is Empty</div>}</TopText>
                            {cart?.map((item) => (
                                <div key={item.id}>
                                    <Details>
                                        <ProductDetail>
                                            <Image src={item.img.includes('fakepath') ? './Images/Category/No_Image.jpeg' : item.img} alt={item.title} width="250px" length="250px"></Image>
                                            <b>{item.title}</b>
                                        </ProductDetail>
                                        <PriceDetails>
                                            <ProductPrice>
                                                <b>Price: </b>{item.price}
                                            </ProductPrice>
                                            <ProductAmountContainer>
                                                <Button onClick={() => handleChange(item, 1)}>
                                                    <Add />
                                                </Button>
                                                <ProductAmount>{item.amount}</ProductAmount>
                                                <Button onClick={() => handleChange(item, -1)}>
                                                    <Remove />
                                                </Button>
                                            </ProductAmountContainer>
                                            <Fab onMouseOver={() => sethover(true)}
                                                onMouseOut={() => sethover(false)}
                                                size="small" color="secondary" aria-label="Remove"
                                                cursor="pointer" onClick={() => handleRemove(item.id)}>
                                                <DeleteIcon />
                                            </Fab>
                                        </PriceDetails>
                                    </Details>
                                    <Hr />
                                </div>
                            ))
                            }
                        </Product>
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>{price} nis</SummaryItemPrice>
                        </SummaryItem>
                        <Button onClick={placeOrder}>Place Order</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer user={user} setUser={setUser} cart={cart} setCart={setCart} handleChange={handleChange} />
        </Container >
    )
}

export default Cart;