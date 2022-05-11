import { useQuery } from "react-query";
import { Link, NavLink, Outlet, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

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
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.h1`
  padding: 30px;
  white-space: nowrap;
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
`;

const OverviewItem = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > *:first-child {
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  padding: 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
`;

const Tab = styled.div`
  background-color: ${(props) => props.theme.btnColor};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
  }
  &.active {
    a {
      color: ${(props) => props.theme.activeColor};
    }
  }
`;

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: object;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId!],
    () => fetchCoinInfo(coinId)
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId!],
    () => fetchCoinTickers(coinId)
  );
  const loading = infoLoading || tickersLoading;

  console.log(priceMatch);

  return (
    <Container>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Header>
            <Link to="/">
              <h2>&#60;</h2>
            </Link>
            <Title>{infoData?.name}</Title>
          </Header>
          <Overview>
            <OverviewItem>
              <h5>Rank:</h5>
              <div>{infoData?.rank}</div>
            </OverviewItem>
            <OverviewItem>
              <h5>Symbol:</h5>
              <div>${infoData?.symbol}</div>
            </OverviewItem>
            <OverviewItem>
              <h5>Price:</h5>
              <div>${tickersData?.quotes.USD.price.toFixed(2)}</div>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <h5>Total supply:</h5>
              <div>{tickersData?.total_supply}</div>
            </OverviewItem>
            <OverviewItem>
              <h5>Max Supply:</h5>
              <div>{tickersData?.max_supply}</div>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab className={chartMatch !== null ? "active" : ""}>
              <Link to="chart">
                <h5>Chart</h5>
              </Link>
            </Tab>
            <Tab className={priceMatch !== null ? "active" : ""}>
              <Link to="price">
                <h5>Price</h5>
              </Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  );
}

export default Coin;
