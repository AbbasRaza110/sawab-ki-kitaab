import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const name = "Abbas Raza";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>abbas@example.com</Text>
        </View>
      </View>

      {/* Options */}
      <View style={styles.flexOneBetween}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.option, styles.logout]}
            onPress={() => router.replace("/(auth)/sign_in")}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  flexOneBetween: { flex: 1, justifyContent: "space-between" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2f855a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  initials: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "bold", color: "#22543d" },
  email: { color: "#555" },
  optionsContainer: { gap: 10 },
  option: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#c6f6d5",
    borderRadius: 8,
    backgroundColor: "#f0fdf4",
  },
  optionText: { color: "#22543d", fontWeight: "600", textAlign: "center" },
  logout: { backgroundColor: "#c53030", borderColor: "#c53030" },
  logoutText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
