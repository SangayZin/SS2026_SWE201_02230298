export function formatDate(value) {
  if (!value) {
    return 'No date set';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTaskCount(count) {
  return `${count} task${count === 1 ? '' : 's'}`;
}
