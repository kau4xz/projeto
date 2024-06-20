import { VStack, Image, Text, Box, Divider, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import Logo from './assets/face_id.png';

import { Titulo } from "./componentes/Titulo";
import EntradaTexto from "./componentes/EntradaTexto";
import { Botao } from "./componentes/Botao";

export default function MinhasCapturas() {
    return (
        <VStack flex={1} alignItems="center" p={5}>
          <Titulo color="blue.500">
            Minhas Capturas
          </Titulo>
          
          {/* Divisor para separar o título da lista de capturas */}
          <Divider width="100%" bg="gray.200" my="4" />

          

          {/* Botão para adicionar novas capturas ou ações similares */}
          <Botao onPress={() => console.log('Adicionar Nova Captura')} children={"Adicionar Nova Captura"} />
        </VStack>
    );
}
