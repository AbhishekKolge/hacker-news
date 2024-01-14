const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'long',
  timeStyle: 'short',
});

const formatSecondsToDate = (time: number) => {
  const date: Date = new Date(time * 1000);
  return dateFormatter.format(date);
};

export { formatSecondsToDate };
