// ── Element References ──
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const togglePw = document.getElementById('togglePw');
const toast = document.getElementById('toast');

// ── Validation State ──
const state = { name: false, email: false, password: false };

// ── Helper: Set Field Validity UI ──
function setField(id, valid, errorId, iconId) {
  const input = document.getElementById(id);
  const error = document.getElementById(errorId);
  const icon  = document.getElementById(iconId);

  input.classList.toggle('valid',   valid);
  input.classList.toggle('invalid', !valid && input.value.length > 0);

  error.classList.toggle('show', !valid && input.value.length > 0);

  icon.textContent = valid ? '✓' : (input.value.length > 0 ? '✗' : '');
  icon.style.color = valid ? 'var(--success)' : 'var(--error)';
  icon.classList.toggle('show', input.value.length > 0);
}

// ── Validate Name ──
function validateName() {
  const val = nameInput.value.trim();
  state.name = val.length > 0;
  setField('name', state.name, 'name-error', 'name-icon');
  updateBtn();
}

// ── Validate Email ──
function validateEmail() {
  const val = emailInput.value.trim();
  const re  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  state.email = re.test(val);
  setField('email', state.email, 'email-error', 'email-icon');
  updateBtn();
}

// ── Validate Password ──
function validatePassword() {
  const val = pwInput.value;
  state.password = val.length >= 6;

  const bars  = ['s1','s2','s3','s4'].map(id => document.getElementById(id));
  const label = document.getElementById('strength-label');
  const errEl = document.getElementById('pw-error');

  if (val.length === 0) {
    bars.forEach(b => b.className = '');
    label.textContent = '';
  } else {
    // Score 0–4
    let score = 0;
    if (val.length >= 6)  score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const classes = ['active-weak','active-weak','active-medium','active-strong'];
    const labels  = ['Too short','Weak','Medium','Strong','Very strong'];
    const colors  = ['var(--error)','var(--error)','#fbbf24','var(--success)','var(--success)'];

    bars.forEach((b, i) => b.className = i < score ? classes[score - 1] : '');
    label.textContent  = labels[score];
    label.style.color  = colors[score];
  }

  errEl.classList.toggle('show', !state.password && val.length > 0);
  pwInput.classList.toggle('valid',   state.password);
  pwInput.classList.toggle('invalid', !state.password && val.length > 0);
  updateBtn();
}

// ── Enable / Disable Submit ──
function updateBtn() {
  submitBtn.disabled = !(state.name && state.email && state.password);
}

// ── Event Listeners ──
nameInput.addEventListener('input', validateName);
nameInput.addEventListener('blur',  validateName);

emailInput.addEventListener('input', validateEmail);
emailInput.addEventListener('blur',  validateEmail);

pwInput.addEventListener('input', validatePassword);
pwInput.addEventListener('blur',  validatePassword);

// Toggle password visibility
togglePw.addEventListener('click', () => {
  const isText = pwInput.type === 'text';
  pwInput.type = isText ? 'password' : 'text';
  togglePw.textContent = isText ? '👁' : '🙈';
});

// Form submit
document.getElementById('regForm').addEventListener('submit', (e) => {
  e.preventDefault();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
});