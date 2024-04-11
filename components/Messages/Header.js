import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import styles from '../../assets/styles';

const Header = ({ title, onBackPress }) => {
  return (
    <View style={{ padding: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <TouchableOpacity style={{ paddingLeft: 10 }} onPress={onBackPress}>
        <Ionicons name="chevron-back-outline" size={20}  />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: 10 }}>{title}</Text>
      <TouchableOpacity style={{ paddingRight: 10 }}>
        <Ionicons name="ellipsis-vertical" size={20}  />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
