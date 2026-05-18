interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  source: string;
  setSource: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

const FilterBar = ({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
  sort,
  setSort,
}: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 md:p-5 mb-6">

      <div className="flex flex-col lg:flex-row gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full lg:flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">

          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>

          {/* Source */}
          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              All Sources
            </option>

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

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>
          </select>

        </div>

      </div>
    </div>
  );
};

export default FilterBar;