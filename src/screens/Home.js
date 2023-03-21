import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Home = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View  style={styles.button}>
            <Button title='Add An Item' 
            onPress={() => navigation.navigate('AddItem')} />
            <Button title='List Of Items' onPress={() => navigation.navigate('List')} />
            </View>
           
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 30,

    }
})