import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import {firestore, collection,addDoc, serverTimestamp, MESSAGES, query, onSnapshot} from './firebase/Config.js';
import { convertFirebaseTimeStamps } from './helper/Functions.js';
import Login from './components/Login.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { doc, deleteDoc } from "firebase/firestore";


export default function App() {

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [logged, setLogged] = useState(true);


  useEffect(() => {
    const q = query(collection(firestore, MESSAGES));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        tempMessages.push({id: doc.id, ...doc.data(), created: convertFirebaseTimeStamps(doc.data().created)
        });
      });
      setMessages (tempMessages);
    });

    return () => {
      unsubscribe;
    }
  }, [])
  

  const save = async () => {
    console.log('saving message:', newMessage);
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp(),
    });
    setNewMessage('');
    console.log('saved message:', docRef.id);
  }
  
const handleDelete = async (id) => {
  console.log('deleting');
  deleteDoc(doc(firestore, MESSAGES, id));
}

if (logged) {
  return (
<SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shopping list</Text>
      <View style={styles.form}>
      <TextInput
        placeholder="add new Item..."
        value={newMessage}
        onChangeText={text => setNewMessage(text)}
      />
      <Button title="Save" onPress = {save} /> 
      </View>
      <ScrollView>
      {
        messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <Text style= {styles.messageinfo}>{message.created}</Text>
            <Text>{message.text}</Text>
            <Icon name="delete" size={30} color="#900" onPress={() =>  handleDelete(message.id)} />
          </View>
        ))
      }
      </ScrollView>
    </SafeAreaView>
)} else {
  console.log('not logged');
  return <Login setLogged={setLogged}/>
}
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 28,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  message: {
    margin: 8,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 5,
  },
  messageinfo: {
  fontSize: 12,
  },
});
