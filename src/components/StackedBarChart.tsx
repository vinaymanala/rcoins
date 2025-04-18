import { BarChart, XAxis, Tooltip, Bar } from "recharts";
import { StackedBarChartProps } from "../libs/types";
import Loader from "./Loader";

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  label,
  data,
  stackedBarChartNames,
  toolTipFormatter,
}) => {
  const isLoading = !data || data.length === 0;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <label className="mt-2 text-center text-lg font-medium">{label}</label>
      <BarChart
        width={300}
        height={250}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" name="MM" />
        <Tooltip
          formatter={toolTipFormatter as any}
          contentStyle={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-fg)",
            borderColor: "var(--color-border)",
          }}
        />
        {stackedBarChartNames.map((v: { [k: string]: string }) => (
          <Bar
            key={v.name}
            dataKey={v.key}
            name={v.name}
            stackId="a"
            fill={v.fill}
          />
        ))}
      </BarChart>
    </>
  );
};

export default StackedBarChart;
