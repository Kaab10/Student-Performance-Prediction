(function () {
  var form = document.getElementById('predict-form');
  if (!form) return;

  var fields = [
    { id: 'attendance', min: 0, max: 100, label: 'Attendance' },
    { id: 'study_hours', min: 0, max: 24, label: 'Study hours' },
    { id: 'previous_marks', min: 0, max: 100, label: 'Previous marks' }
  ];

  function syncOutput(id, value) {
    var out = document.getElementById(id + '-out');
    if (!out) return;
    out.textContent = value === '' || value === null || Number.isNaN(Number(value))
      ? '—'
      : Number(value).toFixed(1);
  }

  function setError(id, message) {
    var input = document.getElementById(id);
    var field = input && input.closest('.field');
    var err = form.querySelector('.field-error[data-for="' + id + '"]');
    if (field) field.classList.toggle('is-invalid', Boolean(message));
    if (err) {
      err.hidden = !message;
      err.textContent = message || '';
    }
  }

  function validateField(spec) {
    var input = document.getElementById(spec.id);
    var raw = input.value.trim();
    if (raw === '') {
      setError(spec.id, spec.label + ' is required.');
      return false;
    }
    var value = Number(raw);
    if (Number.isNaN(value)) {
      setError(spec.id, 'Enter a valid number.');
      return false;
    }
    if (value < spec.min || value > spec.max) {
      setError(spec.id, 'Must be between ' + spec.min + ' and ' + spec.max + '.');
      return false;
    }
    setError(spec.id, '');
    return true;
  }

  fields.forEach(function (spec) {
    var input = document.getElementById(spec.id);
    if (!input) return;
    syncOutput(spec.id, input.value);
    input.addEventListener('input', function () {
      syncOutput(spec.id, input.value);
      var mirror = form.querySelector('.range-mirror[data-target="' + spec.id + '"]');
      if (mirror && input.value !== '') mirror.value = input.value;
      validateField(spec);
    });
  });

  form.querySelectorAll('.range-mirror').forEach(function (slider) {
    slider.addEventListener('input', function () {
      var target = document.getElementById(slider.getAttribute('data-target'));
      if (!target) return;
      target.value = slider.value;
      target.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  form.addEventListener('submit', function (event) {
    var formError = document.getElementById('form-error');
    var ok = fields.every(validateField);
    if (!ok) {
      event.preventDefault();
      if (formError) {
        formError.hidden = false;
        formError.textContent = 'Fix the highlighted fields before running a prediction.';
      }
      return;
    }
    if (formError) formError.hidden = true;
  });
})();
