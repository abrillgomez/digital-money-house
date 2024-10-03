import { UserData, UserType } from "@/types/users.types";

class UserAPI {
  newUser = async (data: UserType): Promise<UserData> => {
    try {
      const res = await fetch(
        `https://digitalmoney.digitalhouse.com/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(`Error ${res.status}: ${errorDetails.message}`);
      }
      return res.json();
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  };

  getUserData = async (token: string, id: number): Promise<UserType> => {
    try {
      const res = await fetch(
        `https://digitalmoney.digitalhouse.com/api/users/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      return res.json();
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  };

  updateUserData = async (
    token: string,
    id: number,
    data: object
  ): Promise<UserType> => {
    try {
       const res = await fetch(
        `https://digitalmoney.digitalhouse.com/api/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        }
      )
      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(`Error ${res.status}: ${errorDetails.message}`);
      }
      return res.json();
    } catch (error) {
      console.error("Failed to update user data:", error);
      throw error;
    }
  };
}

const userApi = new UserAPI();
export default userApi;
