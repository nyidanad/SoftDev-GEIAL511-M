import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";

import AddChatModal from "./addChatModal";

const addChatButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShowModal(true)}
      >
        <Image
          source={require("@/assets/icons/chat.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <AddChatModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default addChatButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11175A",
    position: "absolute",
    borderRadius: 15,
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
  },
  icon: {
    width: 45,
    height: 45,
  },
});
