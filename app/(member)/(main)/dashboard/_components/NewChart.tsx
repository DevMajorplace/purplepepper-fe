import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function NewChart({
  options,
  series,
  type,
  height,
  width,
}: NewChartProps) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const chart = useMemo(
    () => (
      <Chart
        height={height}
        options={options}
        series={series}
        type={type}
        width={width}
      />
    ),
    // eslint-disable-next-line prettier/prettier
    []
  );

  return <>{chart}</>;
}
