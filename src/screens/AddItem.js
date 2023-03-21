import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database'

let AddItems = item => {
  database().ref('/Item').push({
    name: item,
  })
}

const AddItem = () => {
  const [name, setName] = useState('')
  const handleSubmit = () => {
    AddItems(name)
    setName('');
    Alert.alert('Item saved successfully');
  }
  return (
    <View style={styles.main}>
      <Text style={styles.title}>AddItem</Text>
      <TextInput
        style={styles.itemInput}
        onChangeText={txt => setName(txt)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddItem

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    borderColor: '#fff',
    color: '#fff',
    borderWidth: 0.5,
    borderRadius: 15
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20

  }
})