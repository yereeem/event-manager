import React, { useState } from 'react';

function EventFilterButton({ onSort }) {
    const [ascending, setAscending] = useState(true);

    const handleSort = () => {
        setAscending(!ascending);
        onSort(ascending ? 'desc' : 'asc');
    };

    return (
        <button onClick={handleSort}>
            Sort by Start Date: {ascending ? 'Ascending' : 'Descending'}
        </button>
    );
}

export default EventFilterButton;
