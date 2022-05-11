import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          width="100%"
          series={[
            {
              name: "high",
              data: ohlcvData?.map((price) => price.high) ?? [],
            },
            {
              name: "low",
              data: ohlcvData?.map((price) => price.low) ?? [],
            },
            {
              name: "open",
              data: ohlcvData?.map((price) => price.open) ?? [],
            },
            {
              name: "close",
              data: ohlcvData?.map((price) => price.close) ?? [],
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
            grid: { show: true },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
