import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Ionicons } from '@expo/vector-icons'

import Hr from '@/components/hr'

type ModalOptions = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  modalPosition: {top: number}
}

const chatOptionsModal = ({ showModal, setShowModal, modalPosition }: ModalOptions) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowModal(false)}>
        <View style={[styles.container, { top: modalPosition.top }]}>
          <View>
            {/* Mute */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Mute</Text>
              <Ionicons name='notifications-off-outline' style={styles.icon} />
            </TouchableOpacity>

            <Hr color='#EDEEF2' marginTop={8} marginBottom={8} />

            {/* Report */}
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.text}>Report</Text>
                <Ionicons name="warning-outline" style={styles.icon} />
              </View>
            </TouchableOpacity>

            <Hr color='#EDEEF2' marginTop={8} marginBottom={8} />

            {/* Block */}
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.text}>Block</Text>
                <Ionicons name='remove-circle-outline' style={styles.icon} />
              </View>
            </TouchableOpacity>

            <Hr color='#EDEEF2' marginTop={8} marginBottom={8} />

            {/* Archive */}
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.text}>Archive</Text>
                <Ionicons name="albums-outline" style={styles.icon} />
              </View>
            </TouchableOpacity>

            <Hr color='#EDEEF2' marginTop={8} marginBottom={8} />

            {/* Delete */}
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={[styles.text, { color: 'red' }]}>Delete</Text>
                <Ionicons name="trash" style={[styles.icon, { color: 'red' }]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default chatOptionsModal

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    right: 15,
    width: 180,
    backgroundColor: '#FFF',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  text: {
    color: '#363636',
    fontSize: 16,
  },
  icon: {
    color: '#363636',
    fontSize: 18,
  },
})