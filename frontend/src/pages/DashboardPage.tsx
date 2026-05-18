import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import LeadsTable from "../components/LeadsTable";

import type { Lead } from "../types/lead";

import FilterBar from "../components/FilterBar";

import { debounce } from "lodash";

import Pagination from "../components/Pagination";

import CreateLeadModal from "../components/CreateLeadModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import toast from "react-hot-toast";

import { CSVLink } from "react-csv";
import LeadsChart from "../components/LeadsChart";
import EditLeadModal from "../components/EditLeadModal";

const DashboardPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);
    const [totalLeads, setTotalLeads] =
  useState(0);

  const [showModal, setShowModal] =
    useState(false);
const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editLead, setEditLead] =
    useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await api.get(
        `/leads?search=${search}&status=${status}&source=${source}&sort=${sort}&page=${currentPage}`
      );

      setLeads(response.data.leads);

      setTotalPages(
        response.data.totalPages
      );
      setTotalLeads(
  response.data.totalLeads
);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  document.title =
    "Smart Leads Dashboard";
}, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, source, sort]);

  useEffect(() => {
    const debouncedFetch =
      debounce(() => {
        fetchLeads();
      }, 500);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [
    search,
    status,
    source,
    sort,
    currentPage,
  ]);

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this lead?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(`/leads/${id}`);

      toast.success("Lead deleted");

      fetchLeads();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const csvData = leads.map((lead) => ({
    Name: lead.name,
    Email: lead.email,
    Status: lead.status,
    Source: lead.source,
    CreatedAt: new Date(
      lead.createdAt
    ).toLocaleString(),
  }));

  return (
    <DashboardLayout>
      <div className="mb-8">

  <h1 className="text-3xl font-bold">
    Welcome Back 👋
  </h1>

  <p className="text-gray-500 dark:text-gray-300 mt-2">
    Manage and track your leads efficiently.
  </p>

</div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 md:p-6">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">
            Total Leads
          </h3>

          <p className="text-2xl md:text-3xl font-bold mt-2">
            {totalLeads}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 md:p-6">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">
            Qualified Leads
          </h3>

          <p className="text-2xl md:text-3xl font-bold mt-2">
            {
              leads.filter(
                (lead) =>
                  lead.status ===
                  "Qualified"
              ).length
            }
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 md:p-6">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">
            Lost Leads
          </h3>

          <p className="text-2xl md:text-3xl font-bold mt-2">
            {
              leads.filter(
                (lead) =>
                  lead.status === "Lost"
              ).length
            }
          </p>
        </div>

      </div>
<LeadsChart leads={leads} />
      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
        sort={sort}
        setSort={setSort}
      />

      {/* Leads Section */}
      <div>
<p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
  Last updated:
  {" "}
  {new Date().toLocaleTimeString()}
</p>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

          <h2 className="text-2xl font-bold">
            Leads
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">

            <CSVLink
              data={csvData}
              filename="leads.csv"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition text-center"
            >
              Export CSV
            </CSVLink>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition"
            >
              + Add Lead
            </button>

          </div>

        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center">
            <LoadingSkeleton />
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center text-gray-500 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center">

  <h3 className="text-xl font-semibold mb-2">
    No Leads Found
  </h3>

  <p className="text-gray-500 dark:text-gray-300">
    Try adjusting filters or create a new lead.
  </p>

</div>
          </div>
        ) : (
          <LeadsTable
  leads={leads}
  onEdit={setEditLead}
  onDelete={handleDelete}
/>
        )}

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              setCurrentPage
            }
          />
        </div>

      </div>

      {showModal && (
        <CreateLeadModal
          onClose={() =>
            setShowModal(false)
          }
          onLeadCreated={fetchLeads}
        />
      )}

      {editLead && (
        <EditLeadModal
          lead={editLead}
          onClose={() =>
            setEditLead(null)
          }
          onUpdated={fetchLeads}
        />
      )}

     {selectedLead && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Lead Details
      </h2>

      <div className="space-y-2 text-sm">
        <p><b>Name:</b> {selectedLead.name}</p>
        <p><b>Email:</b> {selectedLead.email}</p>
        <p><b>Status:</b> {selectedLead.status}</p>
        <p><b>Source:</b> {selectedLead.source}</p>
      </div>

      <button
        onClick={() => setSelectedLead(null)}
        className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Close
      </button>

    </div>

  </div>
)}

    </DashboardLayout>
  );
};

export default DashboardPage;