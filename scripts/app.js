// import { createTable, sortTable } from "./table.js";
// import { updateItemsPerPage } from "./pagination.js";
let currentData = [];
async function loadData(){
    const response =await fetch('../data/data.json');
    const data = await response.json();
    currentData = data.People;
    createTable(currentData);
    setupPagination(currentData);
    // console.log(data);
}
loadData();



// let currentData = [];

export function createTable(currentData) {
    // data = currentData;
    console.log(currentData)
    const tableContainer = document.getElementById('data-list');
    tableContainer.innerHTML = '';//clear previous table content

    const table = document.createElement('table');
    table.className = 'table';//a bootstrap class "table"

    //create table header
    const thead = document.createElement('thead');
    thead.innerHTML =`
    <tr>
        <th scope="col">ID</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
        <th scope="col">Age</th>
        <th scope="col">Height</th>
    </tr>
    `;
    table.appendChild(thead);

    // Create table body and rows
    const tbody = document.createElement('tbody');

    console.log(currentData);
    currentData.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.Id}</td>        <!-- Make sure the property names are correctly cased -->
            <td>${item.FirstName}</td> <!-- JavaScript is case-sensitive; these should match -->
            <td>${item.LastName}</td>  <!-- the case of the keys in your data objects -->
            <td>${item.Email}</td>
            <td>${item.Height}</td>
            <td>${item.Age}</td>
        `;
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    


}


export function sortTable(column, order) {
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortedData = [...currentData].sort((a, b) => {
        // Convert values to lowercase for case-insensitive comparison, if they are strings
        let aValue = typeof a[column] === 'string' ? a[column].toLowerCase() : a[column];
        let bValue = typeof b[column] === 'string' ? b[column].toLowerCase() : b[column];
        
        if (aValue < bValue) return -1 * sortOrder;
        if (aValue > bValue) return 1 * sortOrder;
        return 0;
    });

    createTable(sortedData);

    
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sortByIdButton').addEventListener('click', () => {
        console.log("ia m clicked")
        const currentOrder = document.querySelector('#sortByIdButton').getAttribute('data-order');
        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        sortTable('Id', newOrder); 
        document.querySelector('#sortByIdButton').setAttribute('data-order', newOrder);
    });
    

    // Add event listeners for other sorting buttons here
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sortByNameButton').addEventListener('click', () => {
        console.log("ia m clicked")
        const currentOrder = document.querySelector('#sortByIdButton').getAttribute('data-order');
        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        sortTable('FirstName', newOrder); 
        document.querySelector('#sortByIdButton').setAttribute('data-order', newOrder);
    });
    

    // Add event listeners for other sorting buttons here
});



// export function sortTable(column, order) {
//     const sortOrder = order === 'asc' ? 1 : -1;
//     const sortedData = [...currentData.FirstName].sort((a, b) => {
//         if(a[column] < b[column]) return -1 * sortOrder;
//         if(a[column] > b[column]) return 1 * sortOrder;
//         return 0;
//     });

//     createTable(sortedData);
// }







// document.getElementById('sortByIdButton').addEventListener('click', () => {
//     const currentOrder = document.querySelector('#sortByIdButton').getAttribute('data-order');
//     const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
//     sortTable('id', newOrder);
//     document.querySelector('#sortByIdButton').setAttribute('data-order', newOrder); // Toggle the order for next click
// });



