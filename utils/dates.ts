const formatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short"
});

export function formatShortDate(date?: string): string {
  if (!date) {
    return "A definir";
  }

  return formatter.format(new Date(date));
}

export function daysUntil(date?: string): number | undefined {
  if (!date) {
    return undefined;
  }

  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
