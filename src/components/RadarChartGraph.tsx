import {
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  RadarChart,
} from "recharts";
import { RadarChartGraphProps } from "../libs/types";
import Loader from "./Loader";

const RadarChartGraph: React.FC<RadarChartGraphProps> = ({
  label,
  data,
  toolTipFormatter,
}) => {
  const isLoading = !data || data.length === 0;
  if (isLoading) {
    return <Loader />;
  }
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
            stroke="var(--color-fg)"
            fill="#65CFBD"
            fillOpacity={0.8}
          />
          <Tooltip
            formatter={toolTipFormatter as any}
            contentStyle={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--color-border)",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RadarChartGraph;
