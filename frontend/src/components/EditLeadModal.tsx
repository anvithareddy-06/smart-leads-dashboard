import { useState } from "react";

import toast from "react-hot-toast";

import api from "../services/api";

import type{ Lead } from "../types/lead";

interface Props {
  lead: Lead;

  onClose: () => void;

  onUpdated: () => void;
}

const EditLeadModal = ({
  lead,
  onClose,
  onUpdated,
}: Props) => {
  const [name, setName] =
    useState(lead.name);

  const [email, setEmail] =
    useState(lead.email);

  const [status, setStatus] =
    useState(lead.status);

  const [source, setSource] =
    useState(lead.source);

  const [loading, setLoading] =
    useState(false);

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(
        `/leads/${lead._id}`,
        {
          name,
          email,
          status,
          source,
        }
      );

      toast.success(
        "Lead updated successfully"
      );

      onUpdated();

      onClose();
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Edit Lead
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="New">New</option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">Lost</option>
          </select>

          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="Website">
              Website
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Referral">
              Referral
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Updating..."
              : "Update Lead"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditLeadModal;