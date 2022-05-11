import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  width: 90vw;
  max-width: 500px;
  margin: 0 auto;
  > * {
    margin-bottom: 20px;
  }
  > *:first-child {
    margin-top: 20px;
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  padding: 30px;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
  margin-bottom: 10px;

  a {
    color: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    transition: color 300ms ease-out;
    &:hover {
      color: ${(props) => props.theme.hoverColor};
    }

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    span {
      flex-grow: 2;
      display: block;
      text-align: end;
    }
  }
`;

const Loader = styled.div`
  text-align: center;
`;

interface ICoin {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Cryptos</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 10).map((coin) => (
            <Coin key={coin.id}>
              <Link to={coin.id} state={{ name: coin.name }}>
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                  alt={coin.name}
                />
                <h4>{coin.name}</h4>
                <span>&rarr;</span>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
