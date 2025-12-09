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

const TicketChart = ({ ticket }) => {
  if (!ticket || !Array.isArray(ticket) || ticket.length === 0) return null;

  const t = ticket[0] ?? {};

  const data = [
    { name: "پاسخ", value: Number(t.tickets_answered ?? 0) },
    { name: "بسته شده", value: Number(t.tickets_closed ?? 0) },
    { name: "هدایت شده به کارشناس", value: Number(t.tickets_guided ?? 0) },
    {
      name: "هدایت شده توسط کارشناس",
      value: Number(t.tickets_guided_status ?? 0),
    },
    { name: "تغییر وضعیت داده شده", value: Number(t.tickets_in_progress ?? 0) },
    { name: "تعداد کل", value: Number(t.total_replied_tickets_count ?? 0) },
  ];

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <>
      <h2 className="text-[#2B2B2B] font-bold text-center">تیکت ها</h2>

      <ResponsiveContainer width="100%" height={300}>
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
                  y={y + index * 14 - -10}
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
          <Bar dataKey="value" fill="#8884d8">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default TicketChart;
