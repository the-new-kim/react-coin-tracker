import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Loader = styled.div`
  text-align: center;
`;

interface IOhlcv {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { coinId } = useParams();
  const { isLoading, data: ohlcvData } = useQuery<IOhlcv[]>(
    ["ohlcv", coinId!],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 1000 * 60,
    }
  );

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          width="100%"
          series={[
            {
              data:
                ohlcvData?.map((item) => {
                  const x = new Date(item.time_close);
                  const y = [
                    item.open.toFixed(2),
                    item.high.toFixed(2),
                    item.low.toFixed(2),
                    item.close.toFixed(2),
                  ];
                  return { x, y };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: "100%",
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              type: "datetime",
            },
            // grid: { show: true },
            // stroke: {
            //   curve: "smooth",
            //   width: 4,
            // },
            yaxis: {
              show: true,
            },
            // xaxis: {
            //   axisBorder: { show: false },
            //   axisTicks: { show: false },
            //   labels: { show: false },
            //   categories: ohlcvData?.map((time) => {
            //     const date = new Date(time.time_close);
            //     return `${date.getFullYear()}/${
            //       date.getMonth() + 1
            //     }/${date.getDate()}`;
            //   }),
            // },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
