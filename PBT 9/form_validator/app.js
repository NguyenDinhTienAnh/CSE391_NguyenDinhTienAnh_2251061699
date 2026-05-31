// ==================== FORM VALIDATOR ====================

// Form elements
const form = document.querySelector('#registerForm');
const fullNameInput = document.querySelector('#fullName');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');
const phoneInput = document.querySelector('#phone');
const submitBtn = document.querySelector('#submitBtn');
const successModal = document.querySelector('#successModal');
const closeSuccessBtn = document.querySelector('#closeSuccessBtn');

// Validation regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

// Validation state
const validationState = {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
});

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Real-time validation
    fullNameInput.addEventListener('input', validateFullName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    phoneInput.addEventListener('input', formatPhoneNumber);
    phoneInput.addEventListener('blur', validatePhone);

    // Form submission
    form.addEventListener('submit', handleSubmit);

    // Close modal
    closeSuccessBtn.addEventListener('click', closeSuccessModal);
}

// ==================== VALIDATION FUNCTIONS ====================

function validateFullName() {
    const value = fullNameInput.value.trim();
    const errorEl = fullNameInput.closest('.form-group').querySelector('.error-message');
    const statusIcon = fullNameInput.closest('.form-group').querySelector('.status-icon');

    if (!value) {
        validationState.fullName = false;
        showError(fullNameInput, errorEl, statusIcon, 'Full name is required');
        return;
    }

    if (value.length < 2) {
        validationState.fullName = false;
        showError(fullNameInput, errorEl, statusIcon, 'Name must be at least 2 characters');
        return;
    }

    if (value.length > 50) {
        validationState.fullName = false;
        showError(fullNameInput, errorEl, statusIcon, 'Name must not exceed 50 characters');
        return;
    }

    validationState.fullName = true;
    showSuccess(fullNameInput, errorEl, statusIcon);
    updateSubmitButton();
}

function validateEmail() {
    const value = emailInput.value.trim();
    const errorEl = emailInput.closest('.form-group').querySelector('.error-message');
    const statusIcon = emailInput.closest('.form-group').querySelector('.status-icon');

    if (!value) {
        validationState.email = false;
        showError(emailInput, errorEl, statusIcon, 'Email is required');
        return;
    }

    if (!EMAIL_REGEX.test(value)) {
        validationState.email = false;
        showError(emailInput, errorEl, statusIcon, 'Please enter a valid email address');
        return;
    }

    validationState.email = true;
    showSuccess(emailInput, errorEl, statusIcon);
    updateSubmitButton();
}

function validatePassword() {
    const value = passwordInput.value;
    const errorEl = passwordInput.closest('.form-group').querySelector('.error-message');
    const statusIcon = passwordInput.closest('.form-group').querySelector('.status-icon');
    const strengthBar = document.querySelector('#strengthBar');
    const strengthText = document.querySelector('#strengthText');
    const requirementsList = document.querySelector('.requirements-list');
    const requirementItems = document.querySelectorAll('.requirement-item');

    // Show/hide requirements list
    if (value.length > 0) {
        requirementsList.classList.add('show');
    } else {
        requirementsList.classList.remove('show');
    }

    // Clear previous state
    requirementItems.forEach(item => item.classList.remove('met'));
    strengthBar.className = 'strength-bar';

    if (!value) {
        validationState.password = false;
        showError(passwordInput, errorEl, statusIcon, 'Password is required');
        return;
    }

    let strength = 0;
    const requirements = [
        { regex: /.{8,}/, index: 0 },           // At least 8 characters
        { regex: /[A-Z]/, index: 1 },           // Uppercase
        { regex: /[a-z]/, index: 2 },           // Lowercase
        { regex: /\d/, index: 3 },              // Number
        { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, index: 4 } // Special char
    ];

    requirements.forEach(req => {
        if (req.regex.test(value)) {
            strength++;
            requirementItems[req.index].classList.add('met');
        }
    });

    // Determine password strength
    if (strength < 3) {
        validationState.password = false;
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Password strength: Weak';
        strengthText.className = 'weak';
        showError(passwordInput, errorEl, statusIcon, 'Password is too weak');
    } else if (strength === 3 || strength === 4) {
        validationState.password = true;
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Password strength: Medium';
        strengthText.className = 'medium';
        showSuccess(passwordInput, errorEl, statusIcon);
    } else {
        validationState.password = true;
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Password strength: Strong';
        strengthText.className = 'strong';
        showSuccess(passwordInput, errorEl, statusIcon);
    }

    // Re-validate confirm password if it has a value
    if (confirmPasswordInput.value) {
        validateConfirmPassword();
    }

    updateSubmitButton();
}

