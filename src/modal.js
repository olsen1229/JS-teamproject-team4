document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('myModal');
  var mainContainer = document.querySelector('.main-section-container');
  var span = document.getElementsByClassName('close')[0];

  mainContainer.addEventListener('click', function(event) {
    if (event.target === mainContainer) {
      modal.style.display = "block";
    }
  });
    
  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
