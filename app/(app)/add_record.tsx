import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddRecordScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Please enter a name");
      return;
    }

    // Navigate back with data
    router.replace({
      pathname: "/(app)/kitaab",
      params: { newName: title },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Record</Text>

      <TextInput
        placeholder="Enter Person Name"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2f855a",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2f855a",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
