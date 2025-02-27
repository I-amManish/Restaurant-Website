// popup to show today's offer
document.addEventListener("DOMContentLoaded", function () {
    showOfferPopup();
});

function showOfferPopup() {
    Swal.fire({
        title: "Today's Offer!",
        html: "Get 20% off on food order! Use code: TODAY10",
        icon: "info"
    });
}
// popup end 

// book a table form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const sentMessageContainer = document.getElementById('sent-message');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission
  
      // Show the success message
      sentMessageContainer.style.display = 'block';
  
      // Submit the form asynchronously
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          // Reset the form after successful submission
          form.reset();
        } else {
          throw new Error('Failed to send email. Please try again later.');
        }
      })
      .catch(error => {
        // Show error message
        console.error(error.message);
      });
    });
  });
  function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var guests = document.getElementById("people").value;
    var message = document.getElementById("message").value;

    var emailBody = "Name: " + name + "<br>" +
                    "Email: " + email + "<br>" +
                    "Phone: " + phone + "<br>" +
                    "Date: " + date + "<br>" +
                    "Time: " + time + "<br>" +
                    "Number of Guests: " + guests + "<br>" +
                    "Message: " + message;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "immanish0003@gmail.com",
        Password: "CA82AB992D43F4290D78FC0887C36DB76F39",
        To: 'immanish0003@gmail.com',
        From: "immanish0003@gmail.com",
        Subject: "Booking Information",
        Body: emailBody
    }).then(
        message => {
            Swal.fire({
                title: "Success!",
                text: "Email has been sent successfully!",
                icon: "success"
            });
            // Reset the form after successful submission
            document.getElementById('booking-form').reset();
            // Show the success message
            document.getElementById('sent-message').style.display = 'block';
        }
    ).catch(error => {
        console.error("Failed to send email:", error);
        // Show error message
        document.getElementById('error-message').textContent = 'Failed to send email. Please try again later.';
        document.getElementById('error-message').style.display = 'block';
    });
}


//spinner
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const sentMessageContainer = document.getElementById('sent-message');
    const loadingSpinner = document.querySelector('.loading');
    const errorContainer = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Hide any existing error message
        errorContainer.textContent = '';
        errorContainer.style.display = 'none';

        // Validate form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value.trim();
        const time = document.getElementById('time').value.trim();
        const people = document.getElementById('people').value.trim();
        const message = document.getElementById('message').value.trim();

        // Array to hold the names of empty fields
        const emptyFields = [];

        // Check each field and add to emptyFields if empty
        if (!name) emptyFields.push('Name');
        if (!email) emptyFields.push('Email');
        if (!phone) emptyFields.push('Phone');
        if (!date) emptyFields.push('Date');
        if (!time) emptyFields.push('Time');
        if (!people) emptyFields.push('Number of People');
        if (!message) emptyFields.push('Message');

        // If any field is empty, display error message
        if (emptyFields.length > 0) {
            errorContainer.textContent = `Please fill out the following fields: ${emptyFields.join(', ')}.`;
            errorContainer.style.display = 'block';
            return; // Exit function early
        }

        // Show the loading spinner
        loadingSpinner.style.display = 'block';

        // Submit the form asynchronously
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    // Reset the form after successful submission
                    form.reset();
                    // Hide the loading spinner after 3 seconds
                    setTimeout(() => {
                        loadingSpinner.style.display = 'none';
                    }, 3000); // Adjust the duration as needed
                    // Show the success message
                    sentMessageContainer.style.display = 'block';
                } else {
                    throw new Error('Failed to send email. Please try again later.');
                }
            })
            .catch(error => {
                // Show error message
                console.error(error.message);
            });
    });
});

// menu filter
$(document).ready(function(){
    // Filter menu items when a filter button is clicked
    $('#menu-flters li').click(function(){
        $('#menu-flters li').removeClass('filter-active');
        $(this).addClass('filter-active');

        var selectedFilter = $(this).data('filter');
        $('.menu-item').fadeOut(0); // Hide all menu items first
        if(selectedFilter == '*'){
            $('.menu-item').fadeIn(); // If Show All is selected, fade in all items
        } else {
            $('.menu-item').each(function(){
                if($(this).hasClass(selectedFilter.replace('.', ''))){
                    $(this).fadeIn();
                }
            });
        }
    });
});

