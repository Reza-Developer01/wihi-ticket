"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RatingChart = ({ data }) => {
  const chartData = data.map((item, index) => ({
    index, // محور X از 0 شروع می‌شود
    id: item.id, // اگر خواستی داخل Tooltip نشان بدهد
    rating: Number(item.rating),
  }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis
            dataKey="index"
            label={{ value: "Index", position: "insideBottom", dy: 10 }}
          />

          <YAxis
            tickMargin={10}
            domain={[0, 5]}
            tickCount={11} // نیم‌نمره‌ها
          />

          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="rating"
            name="امتیاز"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
