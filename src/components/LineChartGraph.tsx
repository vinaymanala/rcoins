import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Area,
  AreaChart,
  Brush,
} from "recharts";

const LineChartGraph = ({ data, toolTipFormatter }: any) => {
  return (
    <div id="lineChartGraph">
      <p>{`${data.labels[0]} (m)`}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data.priceChartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            formatter={toolTipFormatter}
            contentStyle={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--color-border)",
            }}
          />
          <Line
            type="monotone"
            dataKey="dp"
            stroke="#82ca9d"
            fill="#82ca9d"
            name={`value `}
          />
        </LineChart>
      </ResponsiveContainer>
      <p>{`${data.labels[1]} (m)`}</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data.marketCapsData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            formatter={toolTipFormatter}
            contentStyle={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--color-border)",
            }}
          />
          <Line
            type="monotone"
            dataKey="dp"
            stroke="#82ca9d"
            fill="#82ca9d"
            name={`value`}
          />
          <Brush />
        </LineChart>
      </ResponsiveContainer>
      <p>{`${data.labels[2]} (m)`}</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data.totalVolumesData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            formatter={toolTipFormatter}
            contentStyle={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--color-border)",
            }}
          />
          <Area
            type="monotone"
            dataKey="dp"
            stroke="#82ca9d"
            fill="#82ca9d"
            name={`value`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartGraph;
