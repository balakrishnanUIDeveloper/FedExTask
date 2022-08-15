export const FORM_FIELDS_LABELS = {
  first_name: { label: 'First Name*', error: 'Please enter Valid Firstname' },
  last_name: { label: 'Last Name*', error: 'Please enter Valid Lastname' },
  email: { label: 'Email*', error: 'Please enter Valid email' },
  password: {
    label: 'Password*',
    error: 'Please enter Valid password',
    no_name_error: "Password Should not contain user's first or last name.",
    confirm_password: 'confirm password Should be as same as the password',
    error_list: [
      'Should be a minimum of eight characters',
      'Should contain lower and uppercase letters',
      "Should not contain user's first or last name."
    ]
  },
  form: {
    error: 'Please enter all required fields',
    endpoint_error: 'Something went wrong, try again later',
    title: 'Sign Up',
    sub_title: 'Please fill in this form to create an account!'
  }
};
