

const FilterSidebar = ({ search, setSearch, sort, setSort, filter, setFilter }) => (
  <aside className="w-full lg:w-64 shrink-0 space-y-6">
    <div>
      <label className="text-sm font-medium mb-1 block">Search</label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-pink"
      />
    </div>

    <div>
      <label className="text-sm font-medium mb-1 block">Sort By</label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>

    <div>
      <label className="text-sm font-medium mb-1 block">Filter</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="all">All</option>
        <option value="new">Newly Listed</option>
      </select>
    </div>
  </aside>
);

export default FilterSidebar;