/**
 * Contact form: inline validation with accessible per-field errors.
 *
 * There is no mail backend yet, so a valid submission is queued in local
 * storage and the form says so plainly rather than pretending it was sent.
 */
import { $, clearErrors, isEmail, setFieldError, setStatus } from '../dom.js';

const form = $<HTMLFormElement>('#contactForm');

if (form) {
  const rules: { id: string; validate: (value: string) => string }[] = [
    {
      id: 'contactName',
      validate: (value) => {
        if (!value.trim()) return 'Please enter your name.';
        if (value.trim().length < 2) return 'That name looks too short.';
        return '';
      }
    },
    {
      id: 'contactEmail',
      validate: (value) => {
        if (!value.trim()) return 'Please enter your email address.';
        if (!isEmail(value)) return 'That does not look like a valid email address.';
        return '';
      }
    },
    {
      id: 'contactMessage',
      validate: (value) => {
        if (!value.trim()) return 'Please write a message.';
        if (value.trim().length < 10) return 'Please add a little more detail (10 characters or more).';
        return '';
      }
    }
  ];

  const field = (id: string) => document.getElementById(id) as HTMLInputElement | null;
  const validate = (rule: (typeof rules)[number]) =>
    setFieldError(rule.id, rule.validate(field(rule.id)?.value ?? ''));

  // Validate on blur, then live once a field has already been flagged.
  for (const rule of rules) {
    const el = field(rule.id);
    if (!el) continue;
    el.addEventListener('blur', () => validate(rule));
    el.addEventListener('input', () => {
      if (el.closest('.field')?.classList.contains('has-error')) validate(rule);
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // map before every, so all fields are marked rather than just the first.
    const valid = rules.map(validate).every(Boolean);

    if (!valid) {
      setStatus(form, 'Please fix the highlighted fields.', 'error');
      form.querySelector<HTMLElement>('.field.has-error input, .field.has-error textarea')?.focus();
      return;
    }

    const submission = {
      name: field('contactName')!.value.trim(),
      email: field('contactEmail')!.value.trim(),
      topic: (document.getElementById('contactTopic') as HTMLSelectElement).value,
      message: (document.getElementById('contactMessage') as HTMLTextAreaElement).value.trim(),
      sentAt: new Date().toISOString()
    };

    try {
      const queue = JSON.parse(localStorage.getItem('kitchenlo-messages') ?? '[]') as unknown[];
      queue.push(submission);
      localStorage.setItem('kitchenlo-messages', JSON.stringify(queue));
    } catch {
      /* storage being unavailable should not block the confirmation */
    }

    setStatus(
      form,
      `Thanks, ${submission.name.split(' ')[0]}. Your message is saved locally — email us directly to be sure it reaches us.`,
      'success'
    );

    form.reset();
    clearErrors(form);
  });
}
