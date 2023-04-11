import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/AuthContexts";

export default function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){
        if(email === '' || password === ''){
            alert('Preencha todos os campos!');
        }

        await signIn({ email, password });
    }



    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.jpg')} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu Email"
                    placeholderTextColor="#F0F0F0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sua Senha"
                    placeholderTextColor="#F0F0F0"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                {loadingAuth ? (
                    <ActivityIndicator size={25} color="#101026" />
                ) : (
                <Text style={styles.buttonText}>Entrar</Text>
                )}
                </TouchableOpacity>
            </View> 
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121'
    },
    logo:{
        marginBottom:18,
        width: 340,
        height: 300,
    },
    inputContainer:{
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input:{
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
    },
    button:{
        width: '95%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    }
    });