// JavaScript/jQuery code to toggle the button text and icon
$(document).ready(function(){
    $('.cssbuttons-io-button').click(function(){
        var button = $(this);
        var buttonText = button.find('span');
        var icon = button.find('.plus-icon');

        if (buttonText.text() === 'Add') {
            buttonText.text('Remove');
            icon.attr('d', 'M18 13H6v-2h12v2z');
        } else {
            buttonText.text('Add');
            icon.attr('d', 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z');
        }
    });
});

// link image
$(document).ready(function(){
    $('.menu-item-link').click(function(e){
        e.preventDefault(); // Prevent the default behavior of the link
        
        var imageUrl = $(this).data('image');
        
        // Set the image source and display it
        $('.menu-image img').attr('src', imageUrl);
        $('.menu-image').show();
    });
});

// nothing ot see here
function showMessage(event, category) {
    event.preventDefault();
    const messageContainer = document.getElementById('message');
    const cartDetails = $('.cart-details');

    // Clear the content of the message container and hide cart details
    messageContainer.textContent = '';
    cartDetails.hide();

    if (category === 'Not Shipped Yet' || category === 'Cancelled Orders') {
        messageContainer.textContent = 'Nothing to see here';
    } else if (category === 'Buy Again') {
        window.location.hash = '#menu'; // Redirect to the 'menu' section
    } else {
        messageContainer.textContent = category;
    }
}







// to show last cnacelled order
// Define some sample data for cancelled orders
const cancelledOrders = [
    { id: 1, item: "Product A", quantity: 2, price: 10 },
    { id: 2, item: "Product B", quantity: 1, price: 15 },
    // Add more cancelled orders here as needed
];

function showMessage(event, category) {
    event.preventDefault();
    const messageContainer = document.getElementById('message');
    const cartDetails = $('.cart-details');

    // Clear the content of the message container and hide cart details
    messageContainer.textContent = '';
    cartDetails.hide();

    if (category === 'Not Shipped Yet') {
        messageContainer.textContent = 'Nothing to see here';
    } else if (category === 'Cancelled Orders') {
        const lastCancelledOrder = cancelledOrders[cancelledOrders.length - 1];
        if (lastCancelledOrder) {
            displayCancelledOrderDetails(lastCancelledOrder);
        } else {
            messageContainer.textContent = 'No cancelled orders found';
        }
    } else if (category === 'Buy Again') {
        window.location.hash = '#menu'; // Redirect to the 'menu' section
    } else {
        messageContainer.textContent = category;
    }
}




function displayCancelledOrderDetails(orderDetails) {
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = ''; // Clear previous content

    // Create cart details container
    const cartDetails = document.createElement('div');
    cartDetails.classList.add('cart-details', 'w-25');
    cartDetails.style.display = 'block';
    cartDetails.style.border = '1px solid black';
    cartDetails.style.marginLeft = '100px';
    cartDetails.style.borderRadius = '5%';
    cartDetails.style.padding = '2px 0 5px 5px';

    // Order title
    const orderTitle = document.createElement('h3');
    orderTitle.textContent = 'Order Detail:- 1';
    orderTitle.style.textAlign = 'center';
    cartDetails.appendChild(orderTitle);

    // Item
    const itemParagraph = document.createElement('p');
    itemParagraph.innerHTML = `<strong>Item:</strong> <span class="cart-item">${orderDetails.item}</span>`;
    cartDetails.appendChild(itemParagraph);

    // Ingredients
    const ingredientsParagraph = document.createElement('p');
    ingredientsParagraph.innerHTML = `<strong>Ingredients:</strong> <span class="cart-ingredients">${orderDetails.ingredients}</span>`;
    cartDetails.appendChild(ingredientsParagraph);

    // Price
    const priceParagraph = document.createElement('p');
    priceParagraph.innerHTML = `<strong>Price ₹:</strong> <span class="cart-price">${orderDetails.price}</span>`;
    cartDetails.appendChild(priceParagraph);

    // Quantity control
    const quantityControl = document.createElement('div');
    quantityControl.classList.add('quantity-control');
    const decreaseButton = document.createElement('button');
    decreaseButton.classList.add('change-quantity', 'decrease-quantity');
    decreaseButton.textContent = '-';
    const quantitySpan = document.createElement('span');
    quantitySpan.classList.add('cart-quantity');
    quantitySpan.textContent = '1';
    const increaseButton = document.createElement('button');
    increaseButton.classList.add('change-quantity', 'increase-quantity');
    increaseButton.textContent = '+';
    quantityControl.appendChild(decreaseButton);
    quantityControl.appendChild(quantitySpan);
    quantityControl.appendChild(increaseButton);
    cartDetails.appendChild(quantityControl);

    // Remove and Order Now buttons (optional, you can remove them if not needed)
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-product');
    removeButton.textContent = 'Remove';
    cartDetails.appendChild(removeButton);
    const orderNowButton = document.createElement('button');
    orderNowButton.classList.add('order-now');
    orderNowButton.textContent = 'Order Now';
    cartDetails.appendChild(orderNowButton);

    // Append cart details to message container
    messageContainer.appendChild(cartDetails);
}





$(document).ready(function(){
    $('.add-to-cart').click(function(){
        var button = $(this);
        var cartDetails = $('.cart-details');
        var menuItem = button.closest('.menu-item');
        var itemName = menuItem.find('.menu-item-link').data('name');
        var ingredients = menuItem.find('.menu-item-link').data('ingredients');
        var price = menuItem.find('.menu-item-link').data('price');
        
        if (button.hasClass('added')) {
            // Remove item from cart
            cartDetails.hide();
            button.removeClass('added');
            button.find('.icon').attr('d', 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z');
            button.find('span').text('Add');
        } else {
            // Add item to cart
            $('.cart-item').text(itemName);
            $('.cart-ingredients').text(ingredients);
            $('.cart-price').text(price);
            cartDetails.show();
            button.addClass('added');
            button.find('.icon').attr('d', 'M18 13H6v-2h12v2z');
            button.find('span').text('Remove');
        }
    });
});

// quantity
$(document).ready(function(){
    // Event handler for changing quantity
    $('.change-quantity').click(function(){
        var button = $(this);
        var quantitySpan = button.siblings('.cart-quantity');
        var currentQuantity = parseInt(quantitySpan.text());
        
        if (button.hasClass('increase-quantity')) {
            // Increase quantity
            quantitySpan.text(currentQuantity + 1);
        } else if (button.hasClass('decrease-quantity') && currentQuantity > 1) {
            // Decrease quantity, ensuring it doesn't go below 1
            quantitySpan.text(currentQuantity - 1);
        }
    });

    // Event handler for "Remove Product" button
    $('.remove-product').click(function(){
        // Hide the cart details
        var cartDetails = $(this).closest('.cart-details');
        cartDetails.hide();
        // Reset the quantity to 1
        cartDetails.find('.cart-quantity').text('1');
        // Remove the item from the cart
        var addButton = cartDetails.prev().find('.add-to-cart');
        addButton.removeClass('added');
        addButton.find('.icon').attr('d', 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z');
        addButton.find('span').text('Add');
    });

    // Event handler for "Order Now" button
    $('.order-now').click(function(){
        $('.order-message').fadeIn();
        setTimeout(function(){
            $('.order-message').fadeOut();
        }, 3000); // Hide after 3 seconds (3000 milliseconds)
    });
});


// data save

// contact us section js start

function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var emailBody = "Name: " + name + "<br>" +
                    "Email: " + email + "<br>" +
                    "Subject: " + subject + "<br>" +
                    "Message: " + message;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "immanish0003@gmail.com",
        Password : "CA82AB992D43F4290D78FC0887C36DB76F39",
        To : 'immanish0003@gmail.com',
        From : "immanish0003@gmail.com",
        Subject : "Contact Form Submission: " + subject,
        Body : emailBody
    }).then(
      message => {
        // Use SweetAlert for displaying success message
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success"
        });
      }
    );
}

