import apiClient from "@/services/apiService";
import { goBack } from "expo-router/build/global-state/routing";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDeedResolver } from "./AddDeedSchema";

export type AddDeedFormValues = {
  selectedType: number;
  notes: string;
  amount: number;
};

const useAddDeed = () => {
  const { control, handleSubmit, reset, watch } = useForm<AddDeedFormValues>({
    defaultValues: {
      selectedType: 0,
      notes: "",
      amount: 1,
    },
    resolver: addDeedResolver,
  });

  const [isLoading, setIsLoading] = useState(false); // Keep loading as separate state

  const onSubmit = async (data: AddDeedFormValues) => {
    const payload = {
      type: data.selectedType,
      notes: data.notes,
      amount: data.amount,
    };
    try {
      setIsLoading(true);
      const response = await apiClient.post("/deeds/create", payload);
      console.log("response deeds", response);
      if (response.status === 201 || response.status === 200) {
        goBack();
      }
    } catch (error) {
      console.log("create Deeds Failed", error);
    } finally {
      setIsLoading(false);
      reset(); // reset form after submit
    }
  };

  const handleBackPress = () => goBack();

  return {
    control,
    handleSubmit,
    onSubmit,
    handleBackPress,
    watch,
    isLoading,
  };
};

export default useAddDeed;
