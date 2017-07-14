export const required = value => (value ? undefined : 'Required');

export const minLength = min => value =>
  value.length >= min ? undefined : `Minimum ${min} characters required`;

export const maxLength = max => value =>
  value.length <= max ? undefined : `Maximum ${max} characters allowed`;

export const min15 = minLength(10);
export const max100 = maxLength(100);

const category = ['react', 'redux', 'udacity'];
export const isFromCategory = value =>
  category.includes(value)
    ? undefined
    : `Category should be from following: ${category.join(', ')}`;