// contact us section js end 

//note: cart active status start
function showMessage(event, status) {
    event.preventDefault(); // Prevent default link behavior

    // Remove 'active' class from all links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add 'active' class to the clicked link
    event.target.classList.add('active');

    // Add your logic to show messages based on the status
    console.log('Showing messages for status:', status);
  }

  

// Get the elements for price, quantity, and total price
const decreaseBtn = document.querySelector('.decrease-quantity');
const increaseBtn = document.querySelector('.increase-quantity');
const quantityElement = document.getElementById('itemQuantity');
const totalPriceElement = document.getElementById('totalPrice');
const itemPriceElement = document.getElementById('itemPrice');

// Assuming the price of one item is stored here (can be dynamic based on item selected)
const itemPrice = parseFloat(itemPriceElement.innerText);

// Function to update total price
// Updated total price calculation logic
function updateTotalPrice() {
    const quantity = parseInt(quantityElement.innerText); // Get the current quantity
    const itemPrice = parseFloat(itemPriceElement.innerText); // Get the dynamic price from the page
    const totalPrice = itemPrice * quantity; // Calculate total price
    totalPriceElement.innerText = totalPrice.toFixed(2); // Update total price
  }

// Event listener for the decrease quantity button
decreaseBtn.addEventListener('click', function() {
    let quantity = parseInt(quantityElement.innerText); // Get current quantity
    if (quantity > 1) {
      quantity -= 1; // Decrease the quantity
      quantityElement.innerText = quantity; // Update the displayed quantity
      updateTotalPrice(); // Update the total price
    }
  });

