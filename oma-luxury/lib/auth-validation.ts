const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*\d).{8,}$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string) {
  if (!EMAIL_PATTERN.test(normalizeEmail(email))) {
    throw new Error("Enter a valid email address.");
  }
}

export function validatePassword(password: string) {
  if (!PASSWORD_PATTERN.test(password)) {
    throw new Error("Password must be at least 8 characters long and include at least 1 number.");
  }
}

export function validateRegistrationInput(name: string, email: string, password: string) {
  if (!name.trim()) {
    throw new Error("Full name is required.");
  }
  validateEmail(email);
  validatePassword(password);
}

export function validateLoginInput(email: string, password: string) {
  validateEmail(email);
  if (!password.trim()) {
    throw new Error("Password is required.");
  }
}

export function validatePasswordResetInput(email: string) {
  validateEmail(email);
}

export function validateProfileInput(name: string, email: string) {
  if (!name.trim()) {
    throw new Error("Full name is required.");
  }
  validateEmail(email);
}
