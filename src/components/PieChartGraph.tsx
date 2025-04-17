import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChartGraphProps } from "../libs/types";
import Loader from "./Loader";

const PieChartGraph: React.FC<PieChartGraphProps> = ({
  label,
  data,
  toolTipFormatter,
  fillColors,
}) => {
  const isLoading = !data || data.length === 0;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <label className="mt-2 text-center text-lg font-medium">{label}</label>
      <label className="mt-0 text-center text-md font-light">Recommended</label>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          //   cx={200}
          //   cy={150}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map(
            (entry: { [k: string]: string | number }, index: number) => (
              <Cell
                key={`cell-${index}`}
                name={`${entry.percent}%`}
                fill={fillColors[index % fillColors.length]}
              />
            )
          )}
        </Pie>
        <Tooltip
          formatter={toolTipFormatter as any}
          contentStyle={{
            backgroundColor: "var(--color-bg)",
            borderColor: "var(--color-border)",
          }}
          itemStyle={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-fg)",
          }}
        />
      </PieChart>
    </>
  );
};

export default PieChartGraph;
