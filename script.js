document.addEventListener('DOMContentLoaded', () => {
  const signUpBtn = document.getElementById('signUpButton');
  const signInBtn = document.getElementById('signInButton');
  const signupScreen = document.getElementById('signup');
  const signInScreen = document.getElementById('signIn');

  function showSignup() {
    if (signupScreen) signupScreen.style.display = 'block';
    if (signInScreen) signInScreen.style.display = 'none';
    window.scrollTo(0, 0);
  }

  function showSignIn() {
    if (signupScreen) signupScreen.style.display = 'none';
    if (signInScreen) signInScreen.style.display = 'block';
    window.scrollTo(0, 0);
  }

  if (signUpBtn) {
    signUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSignup();
    });
  }

  if (signInBtn) {
    signInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSignIn();
    });
  }

  // If the page should start on sign-in, ensure sign-in is visible
  if (signInScreen && signUpBtn && window.location.hash === '#signup') {
    showSignup();
  }
});
