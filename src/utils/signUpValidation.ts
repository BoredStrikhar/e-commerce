export enum PasswordStrength {
  InvalidLength = 'InvalidLength',
  InvalidSymbols = 'InvalidSymbols',
  Weak = 'Weak',
  Medium = 'Medium',
  Strong = 'Strong',
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (password.length < 4) {
    return PasswordStrength.InvalidLength;
  }
  if (password.match(/[$@#&!%^*()]+/)) {
    return PasswordStrength.InvalidSymbols;
  }
  let strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }

  switch (strength) {
    case 2:
      return PasswordStrength.Medium;
    case 3:
      return PasswordStrength.Strong;
    default:
      return PasswordStrength.Weak;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailValidationRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailValidationRegexp.test(email);
};
