const inputForm = document.getElementById('form');

inputForm.addEventListener('submit', function(event){
    const nameInput = document.getElementById('name').value.trim();
    const ageInput = document.getElementById('age').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (nameInput == '' || ageInput === ''){
        event.preventDefault();
        errorMessage.innerText = 'all fields are required';
        errorMessage.style.display = 'block';
        return;
    }
    if (isNaN(ageInput) || ageInput <= 0){
        event.preventDefault();
        errorMessage.innerText = 'Age must be a valid number';
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
});