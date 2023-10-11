function addFood() {
    const availableFoods = document.getElementById('availableFoods');
    const newFoodItem = document.createElement('li');
    newFoodItem.innerHTML = `
        <label>
            <input type="checkbox" name="foodSelection" value="foodN">
            New Food - $X
            <button class="btn btn-sm btn-danger remove-food" onclick="removeFood(this)">Remove</button>
        </label>
    `;
    availableFoods.appendChild(newFoodItem);
}

function removeFood(button) {
    const foodItem = button.parentNode.parentNode;
    foodItem.parentNode.removeChild(foodItem);
}

function goToComplaintsPage() {
        // Navigate to the complaints page
        window.location.href = 'complaints.html';
}

function goToGallaryPage() {
    // Navigate to the complaints page
    window.location.href = 'gallary.html';
}

function redirectToHomePage() {
    // Navigate to the home page (replace 'home.html' with the actual URL of your home page)
    window.location.href = 'home.html';
}