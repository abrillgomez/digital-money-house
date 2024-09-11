import axios from "axios";

const BASE_URL = "https://digitalmoney.digitalhouse.com/api/accounts";

export class TransferencesService {
  private accountId: number;
  private token: string; // Añadimos una variable para el token

  constructor(accountId: number, token: string) {
    this.accountId = accountId;
    this.token = token; // Almacenamos el token
  }

  // Obtener todas las transferencias relacionadas con una cuenta
  async getTransferences() {
    try {
      const response = await axios.get(
        `${BASE_URL}/${this.accountId}/transferences`,
        {
          headers: {
            Authorization: `${this.token}`, // Añadimos el token en los headers
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching transferences", error);
      throw error;
    }
  }

  // Crear una nueva transferencia para la cuenta
  async createTransference(transferenceData: {
    amount: number;
    destination: string;
  }) {
    try {
      const response = await axios.post(
        `${BASE_URL}/${this.accountId}/transferences`,
        transferenceData,
        {
          headers: {
            Authorization: `${this.token}`, // Añadimos el token en los headers
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating transference", error);
      throw error;
    }
  }

  // Crear un nuevo depósito para la cuenta
  async createDeposit(depositData: {
    amount: number;
    dated: string;
    destination: string;
    origin: string;
  }) {
    try {
      const response = await axios.post(
        `${BASE_URL}/${this.accountId}/deposits`,
        depositData,
        {
          headers: {
            Authorization: `${this.token}`, // Añadimos el token en los headers
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating deposit", error);
      throw error;
    }
  }
}
