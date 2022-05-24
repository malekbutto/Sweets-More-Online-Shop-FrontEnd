import { ShoppingCartOutlined, FavoriteBorderOutlined } from "@material-ui/icons";
import styled from "styled-components";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.0);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;
const Title = styled.h1`
    font-size: 24px;
    text-align: center;
`;
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 350px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #${(props) => props.bg};  
    position: relative;
    &:hover ${Info} {
        opacity: 1;
    }
`;
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;
const Image = styled.img`
    border-radius: 50px;
    height: 28vh;
    width: 100%;
    z-index: 2;
`;
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.2);
    }
`;

const Sweets = ({ item }) => {
    return (
        <Container bg={item.bg}>
            <Circle>
                <Image src={item.img} alt='ProduntImage' />
                <Info>
                    <Icon>
                        <ShoppingCartOutlined />
                    </Icon>
                    {/* <Icon>
                        <SearchOutlined />
                    </Icon> */}
                    {/* <Icon>
                        <FavoriteBorderOutlined />
                    </Icon> */}
                </Info>
                <Title>
                    {item.title}
                </Title>
            </Circle>
        </Container>
    )
}

export default Sweets;