export type HistoryItemRecord = {
  _id: string;
  type: 0 | 1; // 0 = Sawab, 1 = Gunah
  amount: number;
  notes: string;
  createdAt: string; // ISO 8601 date string
};

/**
 * The data structure required by SectionList.
 */
export type HistorySection = {
  title: string;
  data: HistoryItemRecord[];
};

/**
 * Type for the active tab state.
 */
export type ActiveTab = "sawab" | "gunah";

// --- Prop Types for Sub-components ---

export type ScreenHeaderProps = {
  title: string;
};

export type SegmentedControlProps = {
  activeTab: ActiveTab;
  onTabPress: (tab: ActiveTab) => void;
};

export type HistoryItemProps = {
  item: HistoryItemRecord;
};

export type SectionHeaderProps = {
  title: string;
};

export type EmptyListComponentProps = {
  isLoading: boolean;
};
