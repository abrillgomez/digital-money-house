export interface Card {
  account_id: number;
  cod: number;
  expiration_date: string;
  first_last_name: string;
  id: number;
  number_id: number;
}

export interface UserWithCards {
  user_id: number;
  name: string;
  cards: Card[];
}
