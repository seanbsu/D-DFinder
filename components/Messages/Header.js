import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import styles from '../../assets/styles';

const Header = ({ title, onBackPress }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleUnmatch = () => {
    // Code to handle unmatching
    // This function will be called when the "Unmatch" button is pressed
    // You can implement the logic to handle unmatching here
  };

  return (
    <View style={{ padding: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <TouchableOpacity style={{ paddingLeft: 10 }} onPress={onBackPress}>
        <Ionicons name="chevron-back-outline" size={20}  />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: 10 }}>{title}</Text>
      <TouchableOpacity style={{ paddingRight: 10 }} onPress={toggleDropdown}>
        <Ionicons name="ellipsis-vertical" size={20}  />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dropdownVisible}
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleUnmatch}>
              <Text style={styles.dropdownItem}>Unmatch</Text>
            </TouchableOpacity>
            {/* Add more dropdown items here if needed */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

