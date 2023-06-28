interface ICard {
  id: string;
  type: string;
  number: string;
  cvv: string;
  owner: string;
  validity: Date;
  invoiceClosing: string;
  requestedAt: Date;
  accountId: string;
  hidden: boolean;
}

interface ICardForm {
  type: string;
  validity: Date;
  number: string;
  owner: string;
  invoiceClosing: string;
}
