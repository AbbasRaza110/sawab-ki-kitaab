import { APP_COLORS } from "@/constants/Colors";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CounterInput = ({
  title,
  count,
  setCount,
  addBg = APP_COLORS.primary,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  title: string;
  addBg?: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.counterContainer}>
        <TouchableOpacity
          onPress={() => setCount(Math.max(0, count - 1))}
          style={[styles.circle, { backgroundColor: "#E5E7EB" }]}
        >
          <Text style={styles.symbol}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCount(count + 1)}
          style={[styles.circle, { backgroundColor: addBg as any }]}
        >
          <Text style={[styles.symbol, { color: "#fff" }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  symbol: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
});

export default CounterInput;
