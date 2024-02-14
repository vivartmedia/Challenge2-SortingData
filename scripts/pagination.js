// export function setupPagination (data){
    
// }

let itemsPerPage = 10; // Default number of items per page
let currentPage = 1; // Current page

function updateItemsPerPage(newItemsPerPage) {
    itemsPerPage = newItemsPerPage;
    currentPage = 1; // Reset to first page because the number of pages might change
    renderCurrentPage();
  }
  
  function renderCurrentPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = currentData.slice(startIndex, endIndex);
    createTable(itemsToShow); // Assuming createTable draws the table based on given data
  }

  
  document.addEventListener('DOMContentLoaded', () => {
    const paginationButtons = document.querySelectorAll('[data-items-per-page]');
    paginationButtons.forEach(button => {
      button.addEventListener('click', function() {
        const newItemsPerPage = parseInt(this.getAttribute('data-items-per-page'), 10);
        updateItemsPerPage(newItemsPerPage);
      });
    });
  
    // Your existing sort button event listeners...
  });
  
  function goToNextPage() {
    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderCurrentPage();
    }
  }
  
  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
    }
  }
  
  document.getElementById('nextPageButton').addEventListener('click', goToNextPage);
  document.getElementById('previousPageButton').addEventListener('click', goToPreviousPage);
  