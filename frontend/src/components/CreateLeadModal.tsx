import { useState } from "react";

import toast from "react-hot-toast";

import api from "../services/api";

interface Props {
  onClose: () => void;
  onLeadCreated: () => void;
}

const CreateLeadModal = ({
  onClose,
  onLeadCreated,
}: Props) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [status, setStatus] =
    useState("New");

  const [source, setSource] =
    useState("Website");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !email) {
      return toast.error(
        "All fields are required"
      );
    }

    try {
      setLoading(true);

      await api.post("/leads", {
        name,
        email,
        status,
        source,
      });

      toast.success(
        "Lead created successfully"
      );

      onLeadCreated();

      onClose();
    } catch (error) {
      toast.error("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Create Lead
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Lead Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Lead Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Creating..."
              : "Create Lead"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateLeadModal;