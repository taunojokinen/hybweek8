import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword,firebaseConfig, app, } from '../firebase/Config.js';
import { View,Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


export default function Login({setLogged}) {
    const[username, setUsername] = useState('taunojokinen@gmail.com');
    const[password, setPassword] = useState('salasana_24');

    const login = () => {;
        const auth = getAuth();
        console.log('got',auth);
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredentials) => {
            console.log('logged in:')//, userCredentials.user);
            setLogged(true);
        })
        .catch((error) => {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                console.log('invalid credentials');
            } else if (error.code === 'auth/too-many-requests') {
                console.log('too many requests');
            } else {
            console.log('error-3:', error);
            }
        });
    }


    return (
        
        <View style= {styles.container} >
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
                       <TouchableOpacity style={styles.button} onPress={() => login()}>
           <Text style={styles.buttonText}>Login</Text>
           </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
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
    },
    button: {
        marginTop: 16,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    });
