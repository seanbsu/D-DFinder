import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

const Header = ({ title }) => {
  return (
    <View style={{ padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity style={{ padding: 10 }} onPress={() => {}}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>{title}</Text>
      </View>
     
    </View>
  );
};

export default Header;
