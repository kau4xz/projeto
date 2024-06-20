import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { ScrollView, FlatList, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
=======
import { ScrollView, FlatList, TouchableOpacity, StyleSheet, Pressable, Platform, Alert } from 'react-native';
>>>>>>> c86db41d91e9c31717069f9a9a6aea3cd6a7b068
import { VStack, Box, Image, Text, Modal, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import { Botao } from './componentes/Botao';

export default function MinhasCapturas() {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null); // Guardar o ID para exclusão
  const [showModal, setShowModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

<<<<<<< HEAD
  const loadImages = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const album = await MediaLibrary.getAlbumAsync('Saved Photos');
      if (album) {
        const media = await MediaLibrary.getAssetsAsync({
          album: album.id,
          first: 100,
          sortBy: MediaLibrary.SortBy.creationTime,
        });
        setImages(media.assets);
      }
    }
  };

  const handleImagePress = (imageUri, imageId) => {
    setSelectedImageUri(imageUri);
    setSelectedImageId(imageId); // Definir o ID ao abrir o modal
=======
  const deleteImage = async () => {
    if (selectedImageId) { // Certifique-se de que o ID está definido
      try {
        await MediaLibrary.deleteAssetsAsync([selectedImageId.toString()]); // Convertendo para string aqui
        setImages(images.filter(image => image.id.toString() !== selectedImageId.toString())); // Usando toString na comparação também
        closeModal(); // Fechar o modal
        Alert.alert('Sucesso!', 'Foto excluída com sucesso.');
      } catch (error) {
        console.error('Erro ao excluir a imagem: ', error);
        Alert.alert('Erro', 'Ocorreu um erro ao excluir a foto.');
      }
    } else {
      Alert.alert('Erro', 'ID do ativo não disponível');
    }
  };

  const handleImagePress = (image) => {
    setSelectedImageUri(image.uri);
    setSelectedImageId(image.id); // Armazenar o ID diretamente sem conversão
>>>>>>> c86db41d91e9c31717069f9a9a6aea3cd6a7b068
    setShowModal(true);
  };

  const deleteImage = async () => {
    await MediaLibrary.deleteAssetsAsync([selectedImageId]);
    setImages(prevImages => prevImages.filter(image => image.id !== selectedImageId));
    closeModal();
  };

  const confirmDelete = () => {
    Alert.alert("Excluir Foto", "Você quer excluir esta foto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", onPress: deleteImage, style: "destructive" },
    ]);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImageUri(null);
    setSelectedImageId(null);
  };

  return (
    <VStack
      flex={1}
      alignItems="center"
      p={1}
      backgroundColor="transparent"
      mb={1}
      style={{ backgroundColor: Platform.OS === 'web' ? 'white' : 'white' }}
    >
      <Text fontSize="2xl" bold color="#3A82EF" mb={1}>
        Minhas Capturas
      </Text>
<<<<<<< HEAD
      <ScrollView>
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Box
              onPress={() => handleImagePress(item.uri, item.id)}
              w="50%"
              h={200}
              p={1}
              rounded="lg"
              overflow="hidden"
              borderColor="gray.200"
              borderWidth={1}
            >
              <Pressable onPress={() => handleImagePress(item.uri, item.id)}>
                <Image
                  source={{ uri: item.uri }}
                  alt="Captura"
                  size="full"
                  resizeMode="cover"
                  borderRadius={10}
                />
                <Box bg="rgba(0, 0, 0, 0.5)" position="absolute" bottom={0} w="full" p={2}>
                  <Text fontSize="xs" color="white">
                    {item.filename}
                  </Text>
                </Box>
              </Pressable>
            </Box>
          )}
        />
=======

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlatList
        data={images}
        numColumns={Platform.OS === 'web' ? 4 : 2}
        keyExtractor={(item) => item.id.toString()} // Garantindo que o keyExtractor lida com strings
        renderItem={({ item }) => (
          <Box
            w={Platform.OS === 'web' ? '25%' : '50%'}
            h={200}
            p={1}
            rounded="lg"
            overflow="hidden"
            borderColor="gray.200"
            borderWidth={1}
          >
            <Pressable onPress={() => handleImagePress(item)}> 
              <Image
                source={{ uri: item.uri }}
                alt="Captura"
                size="full"
                resizeMode="cover"
                borderRadius={10}
              />
              <Box bg="rgba(0, 0, 0, 0.5)" position="absolute" bottom={0} w="full" p={2}>
                <Text fontSize="xs" color="white">
                  {item.filename}
                </Text>
              </Box>
            </Pressable>
          </Box>
        )}
      />
>>>>>>> c86db41d91e9c31717069f9a9a6aea3cd6a7b068
      </ScrollView>

      <Botao
        onPress={() => navigation.navigate('CameraTela')}
        children="Adicionar Nova Captura"
        style={{ width: Platform.OS === 'web' ? '30%' : '100%', paddingVertical: 10 }}
      />

      <Modal isOpen={showModal} onClose={closeModal} size="full" safeAreaTop>
        <Modal.Content maxWidth="100%">
          <Modal.CloseButton />
          <Modal.Header>Visualização da Foto</Modal.Header>
          <Modal.Body>
            {selectedImageUri && (
              <Image
                source={{ uri: selectedImageUri }}
                alt="Visualização da foto"
                style={styles.modalImage}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
            <Button variant="ghost" colorScheme="red" onPress={deleteImage}>
                Excluir
              </Button>
              <Button variant="ghost" colorScheme="blueGray" onPress={closeModal}>
                Fechar
              </Button>
<<<<<<< HEAD
              <Button colorScheme="red" onPress={confirmDelete}>
                Excluir
              </Button>
=======
>>>>>>> c86db41d91e9c31717069f9a9a6aea3cd6a7b068
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}

const styles = StyleSheet.create({
  modalImage: {
    width: '100%',
<<<<<<< HEAD
    height: 400,
    resizeMode: 'contain'
  }
});
=======
    height: 400, // Adjust height according to your need
    resizeMode: 'contain',
  },
});
>>>>>>> c86db41d91e9c31717069f9a9a6aea3cd6a7b068