function validateConfirmPassword() {
    const passwordValue = passwordInput.value;
    const confirmValue = confirmPasswordInput.value;
    const errorEl = confirmPasswordInput.closest('.form-group').querySelector('.error-message');
    const statusIcon = confirmPasswordInput.closest('.form-group').querySelector('.status-icon');

    if (!confirmValue) {
        validationState.confirmPassword = false;
        showError(confirmPasswordInput, errorEl, statusIcon, 'Please confirm your password');
        return;
    }

    if (passwordValue !== confirmValue) {
        validationState.confirmPassword = false;
        showError(confirmPasswordInput, errorEl, statusIcon, 'Passwords do not match');
        return;
    }

    validationState.confirmPassword = true;
    showSuccess(confirmPasswordInput, errorEl, statusIcon);
    updateSubmitButton();
}

function validatePhone() {
    const value = phoneInput.value.replace(/-/g, '');
    const errorEl = phoneInput.closest('.form-group').querySelector('.error-message');
    const statusIcon = phoneInput.closest('.form-group').querySelector('.status-icon');

    if (!value) {
        validationState.phone = false;
        showError(phoneInput, errorEl, statusIcon, 'Phone number is required');
        return;
    }

    if (!PHONE_REGEX.test(value)) {
        validationState.phone = false;
        showError(phoneInput, errorEl, statusIcon, 'Phone must be 10 digits');
        return;
    }

    validationState.phone = true;
    showSuccess(phoneInput, errorEl, statusIcon);
    updateSubmitButton();
}

// ==================== FORMATTING ====================

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
    
    if (value.length > 10) {
        value = value.slice(0, 10);
    }

    // Format as XXX-XXX-XXXX or similar
    if (value.length <= 3) {
        e.target.value = value;
    } else if (value.length <= 6) {
        e.target.value = value.slice(0, 3) + '-' + value.slice(3);
    } else {
        e.target.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
    }

    // Validate phone if full
    if (value.length === 10) {
        validatePhone();
    }
}

// ==================== UI HELPERS ====================

function showSuccess(input, errorEl, statusIcon) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    statusIcon.classList.add('show');
    errorEl.classList.remove('show');
}

function showError(input, errorEl, statusIcon, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    statusIcon.classList.add('show');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

function updateSubmitButton() {
    const allValid = Object.values(validationState).every(v => v === true);
    submitBtn.disabled = !allValid;
}

// ==================== FORM SUBMISSION ====================

function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields one more time
    validateFullName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validatePhone();

    // Check if all valid
    const allValid = Object.values(validationState).every(v => v === true);
    if (!allValid) {
        alert('Please fix the errors in the form');
        return;
    }

    // Show success modal
    showSuccessModal();

    // Reset form
    form.reset();
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    document.querySelectorAll('.status-icon').forEach(icon => {
        icon.classList.remove('show');
    });
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.classList.remove('show');
    });
    document.querySelector('.strength-bar').className = 'strength-bar';
    document.querySelector('.requirements-list').classList.remove('show');

    // Reset validation state
    Object.keys(validationState).forEach(key => {
        validationState[key] = false;
    });
    updateSubmitButton();
}

// ==================== SUCCESS MODAL ====================

function showSuccessModal() {
    document.querySelector('#successName').textContent = fullNameInput.value;
    document.querySelector('#successEmail').textContent = emailInput.value;
    document.querySelector('#successPhone').textContent = phoneInput.value;
    successModal.classList.add('show');
}

function closeSuccessModal() {
    successModal.classList.remove('show');
}
