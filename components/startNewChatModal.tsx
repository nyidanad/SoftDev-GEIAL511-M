import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const startNewChatModal = () => {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
        <View style={styles.view}>
          <View style={styles.view2}>
            <Ionicons name="search" style={styles.icon} />
            <TextInput
              placeholder="Search for friends..."
              placeholderTextColor={"#999999"}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default startNewChatModal;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 625,
    marginHorizontal: 20,
    marginTop: 70,
  },
  button: {
    backgroundColor: "#F2F2F7",
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 86,
    marginVertical: 14,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    margin: 10,
    fontSize: 22,
  },
  icon: {
    color: "#11175A",
    fontSize: 22,
    marginHorizontal: 10,
  },
  view2: {
    backgroundColor: "rgba(118,118,128,0.12)",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 26,
    textAlign: "left",
    margin: 30,
  },
});
