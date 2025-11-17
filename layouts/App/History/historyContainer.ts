import apiClient from "@/services/apiService";
import { useEffect, useState } from "react";

export default function useHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [deedsHistory, setDeedsHistory] = useState([]);

  const GetDeeds = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get("/deeds");
      if (response.status === 200) {
        setDeedsHistory(response?.data);
      }
    } catch (error) {
      console.log("Get Deeds Failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetDeeds();
    console.log("Deeds:", deedsHistory);
  }, []);

  return {
    deedsHistory,
    isLoading,
  };
}
