"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CallChart = ({ call }) => {
  if (!call || call.length === 0) return null;

  const c = call[0];

  const data = [
    { name: "پاسخ", value: c.callrequests_answered },
    { name: "بسته شده", value: c.callrequests_closed },
    { name: "هدایت شده به کارشناس", value: c.callrequests_guided },
    { name: "هدایت شده توسط کارشناس", value: c.callrequests_guided_status },
    { name: "تعداد کل", value: c.total_replied_callrequets_count },
  ];

  // پیدا کردن بیشترین مقدار برای محور Y
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      style={{ marginTop: "100px" }}
    >
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
          tick={({ x, y, payload }) => {
            const words = payload.value.split(" ");
            return words.map((word, index) => (
              <text
                key={index}
                x={x}
                y={y + index * 14 - -10} // ← فاصله بالاتر
                textAnchor="middle"
                fontSize={12}
              >
                {word}
              </text>
            ));
          }}
        />
        <YAxis domain={[0, maxValue]} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d">
          <LabelList dataKey="value" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CallChart;
