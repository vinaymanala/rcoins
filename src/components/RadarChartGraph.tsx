import {
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  RadarChart,
} from "recharts";
import { RadarChartGraphProps } from "../libs/types";

const RadarChartGraph = ({
  label,
  data,
  toolTipFormatter,
}: RadarChartGraphProps) => {
  return (
    <>
      <label className="mt-2 text-center text-lg font-medium">{label}</label>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          {/* <PolarRadiusAxis /> */}
          <Radar
            name="Volume"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.8}
          />
          <Tooltip formatter={toolTipFormatter as any} />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RadarChartGraph;
