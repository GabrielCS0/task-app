import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { ITask } from '../../../App'

interface ITaskList {
  data: ITask;
  handleDelete: Function;
}

export default function TaskList ({ data, handleDelete }: ITaskList) {
  return (
      <Animatable.View
      style={styles.container}
      animation='bounceIn'
      useNativeDriver
      >
        <TouchableOpacity onPress={ () => handleDelete(data) }>
          <Ionicons name="close-circle-outline" size={30} color="#121212" />
        </TouchableOpacity>

        <View>
          <Text style={styles.taskText}>{ data.task }</Text>
        </View>
      </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    margin: 8,
    padding: 7,
  },

  taskText: {
    color: '#121212',
    fontSize: 20,

    paddingLeft: 8,
    paddingRight: 20,
    marginTop: 1.7
  }
})