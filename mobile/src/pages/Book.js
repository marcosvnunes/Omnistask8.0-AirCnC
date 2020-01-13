import React, { useState}from 'react';
import { SafeAreaView , Alert, StyleSheet, TouchableOpacity, Text, TextInput, AsyncStorage} from 'react-native';

// import { Container } from './styles';

import api from '../services/api';

export default function Book({navigation}) {
    const id = navigation.getParam('id')
    const [ date , setDate ] = useState('')
    async function handlesubmit(){
        const user_id = await AsyncStorage.getItem('user');
         await api.post(`/spot/${id}/bookings`,{
            date
        },{
            headers:{ user_id }
        })
        Alert.alert('Reserva solicidata aguarde a confirmação')
        
        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.label}> DATA DA RESERVA *</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Qual data você quer reservar?"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={date}
            onChangeText={setDate}
        />
        <TouchableOpacity style={styles.button} onPress={handlesubmit}>
            <Text style={styles.textButton}>Reservar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button , styles.buttonCancel]} onPress={handleCancel}>
            <Text style={styles.textButton}>Cancelar</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        margin:30,
    },  

    label:{
        marginTop:30,
        fontWeight:'bold',
        color:'#444',
        marginBottom:8,
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        paddingHorizontal:20,
        fontSize:16,
        color:'#444',
        height:44,
        marginBottom:20,
        borderRadius:2,
    },
    button:{
        marginTop:15,
        height:42,
        backgroundColor: '#f05a5b',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
    },
    buttonCancel:{
        backgroundColor: '#CCC',
    },
    textButton:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    }
})
