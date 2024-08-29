class TransactionsAPI {
  baseUrl: string;

  constructor(baseURL) {
    this.baseURL = baseURL || "https://digitalmoney.digitalhouse.com";
  }

  async getAllTransactions(accountId) {
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
    return response.json();
  }

  async createTransaction(accountId, transactionData) {
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
    return response.json();
  }

  async getTransaction(accountId, transactionId) {
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
    return response.json();
  }
}

export const transactionsAPI = new TransactionsAPI();
