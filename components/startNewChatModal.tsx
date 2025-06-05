import usePeople, { User } from "@/hooks/usePeople";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Modal, View, StyleSheet, TextInput, TouchableOpacity, Text, FlatList } from "react-native";

import StartNewChatBubble from "./startNewChatBubble";

type modalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowBackModal: Dispatch<SetStateAction<boolean>>;
};

const startNewChatModal = ({ showModal, setShowModal, setShowBackModal }: modalProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("");

  usePeople(setUsers)

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <Modal animationType="fade" transparent={true} visible={showModal}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}>
        <View style={styles.container}>
          <View style={styles.searchbar}>
            <Ionicons name="search" style={styles.icon} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for friends..."
              placeholderTextColor={"#999999"}
            />
          </View>
          <View>
            <FlatList 
              data={filteredUsers}
              keyExtractor={(item) => item.email}
              renderItem={({item, index}) => <StartNewChatBubble key={item.email} index={index} uid={item.uid} name={item.name} email={item.email} image={item.image} />}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: '90%' }}
            />
              
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => [setShowModal(false), setShowBackModal(true)]}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default startNewChatModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 625,
    marginHorizontal: 20,
    marginTop: 106,
  },
  icon: {
    color: "#11175A",
    fontSize: 22,
    marginHorizontal: 10,
  },
  searchbar: {
    backgroundColor: "rgba(118,118,128,0.12)",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 26,
    textAlign: "left",
    marginHorizontal: 20,
    marginVertical: 30,
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
