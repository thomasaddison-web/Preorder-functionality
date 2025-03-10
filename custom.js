
//product template part
document.addEventListener('variant:changed', function(event) {
  var variant = event.detail.variant;
  var selectedSection = event.target.querySelector('.ProductForm__AddToCart');
  var incomingSection = event.target.querySelector('.incoming-variant');
  var bisButton = document.querySelector('#BIS_trigger');

  if (window.inventories[variant.id] <= 0) {
    if(selectedSection){
      if(window.sellingStatus[variant.id] == 'continue'){
        selectedSection.innerHTML = '<span>PreOrder</span>';
        if(bisButton){
          bisButton.classList.add('hide');
        }
      }else{
        selectedSection.innerHTML = '<span>Sold out</span>';
        if(bisButton){
          bisButton.classList.remove('hide');
        }
      }
    }
    if(incomingSection){
      if(window.incomingvariants[variant.id].incoming){
        incomingSection.classList.remove('hide');
        incomingSection.innerText = window.incomingvariants[variant.id].date
      }else if(window.inventories[variant.id] <= 0){
        incomingSection.classList.remove('hide');
      }else{
        incomingSection.classList.add('hide');
      }
    }
  }else{
    if(incomingSection){
      incomingSection.classList.add('hide');
    }
  }
});

//Product List part
const gridAtcOptions = document.querySelectorAll('.js-product-grid-atc-option');

gridAtcOptions.forEach((gridAtcOption) => {
  const variantId = gridAtcOption.getAttribute('data-variant-id');
  const parentElement = gridAtcOption.closest('.ProductItem');
  const textWrap = parentElement.querySelector('.js-product-grid-atc-btn');
  const parentElementJson = parentElement.querySelector('.ProductItem-grid-script').textContent;
  const pJson = JSON.parse(parentElementJson);
  const selectedVariant = pJson.variants.find((variant) => variant.id == variantId);
    // gridAtcOption.addEventListener('mouseover', (e) => {
    //   if (selectedVariant.inventory <= 0) {
    //     if(selectedVariant.available){
    //       textWrap.innerText = 'Preorder';
    //     }else{
    //       textWrap.innerText = 'Sold out';
    //     }
    //   }else{
    //     textWrap.innerText = 'Add to Bag';
    //   }
    // })
  if (window.innerWidth < 768) {
    gridAtcOption.addEventListener('touchstart', (e) => {
      if (selectedVariant.inventory <= 0) {
        if(selectedVariant.available){
          textWrap.innerText = 'Preorder';
        }else{
          textWrap.innerText = 'Sold out';
        }
      }else{
        textWrap.innerText = 'Add to Bag';
      }
    })
  }else{
    gridAtcOption.addEventListener('mouseover', (e) => {
      if (selectedVariant.inventory <= 0) {
        if(selectedVariant.available){
          textWrap.innerText = 'Preorder';
        }else{
          textWrap.innerText = 'Sold out';
        }
      }else{
        textWrap.innerText = 'Add to Bag';
      }
    })
  }
})
