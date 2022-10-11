const ConfirmSignUpEmail = ({ link, email }) => {
  return `<h1>Hello ${email}  & welcome to Cowlculator!</h1>
  <p>Your registration  has been successfully saved. To use all the features of Cowlculator, we invite you to confirm your email address:</p>
  <a href=${link}><strong> Confirm my email address</strong></a>
  <p>If you are not at the origin of this request, please ignore this email & contact our support: cowlculator@gmail.com </p>`;
};
module.exports = ConfirmSignUpEmail;
