document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('registerForm');
  const message = document.getElementById('message');

  function setError(field, text){
    const el = form.querySelector(`small.error[data-for="${field}"]`);
    if(el) el.textContent = text || '';
  }

  function validatePasswords(pw, pw2){
    if(pw !== pw2){
      setError('confirmPassword','Passwords do not match');
      return false;
    }
    setError('confirmPassword','');
    return true;
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    message.textContent = '';

    // Clear previous errors
    ['fullName','username','email','password','confirmPassword','phone','terms'].forEach(f=>setError(f,''));

    const data = {
      fullName: form.fullName.value.trim(),
      username: form.username.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      dob: form.dob.value,
      phone: form.phone.value.trim(),
      terms: form.terms.checked
    };

    let valid = true;

    if(!data.fullName) { setError('fullName','Please enter your name'); valid = false }
    if(!data.username.match(/^[a-zA-Z0-9_-]{3,15}$/)){ setError('username','Invalid username'); valid = false }
    if(!data.email) { setError('email','Please enter your email'); valid = false }
    if(data.password.length < 8){ setError('password','Password too short'); valid = false }
    if(!validatePasswords(data.password, form.confirmPassword.value)){ valid = false }
    if(!data.terms){ setError('terms','You must accept the terms'); valid = false }

    if(!valid){ message.textContent = 'Please fix the errors above.'; return }

    // Demo: save user to localStorage
    try{
      const store = JSON.parse(localStorage.getItem('users')||'[]');
      // Remove password in list preview? For demo we'll store hashed-like placeholder (do NOT use this in production)
      const user = {fullName:data.fullName,username:data.username,email:data.email,dob:data.dob,phone:data.phone,createdAt:new Date().toISOString()};
      store.push(user);
      localStorage.setItem('users', JSON.stringify(store));
      message.style.color = 'green';
      message.textContent = 'Account created (demo). You can inspect localStorage to see saved users.';
      form.reset();
    }catch(err){
      message.style.color = 'red';
      message.textContent = 'Saving failed: '+err.message;
    }
  });
});
