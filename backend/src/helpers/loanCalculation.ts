export default function loanCalculation(value: string | null): string {
  if (value !== "" || value !== null)
    return String(Math.ceil(Number(value)) * 0.01 * 500);
  return value;
}
