interface ICard {
  id: string;
  type: string;
  number: string;
  validity: Date;
  invoiceClosing: string;
  requestedAt: Date;
  accountId: string;
}

interface ICardForm {
  type: string;
  validity: Date;
  number: string;
  owner: string;
  invoiceClosing: string;
}
