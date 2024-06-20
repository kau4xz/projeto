import { VStack, Image, Text, Box, FormControl, Input, Button, Link} from "native-base"
import { Platform, TouchableOpacity, View}  from "react-native"
import Rosto from './assets/Rosto.png'
import { Titulo } from "./componentes/Titulo"
import EntradaTexto  from "./componentes/EntradaTexto";
import  { Botao } from "./componentes/Botao";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaInicial({ navigation }) {
    
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const usuario = await AsyncStorage.getItem('usuario');
      if (usuario) {
        setAutenticado(true);
      } else {
        // Redireciona para a tela de login se não estiver autenticado
        navigation.navigate('Login'); 
      }
    };

    verificarAutenticacao();
  }, []); 

    return (
        <View>
        <VStack flex={1} alignItems="center" p={5} bg="white">
            <Box mb={5} w="100%" alignItems="center">
            <Image source={Rosto} alt="Logo Camera" marginTop={70} />
            
            <Titulo color="blue.500">
                IA FACIAL
            </Titulo>

            <Text textAlign="center" color="gray.600" mt={4}>
                Realize uma captura de imagem e experimente o modelo de detecção facial Expo Face Detector
            </Text>
           
            </Box>
            
            <Box mt={2} w="100%" alignItems="center">
                <Botao mt={10} mb={0} onPress={() => navigation.navigate('CameraTela')} children={"Captura"} />

          <Text 
            textAlign="center" 
            color="gray.600" 
            mt={4} 
            fontSize="md"
          >
            Realize uma captura de imagem e experimente o modelo de detecção facial Expo Face Detector
          </Text>

          <Box w="100%" mt={-2} justifyContent="center" alignItems="center">
            <Botao 
              onPress={() => navigation.navigate('CameraTela')} 
              children={"Captura"} 
              style={{ width: Platform.OS === 'web' ? '80%' : '100%', paddingVertical: 10}} 
            />

            <Botao 
              mt={0} 
              onPress={() => navigation.navigate('MinhasCapturas')} 
              children={"Visualizar Capturas"} 
              style={{ width: Platform.OS === 'web' ? '80%' : '100%', paddingVertical: 10 }} 
            />
          </Box>
        </Box>
      </VStack>
    </View>
  );
}