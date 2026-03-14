export const formatDateTime = (date: string) => {
  const formatted = new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const [d, t] = formatted.split(",");

  return {
    date: d?.trim(),
    time: t?.trim(),
  };
};
