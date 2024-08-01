// Define the SearchBar component with props "search" and "onSearch" from parent component (EventList).
function SearchBar({ search, onSearch }) {
  // Define a handleChange function to handle input changes
  const handleChange = (e) => {
    // Call the onSearch function with the new input value
    onSearch(e.target.value);
  };

  // Render the SearchBar component
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search events by name..."
        value={search} // Set the input value to the 'search' prop value.
        onChange={handleChange}
        // inline styles for the search bar.
        style={{
          width: "93%",
          margin: "10px",
          padding: "10px",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

// Export the SearchBar component as the default export
export default SearchBar;
