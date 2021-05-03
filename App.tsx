import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, 
  FlatList, Modal, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TaskList from './src/components/TaskList'
import * as Animatable from 'react-native-animatable'

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)

export interface ITask {
  key: string;
  task: string;
}

export default function App () {
  const [task, setTask]: Array<any> = useState([])
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    async function loadTasks () {
      const taskStorage = await AsyncStorage.getItem('@task')

      if (taskStorage) {
        setTask(JSON.parse(taskStorage))
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    async function saveTasks () {
      await AsyncStorage.setItem('@task', JSON.stringify(task))
    }

    saveTasks()
  }, [task])

  function handleAdd () {
    if (input === '') return

    const data = {
      key: input,
      task: input
    }
    
    setTask([...task, data])
    setOpen(false)
    setInput('')
  }

  const handleDelete = useCallback((data: ITask) => {
    const find = task.filter((task: ITask) => task.key !== data.key)
    setTask(find)
  }, [{}])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#61dafb" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
      </View>


      <FlatList
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={ (item: ITask) => item.key }
        renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete} /> }
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
      >
        <SafeAreaView style={styles.modal}>
        <StatusBar backgroundColor="#DCDCDC" barStyle="light-content" />

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={ () => setOpen(false) }>
              <Ionicons style={{marginHorizontal: 5}} name="md-arrow-back" size={40} color='#121212' />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Task</Text>
          </View>

          <Animatable.View 
            style={styles.modalBody}
            animation="fadeInUp"
            useNativeDriver
            >
            <TextInput
              multiline={true}
              placeholder="Add a New Task"
              placeholderTextColor="#747474"
              autoCorrect={false}
              style={styles.input}
              value={input}
              onChangeText={ (text) => setInput(text) }
            />

            <TouchableOpacity 
              style={styles.handleAdd}
              onPress={handleAdd}
            >
              <Text style={styles.handleAddText}>Register</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>

      </Modal>

      <AnimatedBtn
        style={styles.fab}
        useNativeDriver
        animation='bounceInUp'
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add" syze={35} color="#FFF" />
      </AnimatedBtn>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },

  header: {
    backgroundColor: '#61dafb',
    padding: 15,
  },

  title: {
    fontSize: 25,
    letterSpacing: 1.6,
    fontWeight: 'bold',

    color: '#FFF',
    textAlign: 'center'
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 9,
  
    position: 'absolute',
    right: 25,
    bottom: 25,
  
    backgroundColor: '#61dafb',
  
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 2,
  },

  modal: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  },

  modalTitle: {
    marginLeft: 15,

    fontSize: 23,
    color: '#121212'
  },

  modalHeader: {
    marginLeft: 10,
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },

  modalBody: {
    marginTop: 15,
  },

  input: {
    marginTop: 30,
    marginHorizontal: 10,

    padding: 8,
    fontSize: 15,

    height: 90,
    borderRadius: 6,
  
    backgroundColor: '#FFF',
    color: '#121212',
    textAlignVertical: 'top'
  },

  handleAdd: {
    marginTop: 10,
    marginHorizontal: 10,
  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#61dafb',

    height: 40,
    borderRadius: 6,
  },

  handleAddText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },

}); 
