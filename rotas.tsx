import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de que este pacote está instalado
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Login from "./login";
import Cadastro from "./cadastro";
import RecuperarSenha from "./recuperarSenha";
import TelaInicial from './telaInicial';
import CameraTela from './cameraTela';

const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -5,
    },
    headerLeftText: {
        marginLeft: Platform.OS === 'ios' ? 10 : 10, // Ajuste a margem esquerda conforme necessário
        color: 'black',
        fontSize: 16,
    },
});

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Cadastro" 
                    component={Cadastro} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: '',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeftContainer}>
                                <Ionicons name="arrow-back" size={24} color="black" />
                                <Text style={styles.headerLeftText}>Voltar</Text>
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen 
                    name="RecuperarSenha" 
                    component={RecuperarSenha} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: '',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeftContainer}>
                                <Ionicons name="arrow-back" size={24} color="black" />
                                <Text style={styles.headerLeftText}>Voltar</Text>
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen 
                    name="TelaInicial" 
                    component={TelaInicial} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: '',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeftContainer}>
                                <Ionicons  name="arrow-back"  size={24} color="black" />
                                <Text style={styles.headerLeftText}>Voltar</Text>
                            </TouchableOpacity>
                        )
                    })}
                />

                <Stack.Screen 
                    name="CameraTela" 
                    component={CameraTela} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
