import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;
const Header = styled.header``;
const Title = styled.h1`
  font-size: 3em;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  margin-bottom: 10px;
  a {
    color: inherit;
    display: block;
    padding: 20px;
    transition: color 300ms ease-out;

    &:hover {
      color: tomato;
    }
  }
`;

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coins!</Title>
      </Header>
      <CoinsList>
        <Coin>
          <Link to="/sdf">coin</Link>
        </Coin>
        <Coin>
          <Link to="/sdf">coin</Link>
        </Coin>
        <Coin>
          <Link to="/sdf">coin</Link>
        </Coin>
      </CoinsList>
    </Container>
  );
}

export default Coins;
