import { UserLoginType } from "@/types/users.types";

class AuthAPI {
  async login(data: UserLoginType) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }
      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem("token", token);
      return responseData;
    } catch (error) {
      console.error("Error al hacer login:", error);
      throw error;
    }
  }
}

export default new AuthAPI();