// Event listener for the increase quantity button
increaseBtn.addEventListener('click', function() {
    let quantity = parseInt(quantityElement.innerText); // Get current quantity
    quantity += 1; // Increase the quantity
    quantityElement.innerText = quantity; // Update the displayed quantity
    updateTotalPrice(); // Update the total price
  });

// Initial total price update (on page load)
updateTotalPrice();

// Menu Data Structure (Example)
const menu = {
    "Aloo Bonda": {
        price: 50,
        ingredients: "Potatoes, Gram flour, Spices"
    },
    "Pav Bhaji": {
        price: 80,
        ingredients: "Bread, Vegetables, Spices"
    },
    "Samosa": {
        price: 30,
        ingredients: "Potatoes, Peas, Spices"
    },
    // Add more items as necessary
};

// Function to update the cart with the correct item details
function updateCart(itemName) {
    // Get the item details from the menu data structure
    const item = menu[itemName];
    
    if (item) {
        // Update the item name, ingredients, and price dynamically
        document.getElementById('cartItemName').innerText = itemName;
        document.getElementById('cartIngredients').innerText = item.ingredients;
        document.getElementById('itemPrice').innerText = item.price.toFixed(2);
        
        // Initialize total price (price * quantity)
        updateTotalPrice(item.price);
    } else {
        console.log("Item not found in menu.");
    }
}

// Function to update the total price based on quantity
function updateTotalPrice(itemPrice) {
    const quantity = document.getElementById('itemQuantity').innerText;
    const totalPrice = itemPrice * quantity;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

// Update the cart when the page loads or when the item is selected
updateCart("Aloo Bonda"); // For example, the default item is "Aloo Bonda"

// Quantity increase and decrease functionality
document.querySelector('.increase-quantity').addEventListener('click', function() {
    const quantityElement = document.getElementById('itemQuantity');
    let quantity = parseInt(quantityElement.innerText);
    quantity++;
    quantityElement.innerText = quantity;
    updateTotalPrice(parseFloat(document.getElementById('itemPrice').innerText));
});

document.querySelector('.decrease-quantity').addEventListener('click', function() {
    const quantityElement = document.getElementById('itemQuantity');
    let quantity = parseInt(quantityElement.innerText);
    if (quantity > 1) {
        quantity--;
        quantityElement.innerText = quantity;
        updateTotalPrice(parseFloat(document.getElementById('itemPrice').innerText));
    }
});

// Order Now Button Functionality
document.querySelector('.order-now').addEventListener('click', function() {
    alert("Order placed for " + document.getElementById('cartItemName').innerText);
});

// Remove Product Functionality
document.querySelector('.remove-product').addEventListener('click', function() {
    alert("Product removed from cart");
    // Optionally, you can hide or reset the cart details here
});



 /// Get modal elements and buttons
const modal = document.getElementById('orderModal');
const closeModalBtn = document.querySelector('.close-modal');
const orderNowBtn = document.querySelector('.order-now');
const orderForm = document.getElementById('orderForm');
const paymentModeSelect = document.getElementById('paymentMode');
const upiSection = document.getElementById('upiSection');
const discountCouponInput = document.getElementById('discountCoupon');
const applyDiscountBtn = document.getElementById('applyDiscountBtn');
const discountAmountDisplay = document.getElementById('discountAmount');
const finalTotalDisplay = document.getElementById('finalTotal');
const totalAmountDisplay = document.getElementById('totalAmount');

// Initialize original total (this should come from your cart logic)
let originalTotal = 100; // Example value, should be dynamically calculated from the cart
let discount = 0; // Initial discount amount

// Show the initial total amount in the modal
totalAmountDisplay.innerText = originalTotal.toFixed(2);

// Open modal when "Order Now" button is clicked
orderNowBtn.addEventListener('click', function() {
  modal.style.display = 'block'; // Show the modal
});

// Close modal when "Close" button is clicked
closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none'; // Hide the modal
});

// Close modal if user clicks outside of it
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // Close the modal
  }
});

// Handle Payment Mode Change (Show UPI ID and QR Code)
paymentModeSelect.addEventListener('change', function() {
  if (paymentModeSelect.value === 'upi') {
    upiSection.style.display = 'block'; // Show UPI ID field and QR code
  } else {
    upiSection.style.display = 'none'; // Hide UPI ID field and QR code
  }
});

