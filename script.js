// Character sets
const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/",
};

// DOM elements
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const copyButtons = document.querySelectorAll(".copy-btn");
const notification = document.querySelector(".notification");
const strengthMeter = document.querySelector(".meter .level");

// Update length value display
lengthSlider.addEventListener("input", function () {
    lengthValue.textContent = this.value;
    updateStrengthMeter();
});


// Update character set checkboxes
[
    uppercaseCheckbox,
    lowercaseCheckbox,
    numbersCheckbox,
    symbolsCheckbox,
].forEach((checkbox) => {
    checkbox.addEventListener("change", updateStrengthMeter);
});

// Generate passwords
generateBtn.addEventListener("click", generatePasswords);

// Copy password to clipboard
copyButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const password =
            index === 0 ? password1.textContent : password2.textContent;
        if (password) {
            copyToClipboard(password);
        }
    });
});

// Generate random password
function generatePassword(length, options) {
    let chars = "";
    let password = "";

    // Build character pool based on selected options
    if (options.uppercase) chars += characterSets.uppercase;
    if (options.lowercase) chars += characterSets.lowercase;
    if (options.numbers) chars += characterSets.numbers;
    if (options.symbols) chars += characterSets.symbols;

    // Ensure at least one character from each selected set is included
    if (options.uppercase) password += getRandomChar(characterSets.uppercase);
    if (options.lowercase) password += getRandomChar(characterSets.lowercase);
    if (options.numbers) password += getRandomChar(characterSets.numbers);
    if (options.symbols) password += getRandomChar(characterSets.symbols);

    // Fill the rest of the password with random characters
    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
        password += getRandomChar(chars);
    }

    // Shuffle the password to mix the guaranteed characters
    return shuffleString(password);
}

// Get random character from a string
function getRandomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
}

// Shuffle string characters
function shuffleString(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

// Generate two passwords
function generatePasswords() {
    const length = parseInt(lengthSlider.value);
    const options = {
        uppercase: uppercaseCheckbox.checked,
        lowercase: lowercaseCheckbox.checked,
        numbers: numbersCheckbox.checked,
        symbols: symbolsCheckbox.checked,
    };

    // Validate at least one character set is selected
    if (
        !options.uppercase &&
        !options.lowercase &&
        !options.numbers &&
        !options.symbols
    ) {
        showNotification("Please select at least one character type", "error");
        return;
    }

    password1.textContent = generatePassword(length, options);
    password2.textContent = generatePassword(length, options);

    updateStrengthMeter();
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            showNotification("Password copied to clipboard!");
        })
        .catch((err) => {
            showNotification("Failed to copy password", "error");
            console.error("Failed to copy:", err);
        });
}

// Show notification
function showNotification(message, type = "success") {
    notification.textContent = message;
    notification.className = "notification";

    if (type === "error") {
        notification.style.backgroundColor = "var(--danger)";
    } else {
        notification.style.backgroundColor = "var(--primary)";
    }

    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// Update password strength meter
function updateStrengthMeter() {
    const length = parseInt(lengthSlider.value);
    let strength = 0;

    // Length contributes to strength
    strength += Math.min(length / 4, 5); // Max 5 points for length

    // Character variety contributes to strength
    let variety = 0;
    if (uppercaseCheckbox.checked) variety++;
    if (lowercaseCheckbox.checked) variety++;
    if (numbersCheckbox.checked) variety++;
    if (symbolsCheckbox.checked) variety++;
    strength += variety * 2; // Max 8 points for variety

    // Calculate percentage (0-100)
    const percentage = Math.min(Math.floor((strength / 13) * 100), 100);

    // Update meter width and color
    strengthMeter.style.width = `${percentage}%`;

    if (percentage < 30) {
        strengthMeter.style.backgroundColor = "var(--danger)";
    } else if (percentage < 60) {
        strengthMeter.style.backgroundColor = "var(--warning)";
    } else if (percentage < 80) {
        strengthMeter.style.backgroundColor = "#3b82f6";
    } else {
        strengthMeter.style.backgroundColor = "var(--success)";
    }
}

// Initialize
updateStrengthMeter();
