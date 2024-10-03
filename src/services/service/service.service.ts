import axios from "axios";

const API_URL = "https://digitalmoney.digitalhouse.com/service";

export class ServiceAPI {
  static async getAllServiceIds() {
    try {
      const response = await axios.get(`${API_URL}`);
      const services = response.data;
      return services;
    } catch (error) {
      console.error("Error fetching all services", error);
      throw error;
    }
  }

  static async getServiceById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching service with id ${id}`, error);
      throw error;
    }
  }

  static async getServicesByQuery(query: string) {
    try {
      const response = await axios.get(`${API_URL}/${query}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching services with query ${query}`, error);
      throw error;
    }
  }
}
