import { Pencil, Trash2 } from "lucide-react";
import type { Lead } from "../types/lead";

interface Props {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

const LeadsTable = ({
  leads,
  onEdit,
  onDelete,
  onView,
}: Props) => {
  const role = localStorage.getItem("role");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* HEADER */}
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>

              <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                Name
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                Email
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                Status
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                Source
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                Created
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold">
                Actions
              </th>

            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {leads.map((lead) => (
              <tr
                key={lead._id}
               onClick={() => alert("clicked")}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
              >

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  {lead.name}
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  {lead.email}
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        lead.status === "Qualified"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "Lost"
                          ? "bg-red-100 text-red-700"
                          : lead.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  {lead.source}
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">

                  <div className="flex items-center gap-4">

                    {/* EDIT */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(lead);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    {role === "admin" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(lead._id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LeadsTable;