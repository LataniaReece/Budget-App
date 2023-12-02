export type Card = {
  nameOnCard: string;
  type: string;
  expDate: string;
  lastFourDigits: string;
};

export type User = {
  name: string;
  cards?: Card[];
};
