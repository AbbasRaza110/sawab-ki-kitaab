import apiClient from "@/services/apiService";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export type KitaabTotals = {
  sawab: number;
  gunah: number;
  todayGunah: number;
  todaySawab: number;
};

export default function useKitaab() {
  const [isLoading, setIsLoading] = useState(false);
  const [totals, setTotals] = useState<KitaabTotals | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchTotals = async () => {
        try {
          setIsLoading(true);
          const response = await apiClient.get("/deeds/totals");
          console.log("response deeds", response.data);
          if (response.status === 200 || response.status === 201) {
            setTotals(response.data);
          }
        } catch (error) {
          console.error("Fetching Kitaab totals failed", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTotals();
    }, [])
  );

  return { totals, isLoading };
}
