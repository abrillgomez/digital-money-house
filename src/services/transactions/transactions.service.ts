class TransactionsAPI {
  baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_BASE_URL!) {
    this.baseURL = baseURL;
  }

  async getAllTransactions(accountId: number) {
    const response = await fetch(
      `${this.baseURL}/api/accounts/${accountId}/activity`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching transactions: ${response.status}`);
    }
    return response.json();
  }

  async createTransaction(accountId: string, transactionData: object) {
    const response = await fetch(
      `${this.baseURL}/api/accounts/${accountId}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(transactionData),
      }
    );
    if (!response.ok) {
      throw new Error(`Error creating transaction: ${response.status}`);
    }
    return response.json();
  }

  async getTransaction(accountId: string, transactionId: string) {
    const response = await fetch(
      `${this.baseURL}/api/accounts/${accountId}/transactions/${transactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching transaction: ${response.status}`);
    }
    return response.json();
  }
}

export const transactionsAPI = new TransactionsAPI();
