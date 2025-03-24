import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChartGraphProps } from "../libs/types";

const PieChartGraph = ({
  label,
  data,
  toolTipFormatter,
  fillColors,
}: PieChartGraphProps) => {
  return (
    <>
      <label className="mt-2 text-center text-lg font-medium">
        Portfolio Allocation
      </label>
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
        <Tooltip formatter={toolTipFormatter as any} />
      </PieChart>
    </>
  );
};

export default PieChartGraph;
