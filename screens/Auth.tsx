import React, { useState } from 'react'
import { Alert, StyleSheet, View, Pressable, TextInput, Text, Image } from 'react-native'
import { supabase } from '../lib/supabase'
import { Ionicons } from "@expo/vector-icons";

export default function Auth() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function registerWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    
    if (error) Alert.alert(error.message)
    //if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)

  }

  return (
    <View style={styles.container}>
      
      <View style={{padding:50}}>
        {/* IMAGE -------------------   */} 
        <View style={{justifyContent:'center', alignItems:'center'}}>
            {/*<Text style={{fontSize:25, alignSelf:'center', padding:20}}>Let us get to know you!</Text>*/}
            <Image source={require('../assets/little_lemon_auth.png')} style={{width:'100%', height:300}}/>
        </View>

        {/* USERNAME -----------------  */}
        <View style={[styles.textInput,{flexDirection:'row'}]}>
          <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
            <Ionicons name="person-outline" size={25} color="#666" />
          </View>
          <TextInput
            style={{flex:10}}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="Username"
          />
        </View>
        
        {/* EMAil --------------------  */}
        <View style={[{flexDirection:'row'}, styles.textInput]}>
          <View style={{ flex:2, justifyContent:'center', alignItems:'center'}}>
            <Ionicons name="mail-outline" size={25} color="#666" />
          </View>
          <TextInput
            style={{flex:10}}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
          />
          
        </View>
        
        {/* PASSWORD -----------------  */}
        <View style={[styles.textInput, { flexDirection:'row'} ]}>
          <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
            <Ionicons name="key-outline" size={25} color="#666"/>
          </View>
          <TextInput
            style={{flex:10}}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>

        {/* BUTTON SING IN ---------------  */}
        <Pressable 
          style= {styles.buttom}
          disabled={loading} 
          onPress={() => signInWithEmail()} 
        >
            <Text>Sign in</Text>
        </Pressable>
        
        {/* BUTTON REGISTER -----------------*/}
        <Pressable 
          style={styles.buttom}
          disabled={loading} 
          onPress={() => registerWithEmail()} 
        >
            <Text>Sign up</Text>
        </Pressable>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  buttom:{
    backgroundColor:'#507355',
    padding:15,
    alignItems:'center',
    borderRadius:10,
    shadowColor:'black',
    shadowRadius: 3.84,
    marginTop:10
  },
  textInput : {
      borderWidth:3,
      borderColor:'#00000033',
      padding:10,
      fontSize:15,
      borderRadius:10,
      backgroundColor:'#dcdcdc',
      margin:3
    },
  container: {
    padding: 20,
    backgroundColor:'#b2bbb0', flex: 1
  },
  label : {
        alignSelf:'center',
        fontSize:20,
    }
})

