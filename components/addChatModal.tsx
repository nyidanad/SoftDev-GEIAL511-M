import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import StartNewChatModal from "./startNewChatModal";

import Hr from "./hr";

type modalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const addChatModal = ({ showModal, setShowModal }: modalProps) => {
  const [showNewModal, setShowNewModal] = useState(false);

  return (
    <>
      <Modal
        visible={showModal}
        style={styles.modal}
        transparent={true}
        animationType="fade"
        collapsable={false}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.contentWrapper}>
                <Image
                  source={require("@/assets/icons/chat-outline.png")}
                  style={styles.icon}
                />
                <TouchableOpacity style={styles.texts} onPress={() => [setShowNewModal(true), setShowModal(false)]}>
                  <Text style={styles.title}>New Chat</Text>
                  <Text style={styles.description}>
                    Start chatting with your contact
                  </Text>
                </TouchableOpacity>
              </View>
              <Hr color={"#F2F2F7"} marginTop={5} marginBottom={5} />
              <View style={styles.contentWrapper}>
                <Image
                  source={require("@/assets/icons/people-outline.png")}
                  style={styles.icon}
                />
                <TouchableOpacity style={styles.texts}>
                  <Text style={styles.title}>New Group</Text>
                  <Text style={styles.description}>
                    Create a group with your contacts
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* cancel */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StartNewChatModal
      showModal={showNewModal}
      setShowModal={setShowNewModal}
      setShowBackModal={setShowModal}
      />
    </>
  );
};

export default addChatModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    bottom: 60,
  },
  content: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  icon: {
    width: 25,
    height: 25,
  },
  texts: {
    paddingLeft: 20,
  },
  title: {
    color: "#363636",
    fontWeight: "bold",
    marginBottom: 3,
  },
  description: {
    color: "#696969",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignSelf: "center",
    margin: 0,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 999,
  },
  cancelText: {
    color: "#363636",
  },
});
