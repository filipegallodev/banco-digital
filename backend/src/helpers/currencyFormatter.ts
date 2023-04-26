import { Prisma } from "@prisma/client";

export default function currencyFormatter(
  locale: string,
  currency: string,
  userBalance: Prisma.Decimal | string | undefined
) {
  return Number(userBalance).toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
