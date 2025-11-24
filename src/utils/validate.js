
export function validateRequired(obj, requiredFields) {
  for (const field of requiredFields) {
    const value = obj[field];

    if (value === undefined || value === null || value === "") {
      throw new Error(`${field} is required`);
    }
  }
}

export function validateString(obj, stringFields) {
  for (const field of stringFields) {
    if (typeof obj[field] !== "string") {
      throw new Error(`${field} must be a string`);
    }
  }
}

export function validateNumber(obj, numericFields) {
  for (const field of numericFields) {
    const value = obj[field];
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new Error(`${field} must be a valid number`);
    }
  }
}

export function validateInteger(obj, fields) {
  for (const field of fields) {
    const value = obj[field];

    if (!Number.isInteger(value)) {
      throw new Error(`${fields} must be an integer`);
    }
  }
}

export function validatePositive(obj, positiveFields) {
  for (const field of positiveFields) {
    if (obj[field] <= 0) {
      throw new Error(`${field} must be > 0`);
    }
  }
}

export function validateRange(obj, field, min, max) {
  const value = obj[field];
  if (value < min || value > max) {
    throw new Error(`${field} must be between ${min} and ${max}`);
  }
}

export function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    throw new Error("email must be a valid email address");
  }
}

export function validateUsername(username) {
  const regex = /^[a-zA-Z0-9._]{3,}$/;
  if (!regex.test(username)) {
    throw new Error(
      "Username must be at least 3 characters and contain only letters, numbers, dots, or underscores"
    );
  }
}

export function validatePassword(password) {
  if (password.length < 8) {
    throw new Error("password must be at least 8 characters long");
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLetter || !hasNumber) {
    throw new Error("password must contain both letters and numbers");
  }
}

export function validateName(name) {
  const regex = /^[A-Za-z\s]{2,}$/;
  if (!regex.test(name)) {
    throw new Error("name must be at least 2 characters and contain only letters and spaces");
  }
}

export function validatePhone(phoneNumber) {
  const regex = /^(\+?\d{1,3})?[\s-]?(\(?\d{3}\)?)[\s-]?\d{3}[\s-]?\d{4}$/;

  if (!regex.test(phoneNumber)) {
    throw new Error("phoneNumber must be a valid phone number format")
  }
}

export function validateId({id, message = "Id is required"}) {
  if (!id || String(id).trim() === "") {
    return res.status(400).json({ error: message })
  }
}
