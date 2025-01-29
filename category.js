document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function (e) {
      e.preventDefault(); 

      const selectedCategory = this.getAttribute('data-information');
      const cards = document.querySelectorAll('.card');
      let productFound = false;

      cards.forEach(card => {
          if (selectedCategory === 'All' || card.getAttribute('data-information') === selectedCategory) {
              card.parentElement.style.display = ''; 
              productFound = true;
          } else {
              card.parentElement.style.display = 'none'; 
          }
      });

      
      if (!productFound) {
          const productNotFoundModal = new bootstrap.Modal(document.getElementById('productNotFoundModal'));
          productNotFoundModal.show();
      }
  });
});
