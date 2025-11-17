import { APP_COLORS } from "@/constants/Colors";
import { scale, verticalScale } from "@/constants/metrics";
import useAddDeed from "@/layouts/App/AddDeed/AddDeedContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Controller, useWatch } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// --- Data ---
const TypeOptions = [
  {
    icon: "emoticon-happy-outline" as const, // Use "as const" for type safety
    title: "Sawab",
    subtitle: "Good Deed",
    value: 0, // 0 for Sawab
  },
  {
    icon: "emoticon-sad-outline" as const,
    title: "Gunah",
    subtitle: "Sin",
    value: 1, // 1 for Gunah
  },
];

// --- Prop Types ---
type TypeCardsProps = {
  selectedType: number;
  onSelect: (type: number) => void;
};

// --- Header Component ---
const Header: FC<{ onBackPress: () => void }> = ({ onBackPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={scale(34)}
        color={APP_COLORS.text}
      />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Add Deed</Text>
    <View style={styles.backButton} /> {/* Placeholder for alignment */}
  </View>
);

// --- TypeCards Component (Modified) ---
const TypeCards: FC<TypeCardsProps> = React.memo(
  ({ selectedType, onSelect }) => (
    <View style={styles.typeContainer}>
      {TypeOptions.map((option) => {
        const isActive = selectedType === option.value;
        const iconColor = isActive
          ? option.value === 0
            ? APP_COLORS.primary
            : APP_COLORS.logoutText
          : APP_COLORS.placeholder;

        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={[
              styles.typeItem,
              !isActive && styles.inactiveTypeItem,
              isActive &&
                (option.value === 0
                  ? styles.activeSawabTypeItem
                  : styles.activeGunahTypeItem),
            ]}
          >
            <MaterialCommunityIcons
              name={option.icon}
              size={scale(30)}
              color={iconColor}
              style={styles.typeItemIcon}
            />
            <Text
              style={[
                styles.typeItemTitle,
                isActive ? styles.activeTitle : styles.inactiveTitle,
              ]}
            >
              {option.title}
            </Text>
            <Text style={styles.typeItemSubTitle}>{option.subtitle}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
);

// --- NotesInput Component ---
const NotesInput: FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}> = ({ value, onChangeText, placeholder }) => (
  <View style={styles.notesInputContainer}>
    <MaterialCommunityIcons
      name="file-document-outline"
      size={scale(20)}
      color={APP_COLORS.lightText}
      style={styles.notesInputIcon}
    />
    <TextInput
      style={styles.notesInput}
      placeholder={placeholder}
      placeholderTextColor={APP_COLORS.placeholder}
      multiline
      numberOfLines={5}
      value={value}
      onChangeText={onChangeText}
      textAlignVertical="top"
    />
  </View>
);

// --- AmountCounter Component ---
const AmountCounter: FC<{
  amount: number;
  onIncrement: () => void;
  onDecrement: () => void;
}> = ({ amount, onIncrement, onDecrement }) => (
  <View style={styles.amountCounterContainer}>
    <TouchableOpacity style={styles.amountButton} onPress={onDecrement}>
      <MaterialCommunityIcons
        name="minus"
        size={scale(24)}
        color={APP_COLORS.text}
      />
    </TouchableOpacity>
    <Text style={styles.amountText}>{amount}</Text>
    <TouchableOpacity style={styles.amountButton} onPress={onIncrement}>
      <MaterialCommunityIcons
        name="plus"
        size={scale(24)}
        color={APP_COLORS.text}
      />
    </TouchableOpacity>
  </View>
);

// --- AddDeedButton Component ---
const AddDeedButton: FC<{
  onPress: () => void;
  deedType: number;
  isLoading: boolean;
}> = ({ onPress, deedType, isLoading }) => {
  const bgColor = deedType === 0 ? APP_COLORS.primary : APP_COLORS.logoutText;
  return (
    <TouchableOpacity
      style={[styles.addDeedButton, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      {isLoading && <ActivityIndicator color="#fff" />}
      <Text style={styles.addDeedButtonText}>
        Add {deedType === 0 ? "Sawab" : "Gunah"}
      </Text>
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
const AddRecord = () => {
  const { control, handleSubmit, onSubmit, watch, handleBackPress, isLoading } =
    useAddDeed();
  const selectedType = useWatch({ control, name: "selectedType" });

  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Header onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollViewContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Type of Deed */}
          <View>
            <Text style={styles.sectionLabel}>Type of Deed</Text>
            <Controller
              control={control}
              name="selectedType"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <TypeCards
                    selectedType={value}
                    onSelect={(val) => {
                      onChange(val);
                    }}
                  />
                  {error && (
                    <Text style={{ color: "red" }}>{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Notes */}
          <View>
            <Text style={styles.sectionLabel}>Add a note (optional)</Text>
            <Controller
              control={control}
              name="notes"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <NotesInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="e.g., Helped a neighbor..."
                  />
                  {error && (
                    <Text style={{ color: "red" }}>{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Amount */}
          <View>
            <Text style={styles.sectionLabel}>Amount</Text>
            <Controller
              control={control}
              name="amount"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <AmountCounter
                    amount={value}
                    onIncrement={() => onChange(value + 1)}
                    onDecrement={() => onChange(Math.max(1, value - 1))}
                  />
                  {error && (
                    <Text style={{ color: "red" }}>{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <AddDeedButton
        onPress={handleSubmit(onSubmit)}
        deedType={selectedType}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
};

export default AddRecord;

// --- Stylesheet ---
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.inputBackground,
  },
  backButton: {
    width: scale(30),
  },
  headerTitle: {
    fontSize: 24,
    textAlign: "center",
    color: APP_COLORS.text,
    fontWeight: "bold",
  },
  scrollViewContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
  },
  content: {
    flex: 1,
    paddingVertical: verticalScale(20),
    gap: verticalScale(25), // Spacing between sections
  },
  sectionLabel: {
    fontSize: scale(16),
    fontWeight: "600",
    color: APP_COLORS.text,
    marginBottom: verticalScale(10),
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(15),
  },
  typeItem: {
    flex: 1,
    borderRadius: scale(12),
    paddingVertical: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  inactiveTypeItem: {
    backgroundColor: APP_COLORS.inputBackground,
    borderColor: "transparent",
  },
  activeSawabTypeItem: {
    backgroundColor: APP_COLORS.primaryAppBg,
    borderColor: APP_COLORS.primary,
  },
  activeGunahTypeItem: {
    backgroundColor: APP_COLORS.logoutBg,
    borderColor: APP_COLORS.logoutText,
  },
  typeItemIcon: {
    marginBottom: verticalScale(5),
  },
  typeItemTitle: {
    fontSize: scale(18),
    fontWeight: "bold",
    marginBottom: verticalScale(2),
  },
  activeTitle: {
    color: APP_COLORS.text,
  },
  inactiveTitle: {
    color: APP_COLORS.lightText,
  },
  typeItemSubTitle: {
    fontSize: scale(13),
    fontWeight: "400", // "light" is not a valid weight
    color: APP_COLORS.lightText,
  },
  notesInputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: APP_COLORS.inputBackground,
    borderRadius: scale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    minHeight: verticalScale(120),
    borderColor: APP_COLORS.border,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 3,
  },
  notesInputIcon: {
    marginRight: scale(10),
    marginTop: verticalScale(3),
  },
  notesInput: {
    flex: 1,
    fontSize: scale(16),
    color: APP_COLORS.text,
    padding: 0,
  },
  amountCounterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: APP_COLORS.inputBackground,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: APP_COLORS.border,
    height: verticalScale(90),
    paddingHorizontal: scale(10),
  },
  amountButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: APP_COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  amountText: {
    fontSize: scale(22),
    fontWeight: "bold",
    color: APP_COLORS.text,
  },
  addDeedButton: {
    borderRadius: scale(12),
    paddingVertical: verticalScale(18),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginHorizontal: scale(16),
    marginBottom: Platform.OS === "ios" ? 0 : verticalScale(20),
    marginTop: verticalScale(10),
  },
  addDeedButtonText: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: APP_COLORS.white,
  },
});
