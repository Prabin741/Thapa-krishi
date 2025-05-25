document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const showOrderFormBtn = document.getElementById('showOrderFormBtn'); // Button in Hero
    const showOrderFormBtn2 = document.getElementById('showOrderFormBtn2'); // Button after Products (optional)
    const orderFormContainer = document.getElementById('orderFormContainer');
    const milkQuantityInput = document.getElementById('milk-quantity');
    const fishQuantityInput = document.getElementById('fish-quantity');
    const orderTotalSpan = document.getElementById('orderTotal');
    const milkPriceDisplay = document.getElementById('milkPriceDisplay');
    const fishPriceDisplay = document.getElementById('fishPriceDisplay');
    const milkPriceForm = document.getElementById('milkPrice');
    const fishPriceForm = document.getElementById('fishPrice');
    const orderProductButtons = document.querySelectorAll('.order-product-button'); // Optional buttons per product

    // --- Prices (DEFINE YOUR ACTUAL PRICES HERE) ---
    const milkPricePerLiter = 75; // Example price
    const fishPricePerKg = 300; // Example price

    // --- Functions ---

    // Function to display prices on the page
    function displayPrices() {
        if (milkPriceDisplay) milkPriceDisplay.textContent = milkPricePerLiter.toFixed(2);
        if (fishPriceDisplay) fishPriceDisplay.textContent = fishPricePerKg.toFixed(2);
        if (milkPriceForm) milkPriceForm.textContent = milkPricePerLiter.toFixed(2);
        if (fishPriceForm) fishPriceForm.textContent = fishPricePerKg.toFixed(2);
    }

    // Function to calculate and update the total
    function calculateOrderTotal() {
        // Get quantities from inputs
        const milkQuantity = parseFloat(milkQuantityInput.value) || 0; // Use parseFloat and default to 0 if input is invalid/empty
        const fishQuantity = parseFloat(fishQuantityInput.value) || 0;

        // Calculate totals for each product
        const totalMilkCost = milkQuantity * milkPricePerLiter;
        const totalFishCost = fishQuantity * fishPricePerKg;

        // Calculate grand total
        const grandTotal = totalMilkCost + totalFishCost;

        // Update the total display
        orderTotalSpan.textContent = grandTotal.toFixed(2); // Format to 2 decimal places for currency
    }

    // Function to show the order form
    function showOrderForm() {
        orderFormContainer.classList.remove('hidden-form'); // Remove the CSS class that hides it
        // Optional: Scroll to the form after showing it
        orderFormContainer.scrollIntoView({ behavior: 'smooth' });
        // Optional: Focus the first input field
        document.getElementById('customer-name').focus();
    }

    // Function to handle clicking product-specific order buttons
    function handleProductOrder(event) {
        const productType = event.target.dataset.product;
        showOrderForm(); // Show the form

        // Optional: Set the quantity for the specific product clicked
        if (productType === 'milk' && milkQuantityInput) {
            milkQuantityInput.value = 1; // Set default to 1 liter/kg
        } else if (productType === 'fish' && fishQuantityInput) {
             fishQuantityInput.value = 1; // Set default to 1 liter/kg
        }
        calculateOrderTotal(); // Recalculate total after setting quantity
    }


    // --- Event Listeners ---

    // Listen for click on the main "Order Now" button(s) to show the form
    if (showOrderFormBtn) {
       showOrderFormBtn.addEventListener('click', showOrderForm);
    }
     if (showOrderFormBtn2) {
       showOrderFormBtn2.addEventListener('click', showOrderForm);
    }


    // Listen for input changes in the quantity fields to recalculate total
    if (milkQuantityInput) {
        milkQuantityInput.addEventListener('input', calculateOrderTotal);
    }
    if (fishQuantityInput) {
        fishQuantityInput.addEventListener('input', calculateOrderTotal);
    }

    // Optional: Add event listeners to product-specific buttons
    orderProductButtons.forEach(button => {
        button.addEventListener('click', handleProductOrder);
    });


    // --- Initial Setup ---

    // Display prices when the page loads
    displayPrices();

    // Calculate initial total (should be 0 if default quantity is 0)
    calculateOrderTotal();

}); // End DOMContentLoaded