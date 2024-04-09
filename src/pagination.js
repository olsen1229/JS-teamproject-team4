document.addEventListener("DOMContentLoaded", function() {
    var paginationItems = document.querySelectorAll('.pagination-list li');

    paginationItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            paginationItems.forEach(function(item) {
                item.classList.remove('active');
            });

            this.classList.add('active');
            
            console.log('Navigating to page:', index + 1);
        });
    });
});

