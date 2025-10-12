import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Board() {
  const people = [
    { id: "1", name: "Ali", sawab: 5, gunah: 2 },
    { id: "2", name: "Fatima", sawab: 3, gunah: 6 },
    { id: "3", name: "Usman", sawab: 8, gunah: 4 },
  ];

  // Calculate scores and sort descending
  const results = people
    .map((p) => ({
      ...p,
      score: p.sawab - p.gunah,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Sawab & Gunah Board</Text>
      <Text style={styles.subtitle}>
        Ranking based on good vs bad deeds balance
      </Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.score}>Score: {item.score}</Text>
            </View>

            <View style={styles.deedsRow}>
              <Text style={styles.sawab}>Sawab: {item.sawab}</Text>
              <Text style={styles.gunah}>Gunah: {item.gunah}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2f855a",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: 13,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f0fdf4",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d1fae5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  rank: { fontWeight: "bold", color: "#22543d", fontSize: 16 },
  name: { fontWeight: "bold", color: "#22543d", fontSize: 16 },
  score: { color: "#22543d", fontWeight: "500" },
  deedsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  sawab: { color: "#38a169", fontWeight: "600" },
  gunah: { color: "#c53030", fontWeight: "600" },
});
