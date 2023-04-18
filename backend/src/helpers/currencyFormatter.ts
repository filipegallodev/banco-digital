import { accounts } from "@prisma/client";

export default function currencyFormatter(
  locale: string,
  currency: string,
  userAccount: accounts | null
) {
  return Number(userAccount?.balance).toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
