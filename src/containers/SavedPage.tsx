import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../components/Card"; // Assuming Card component is in this path

type DataSchema = {
  id: number;
  data: string;
  createdAt: string;
  updatedAt: string;
};

const SavedPage = () => {
  const [savedData, setSavedData] = useState<DataSchema[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("newest");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("data");
    setSavedData(data ? JSON.parse(data) : []);
  }, []);

  const handleDelete = (id: number) => {
    const filteredData = savedData.filter((item) => item.id !== id);
    setSavedData(filteredData);
    localStorage.setItem("data", JSON.stringify(filteredData));
    toast("Item deleted successfully!");
  };

  const handleEdit = (id: number) => {
    localStorage.setItem("editId", id.toString());
    navigate(`/?edit=true`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const getFilteredData = () => {
    let data = [...savedData];

    // Filter based on search term
    if (searchTerm) {
      data = data.filter((item) =>
        item.data.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort based on the selected option
    if (sortOption === "newest") {
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === "oldest") {
      data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return data;
  };

  return (
    <div className="container">
      <div className="saved-main">
        <div className="header">
          <h1 className="heading1">Saved Texts</h1>
          <div className="controls">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="saved-search-box"
            />
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="saved-sort-dropdown"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Render the filtered and sorted data */}
        <div className="saved-cards-container">
          {getFilteredData().length > 0 ? (
            getFilteredData().map((item) => (
              <Card
                key={item.id}
                createdAt={item.createdAt}
                data={item.data}
                id={item.id}
                updatedAt={item.updatedAt}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No saved data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
