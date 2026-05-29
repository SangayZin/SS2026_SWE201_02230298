export function validateAuthForm(values) {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password?.trim()) {
    errors.password = 'Password is required.';
  } else if (values.password.trim().length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

function isValidDueDate(value) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return false;
  }

  const isoDateMatch = trimmedValue.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/);

  if (isoDateMatch) {
    const year = Number(isoDateMatch[1]);
    const month = Number(isoDateMatch[2]);
    const day = Number(isoDateMatch[3]);
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }

  const date = new Date(trimmedValue);
  return !Number.isNaN(date.getTime());
}

export function normalizeDueDate(value) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return trimmedValue;
  }

  const dateMatch = trimmedValue.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/);

  if (!dateMatch) {
    return trimmedValue;
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return trimmedValue;
  }

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
    date.getUTCDate(),
  ).padStart(2, '0')}`;
}

export function validateTaskForm(values) {
  const errors = {};

  if (!values.title?.trim()) {
    errors.title = 'Title is required.';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  } else if (values.title.trim().length > 60) {
    errors.title = 'Title must be 60 characters or fewer.';
  }

  if (!values.description?.trim()) {
    errors.description = 'Description is required.';
  } else if (values.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  } else if (values.description.trim().length > 300) {
    errors.description = 'Description must be 300 characters or fewer.';
  }

  if (!values.dueDate?.trim()) {
    errors.dueDate = 'Due date is required.';
  } else if (!isValidDueDate(values.dueDate)) {
    errors.dueDate = 'Enter a valid due date.';
  }

  if (!values.categoryId) {
    errors.categoryId = 'Pick a category.';
  }

  if (!values.status) {
    errors.status = 'Pick a status.';
  }

  if (!values.priority) {
    errors.priority = 'Pick a priority.';
  }

  return errors;
}
