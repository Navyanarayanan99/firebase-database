import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState, useEffect, } from 'react'
import database from '@react-native-firebase/database'

let itemRef = database().ref('/Item');
const List = () => {
  const [itemArray, setItemArray] = useState([]);
  const [keys, setKeys] = useState([])
  const [ifUpdate, setIfUpdate] = useState(false)
  const [updateText, setUpdateText] = useState('')
  const [updateIndex, setUpdateIndex] = useState('')
  
  useEffect(() => {
    itemRef.on('value', snapshot => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemArray(items);
      setKeys(Object.keys(data))
    })
  }, [])

  const handleDelete = (index) => {
    let childKey = keys[index]
    itemRef.child(childKey).remove();
  }

  const handleUpdate = (name, index) => {
    setUpdateText(name)
    setUpdateIndex(index)
    setIfUpdate(true)
  }

  const submitUpdate = () => {
    let childKey = keys[updateIndex]
    itemRef.child(childKey).update({
      name: updateText
    })
    setIfUpdate(false)
  }
  return (
    <View style={styles.container}>
      {(itemArray.length > 0)
        ?
        ifUpdate
          ?
          <View>
            <TextInput
              style={styles.input}
              value={updateText}
              onChangeText={setUpdateText}
            />
            <Button title='submit' onPress={() => submitUpdate()} />
            <Button title='Cancel' onPress={() => setIfUpdate(false)} />
          </View>

          :
          <View style={styles.itemView}>
            {itemArray.map((item, index) => {
              return (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Button title='Update' onPress={() => handleUpdate(item.name, index)} />
                  <Button title='Delete' onPress={() => handleDelete(index)} />
                </View>
              )
            })}
          </View>

        :
        <Text>No Items </Text>
      }
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%'
  }
})