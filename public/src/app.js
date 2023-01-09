



let addToCart = document.querySelectorAll(".add-to-cart");

let cartCounter = document.querySelector("#cart-counter");



function updateCart(pizza){

  

    
   fetch('/update-cart', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(pizza)
    
   }).then(res => {

     return res.json();
    
   }).then(obj => {


      cartCounter.innerText = obj.data;
      
  

      new Noty({
        text: 'Added to cart',
        timeout: 1000,
        type: 'success',
        theme: 'mint',
        progressBar: false
        
      }).show()
      
     

   }).catch(err => {
      new Noty({
        text: 'Oops!Something went wrong',
        timeout: 1000,
        type: 'error',
        theme: 'mint',
        progressBar: false
        
      }).show()
   })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
    
        let pizza = JSON.parse(btn.dataset.pizza);
        
        updateCart(pizza);
        e.preventDefault();
        
    })
})

