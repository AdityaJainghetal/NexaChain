const normalizeRegisterInput = (body = {}) => {
  const source = body && typeof body === "object" ? body : {};

  const resolveString = (keys) => {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === "string") {
        return value.trim();
      }
    }
    return "";
  };

  const normalized = {
    fullName: resolveString(["fullName", "name", "firstName", "first_name"]),
    email: resolveString(["email", "emailAddress"]).toLowerCase(),
    mobileNumber: resolveString([
      "mobileNumber",
      "mobile",
      "phone",
      "phoneNumber",
      "contactNumber",
    ]),
    password: resolveString(["password", "pass", "passwd"]),
    referralCode: resolveString([
      "referralCode",
      "refCode",
      "referrerCode",
    ]).toUpperCase(),
  };

  const errors = [];

  if (!normalized.fullName) {
    errors.push("fullName is required");
  }

  if (!normalized.email) {
    errors.push("email is required");
  } else if (!/^\S+@\S+\.\S+$/.test(normalized.email)) {
    errors.push("Please provide a valid email");
  }

  if (!normalized.mobileNumber) {
    errors.push("mobileNumber is required");
  }

  if (!normalized.password) {
    errors.push("password is required");
  } else if (normalized.password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  return { normalized, errors };
};

export { normalizeRegisterInput };
export default normalizeRegisterInput;
