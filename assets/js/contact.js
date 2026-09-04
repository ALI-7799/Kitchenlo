/**
 * Contact form: inline validation with accessible per-field errors.
 *
 * There is no mail backend yet, so a valid submission is queued in local
 * storage and the form says so plainly rather than pretending it was sent.
 */
(function () {
  'use strict';

  var UI = window.KitchenloUI;
  var form = document.getElementById('contactForm');
  if (!UI || !form) return;

  var RULES = [
    {
      id: 'contactName',
      validate: function (value) {
        if (!value.trim()) return 'Please enter your name.';
        if (value.trim().length < 2) return 'That name looks too short.';
        return '';
      }
    },
    {
      id: 'contactEmail',
      validate: function (value) {
        if (!value.trim()) return 'Please enter your email address.';
        if (!UI.isEmail(value)) return 'That does not look like a valid email address.';
        return '';
      }
    },
    {
      id: 'contactMessage',
      validate: function (value) {
        if (!value.trim()) return 'Please write a message.';
        if (value.trim().length < 10) return 'Please add a little more detail (10 characters or more).';
        return '';
      }
    }
  ];

  function validateField(rule) {
    var field = document.getElementById(rule.id);
    if (!field) return true;
    return UI.setFieldError(rule.id, rule.validate(field.value));
  }

  // Validate on blur, then live once a field has already been flagged.
  RULES.forEach(function (rule) {
    var field = document.getElementById(rule.id);
    if (!field) return;

    field.addEventListener('blur', function () {
      validateField(rule);
    });

    field.addEventListener('input', function () {
      if (field.closest('.field').classList.contains('has-error')) validateField(rule);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var valid = RULES.map(validateField).every(Boolean);

    if (!valid) {
      UI.setStatus(form, 'Please fix the highlighted fields.', 'error');
      var firstError = form.querySelector('.field.has-error input, .field.has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    var submission = {
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      topic: document.getElementById('contactTopic').value,
      message: document.getElementById('contactMessage').value.trim(),
      sentAt: new Date().toISOString()
    };

    try {
      var queue = JSON.parse(localStorage.getItem('kitchenlo-messages') || '[]');
      queue.push(submission);
      localStorage.setItem('kitchenlo-messages', JSON.stringify(queue));
    } catch (e) {
      /* storage being unavailable should not block the confirmation */
    }

    UI.setStatus(
      form,
      'Thanks, ' + submission.name.split(' ')[0] + '. Your message is saved locally — email us directly to be sure it reaches us.',
      'success'
    );

    form.reset();
    UI.clearErrors(form);
  });
})();
