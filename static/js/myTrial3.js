
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){


    function allStorage() {

        var values = [],
            keys = Object.keys(localStorage)
            i = keys.length;
    
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]));
        }
    
        return values;
    }

    var cartItems = document.getElementsByTagName('tbody')[0]
    cartItems.innerHTML = allStorage()

    


    function onPositionReceived(position){
    document.getElementById('userLatitude').value = position.coords.latitude;
    document.getElementById('userLongitude').value = position.coords.longitude;
    }

    function locationNotReceived(positionError){
        console.log(positionError)
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionReceived,locationNotReceived);
    }else{
        alert('Use Chorme for best experience!')
    }

    var addToCartButtons = document.getElementsByClassName('productItem')
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var showCartContentButton = document.getElementById('show_cart_btn')
    showCartContentButton.addEventListener('click', showCart)

    var hideCart = document.getElementById('hide_cart')
    hideCart.addEventListener('click', hideTheCart)

    var buyProducts = document.getElementById('show_total')
    buyProducts.addEventListener('click', getLocation)

}

function addToCartClicked(e) {
    
    var button = e.target.parentElement
    console.log(button)
    var productItem = button.children
    var productName = productItem[1].innerText
    var productPrice = productItem[2].innerText
    addItemToCart(productName, productPrice)
}

function addItemToCart(productName, productPrice) {
    var cartRow = document.createElement('tr')
    var cartItems = document.getElementsByTagName('tbody')[0]
    
    var cartRowContents = 
    `<tr>
        <td><input name ="itemName" type='text' class='itemName' value ='${productName}'></td>
        <td><input name ="itemOfQuantity" class='quantity' type='number' style='width: 40px;' value='1'></td>
        <td class='price'>${productPrice}</td>
        <td><button class='btn btn-warning'>Remove</button></td>
    </tr>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    localStorage.setItem(productName,cartRowContents)
}

function showCart() {
    
    var cart = document.getElementById('theCart')
    cart.style.visibility = 'visible';
    upDateCartTotal()


    var removeCartItemsBtn = document.getElementsByClassName('btn-warning')
    for (var i = 0; i < removeCartItemsBtn.length ; i++){
        var removeBtn = removeCartItemsBtn[i]
        removeBtn.addEventListener('click', removeItem)
    }

    var quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
}

function upDateCartTotal() {
    var cartItemContainer = document.getElementsByTagName('tbody')[0]
    var cartItems = cartItemContainer.getElementsByTagName('tr')
    var total = 0
    for (var i = 0; i < cartItems.length ; i++){
        var cartItem = cartItems[i]
        var itemPrice = cartItem.getElementsByClassName('price')[0]
        var itemQuantity = cartItem.getElementsByClassName('quantity')[0]
        var price = parseInt(itemPrice.innerText.replace('Ksh.',''))
        var quantity = itemQuantity.value

        total = total + (price * quantity)
    }
    total = total + 50
    document.getElementById('show_total').value = 'Buy Ksh.' + total
}

function quantityChanged(e) {
    var theInput = e.target
    if (isNaN(theInput.value) || theInput.value <= 0){
        theInput.value = 1
    }
    upDateCartTotal()
}

function removeItem(e){
    var removeItem = e.target.parentElement.parentElement
    var itemToRemoveName = e.target.parentElement.parentElement.children[0].getElementsByClassName("itemName")[0].value
    console.log(itemToRemoveName)
    removeItem.remove()
    localStorage.removeItem(itemToRemoveName)
    upDateCartTotal()

}

function hideTheCart() {
    var cart = document.getElementById('theCart')
    cart.style.visibility = 'hidden';
}

function getLocation() {

    var orderText = '';
    var orderNames = document.getElementsByClassName('itemName')
    var orderQuantity = document.getElementsByClassName('quantity')
    for (var i =0; i < orderNames.length; i++ ) {
        orderText = orderText + orderNames[i].value + "=" +orderQuantity[i].value +" "
    }
    document.getElementById('orderString').value = orderText
    localStorage.clear()
}




