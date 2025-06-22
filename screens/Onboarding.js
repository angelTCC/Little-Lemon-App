import { Text, 
    Image,
    TextInput, KeyboardAvoidingView, ScrollView, Platform, Pressable, View } from 'react-native';
import { useState } from 'react';

export default function Onboarding ({ navigation }){ 
    const [ firstName, setFirstName] = useState('');
    const [ email, setEmail ] = useState('');

    const styleTextInput = {
        borderWidth:2,
        borderColor:'#00000033',
        marginBottom:30,
        padding:10,
        fontSize:15,
        borderRadius:10,
        backgroundColor:'#dcdcdc',
    }

    const styleButtom = {
        backgroundColor:'#507355',
        padding:10,
        width:100,
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,
        shadowColor:'black',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop:30
    }

    const styleButtomPress = {
        backgroundColor:'#628c68',
        borderColor:'green',
        borderWidth:1
    }

    const styleButtomText = {
        color:'white', 
        fontSize:20, 
        fontWeight:'bold'
    }

    const styleLabel = {
        alignSelf:'center',
        fontSize:20,
        marginBottom:10
    }

    return (
        <KeyboardAvoidingView
            behavior= { Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                <View style={{ backgroundColor:'#b2bbb0', flex: 1}}>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:25, alignSelf:'center', padding:20}}>Let us get to know you!</Text>
                        <Image source={require('../assets/head_chef.jpg')} style={{width:'100%', height:250}}/>
                    </View>
                    <View style={{padding: 30}}>
                        
                        <Text style={styleLabel}>First Name</Text>
                        <TextInput
                            style={styleTextInput}
                            value= { firstName }
                            onChange={ setFirstName}
                        />

                        <Text style={styleLabel}>Email</Text>
                        <TextInput 
                            style = {styleTextInput}
                            value = { email }
                            onChange = { setEmail }
                            keyboardType = 'email-address'
                        />
                    </View>
                    <View>
                        <Pressable
                            style={({pressed})=> [styleButtom, pressed && styleButtomPress]}
                            onPress = { () => navigation.navigate('Home') }>
                            <Text style={styleButtomText}>Next</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