// Handle Discount Application
applyDiscountBtn.addEventListener('click', function() {
    const discountCoupon = discountCouponInput.value.trim();
  
    if (discountCoupon) {
      let discountValue = 0;
      
      // Apply logic to check the coupon and calculate the discount
      if (discountCoupon === 'TODAY10') {
        discountValue = originalTotal * 0.10; // 10% discount
      } else if (discountCoupon === 'DISCOUNT20') {
        discountValue = originalTotal * 0.20; // 20% discount
      } else {
        alert('Invalid coupon code');
      }
  
      // Update the discount and final total
      discountAmountDisplay.innerText = `Discount: ₹${discountValue.toFixed(2)}`;
      const finalTotal = originalTotal - discountValue;
      finalTotalDisplay.innerText = `Final Total: ₹${finalTotal.toFixed(2)}`;
  
      // Update the final amount for submission
      totalAmountDisplay.innerText = finalTotal.toFixed(2);
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
    }
  });

// Handle Form Submission (if you need to submit the order)
orderForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the form values (for example, user info and payment details)
  const userName = document.getElementById('userName').value;
  const userAddress = document.getElementById('userAddress').value;
  const userMobile = document.getElementById('userMobile').value;
  const paymentMode = document.getElementById('paymentMode').value;
  const upiID = document.getElementById('upiID').value;
  const finalAmount = parseFloat(totalAmountDisplay.innerText);

  // You can process the order data here or send it to the server
  console.log('Order submitted:', {
    userName,
    userAddress,
    userMobile,
    paymentMode,
    upiID,
    finalAmount,
  });

  // Show a confirmation or success message
  alert('Order submitted successfully!');
  
  // Close the modal after submission
  modal.style.display = 'none';
});


// Handle form submission
orderForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form values
  const userName = document.getElementById('userName').value;
  const userAddress = document.getElementById('userAddress').value;
  const userMobile = document.getElementById('userMobile').value;
  const paymentMode = document.getElementById('paymentMode').value;
  const upiID = document.getElementById('upiID').value;
  const discountCoupon = document.getElementById('discountCoupon').value;

  // Calculate the final total after discount
  const finalAmount = originalTotal - discount;

  // You can process the order data here or send it to the server
  console.log('Order submitted:', {
    userName,
    userAddress,
    userMobile,
    paymentMode,
    upiID,
    discountCoupon,
    finalAmount
  });

  // Show a confirmation or success message
  alert('Order submitted successfully!');

  // Close the modal after submission
  modal.style.display = 'none';
});

// Handle Cancel Order Button
const cancelOrderBtn = document.querySelector('.cancel-btn');
cancelOrderBtn.addEventListener('click', function() {
  modal.style.display = 'none'; // Close the modal without submitting the form
});

//note: cart active status end

//note: search bar js
function filterOptions() {
    const input = document.querySelector('.input'); // Input element
    const dropdown = document.querySelector('.dropdown'); // Dropdown container
    const filter = input.value.toLowerCase(); // Get the input value
    const items = dropdown.querySelectorAll('.dropdown-item'); // Dropdown items
  
    let hasMatch = false; // Track if any item matches
  
    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(filter)) {
        item.style.display = 'block'; // Show matching item
        hasMatch = true;
      } else {
        item.style.display = 'none'; // Hide non-matching item
      }
    });
  
    // Show dropdown if there are matches, otherwise hide it
    dropdown.classList.toggle('active', hasMatch && filter.length > 0);
  }
  function highlightItem(element) {
    // Remove the 'highlight' class from all items
    let items = document.querySelectorAll('.dropdown-item');
    items.forEach(function(item) {
      item.classList.remove('highlight');
    });
  
    // Add 'highlight' class to the clicked item
    element.classList.add('highlight');
  
    // Scroll to the menu (if needed)
    document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
  }
  // Initialize EmailJS
  emailjs.init("user_YOUR_USER_ID"); // Replace with your actual EmailJS User ID

  // Order form submission handler
  document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const userName = document.getElementById("userName").value;
    const userAddress = document.getElementById("userAddress").value;
    const userMobile = document.getElementById("userMobile").value;
    const paymentMode = document.getElementById("paymentMode").value;
    const discountCoupon = document.getElementById("discountCoupon").value;
    const itemPrice = document.getElementById("itemPrice").textContent;

    // Send email with EmailJS
    const templateParams = {
      user_name: userName,
      user_address: userAddress,
      user_mobile: userMobile,
      payment_mode: paymentMode,
      discount_coupon: discountCoupon,
      item_price: itemPrice,
    };

    emailjs.send("service_YOUR_SERVICE_ID", "template_YOUR_TEMPLATE_ID", templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response);
        alert("Order submitted successfully!");
        // Reset form
        document.getElementById("orderForm").reset();
      }, function(error) {
        console.log('FAILED...', error);
        alert("Failed to submit the order. Please try again.");
      });
  });