import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Lead } from "../types/lead";

interface Props {
  leads: Lead[];
}

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#EAB308",
  "#EF4444",
];

const LeadsChart = ({
  leads,
}: Props) => {
  const data = [
    {
      name: "New",
      value: leads.filter(
        (lead) =>
          lead.status === "New"
      ).length,
    },
    {
      name: "Qualified",
      value: leads.filter(
        (lead) =>
          lead.status === "Qualified"
      ).length,
    },
    {
      name: "Contacted",
      value: leads.filter(
        (lead) =>
          lead.status === "Contacted"
      ).length,
    },
    {
      name: "Lost",
      value: leads.filter(
        (lead) =>
          lead.status === "Lost"
      ).length,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">

      <h2 className="text-xl font-bold mb-6">
        Leads Analytics
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default LeadsChart;