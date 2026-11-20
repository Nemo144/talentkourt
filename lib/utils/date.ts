// Same output on the server and in the browser, so React never sees a mismatch.
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
) =>
  new Date(date).toLocaleDateString("en-US", {
    ...options,
    timeZone: "UTC",
  });
