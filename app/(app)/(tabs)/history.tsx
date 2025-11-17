import { APP_COLORS } from "@/constants/Colors";
import useHistory from "@/layouts/App/History/historyContainer";
import {
  ActiveTab,
  HistoryItemProps,
  HistoryItemRecord,
  HistorySection,
  SectionHeaderProps,
  SegmentedControlProps,
} from "@/layouts/App/History/types";
import React, { FC, useMemo, useState } from "react";
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// --- Date Helpers ---
const getDayKey = (isoString: string) => new Date(isoString).toDateString();

const formatTime = (isoString: string) =>
  new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const formatDateSection = (isoString: string) => {
  const date = new Date(isoString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// --- Components ---
const SegmentedControl: FC<SegmentedControlProps> = ({
  activeTab,
  onTabPress,
}) => (
  <View style={styles.tabContainer}>
    {["sawab", "gunah"].map((tab) => (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, activeTab === tab && styles.activeTab]}
        onPress={() => onTabPress(tab as ActiveTab)}
      >
        <Text
          style={[styles.tabText, activeTab === tab && styles.activeTabText]}
        >
          {tab === "sawab" ? "Sawab (Good Deeds)" : "Gunah (Sins)"}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const HistoryItem: FC<HistoryItemProps> = ({ item }) => {
  const isSawab = item.type === 0;
  return (
    <View style={styles.itemCard}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isSawab
              ? APP_COLORS.primaryAppBg
              : APP_COLORS.logoutBg,
          },
        ]}
      >
        <Icon
          name={isSawab ? "heart" : "close"}
          size={22}
          color={isSawab ? APP_COLORS.primary : APP_COLORS.logoutText}
        />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.notes}</Text>
        <Text style={styles.itemSubtitle}>{formatTime(item.createdAt)}</Text>
      </View>
      <Text
        style={[
          styles.itemPoints,
          { color: isSawab ? APP_COLORS.primary : APP_COLORS.logoutText },
        ]}
      >
        {`${isSawab ? "+" : "-"}${item.amount}`}
      </Text>
    </View>
  );
};

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const EmptyListComponent: FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <View style={styles.emptyContainer}>
    {isLoading ? (
      <ActivityIndicator size="large" color={APP_COLORS.primary} />
    ) : (
      <Text style={styles.emptyText}>No history found for this category.</Text>
    )}
  </View>
);

// --- Main Screen ---
const HistoryScreen: FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("sawab");
  const { isLoading, deedsHistory } = useHistory();

  const sections = useMemo<HistorySection[]>(() => {
    const targetType = activeTab === "sawab" ? 0 : 1;
    const filteredData = deedsHistory?.filter(
      (item) => item?.type === targetType
    );

    const groupedData = filteredData.reduce<
      Record<string, HistoryItemRecord[]>
    >((acc, item) => {
      const key = getDayKey(item?.createdAt);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    return Object.keys(groupedData)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map((key) => ({
        title: formatDateSection(key),
        data: groupedData[key],
      }));
  }, [activeTab, deedsHistory]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <SegmentedControl activeTab={activeTab} onTabPress={setActiveTab} />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <HistoryItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        ListEmptyComponent={<EmptyListComponent isLoading={isLoading} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: APP_COLORS.background },
  container: { flex: 1, padding: 16, gap: 24 },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: APP_COLORS.text,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: APP_COLORS.inputBackground,
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: APP_COLORS.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tabText: { color: APP_COLORS.lightText, fontWeight: "600", fontSize: 14 },
  activeTabText: { color: APP_COLORS.text },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLORS.text,
    marginTop: 15,
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: APP_COLORS.background,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemTextContainer: { flex: 1, marginRight: 10 },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: APP_COLORS.text,
    marginBottom: 3,
  },
  itemSubtitle: { fontSize: 13, color: APP_COLORS.lightText },
  itemPoints: { fontSize: 16, fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: { fontSize: 16, color: APP_COLORS.lightText },
});

export default HistoryScreen;
