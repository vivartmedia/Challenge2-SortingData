let currentData = [];
let itemsPerPage = 10;
let currentPage = 1;

async function loadData() {
    const response = await fetch('../data/data.json');
    const data = await response.json();
    currentData = data.People;
    renderCurrentPage();
}

function createTable(dataToShow) {
    const tableContainer = document.getElementById('data-list');
    tableContainer.innerHTML = ''; // Clear previous content
    const table = document.createElement('table');
    table.className = 'table'; // Bootstrap class "table"

    // Table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
    <tr>
        <th scope="col">ID</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
        <th scope="col">Age</th>
        <th scope="col">Height</th>
    </tr>`;
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement('tbody');
    dataToShow.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.Id}</td>
            <td>${item.FirstName}</td>
            <td>${item.LastName}</td>
            <td>${item.Email}</td>
            <td>${item.Height}</td>
            <td>${item.Age}</td>`;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

function sortTable(column, order) {
    const sortOrder = order === 'asc' ? 1 : -1;
    currentData.sort((a, b) => {
        let aValue = a[column], bValue = b[column];
        return aValue < bValue ? -1 * sortOrder : aValue > bValue ? 1 * sortOrder : 0;
    });
    renderCurrentPage();
}

function updateItemsPerPage(newItemsPerPage) {
    itemsPerPage = newItemsPerPage;
    currentPage = 1; // Reset to first page
    renderCurrentPage();
}

function renderCurrentPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = currentData.slice(startIndex, endIndex);
    createTable(itemsToShow);
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();

    document.querySelectorAll('.list-group-item').forEach(button => {
        button.addEventListener('click', function() {
            const column = this.id.replace('sortButton', ''); // Adjust based on actual IDs
            const currentOrder = this.getAttribute('data-order');
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            this.setAttribute('data-order', newOrder);
            sortTable(column, newOrder);
        });
    });

    document.querySelectorAll('[data-items-per-page]').forEach(button => {
        button.addEventListener('click', function() {
            const newItemsPerPage = parseInt(this.getAttribute('data-items-per-page'), 10);
            updateItemsPerPage(newItemsPerPage);
        });
    });

    document.getElementById('nextPageButton').addEventListener('click', () => {
        const totalPages = Math.ceil(currentData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderCurrentPage();
        }
    });

    document.getElementById('previousPageButton').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCurrentPage();
        }
    });
});
