import { useCameraPermissions, Camera, CameraView } from 'expo-camera';
import { Ionicons, FontAwesome, AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { Children, useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet, SafeAreaView, Modal, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styles } from './estilos/estilo';
import * as MediaLibrary from 'expo-media-library';
import { Botao } from "./componentes/Botao";
import { NativeBaseProvider, Slider } from 'native-base';
import { PermissionsAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import DetectFaces from './faceDetector'; 
import { useRoute } from '@react-navigation/native';

export default function CameraTela({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState('off');
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null); 
  const [mirrored, setMirrored] = useState(false);
  const [open, setOpen] = useState(false); 
  const navigationn = useNavigation(); 
  const [zoom, setZoom] = useState(0);
  const [originalPhoto, setOriginalPhoto] = useState(null);
  const [savedZoom, setSavedZoom] = useState(0);
  const route = useRoute(); 
  

  


 

  const GridOverlay = () => {
    return (
      <View style={styles.gridContainer}>
        {/* Cantos */}
        <View style={[styles.corner, styles.topLeftCorner]} />
        <View style={[styles.corner, styles.topRightCorner]} />
        <View style={[styles.corner, styles.bottomLeftCorner]} />
        <View style={[styles.corner, styles.bottomRightCorner]} />

        {/* Linhas */}
        <View style={styles.gridLineVertical} />
        <View style={styles.gridLineHorizontal} />

        {/* Retângulo Central */}
        <View style={styles.centralRectangle} />
      </View>
    );
  };

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.permissionText}>
          Precisamos da sua permissão para acessar a Câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  async function requestPermissions() {
    const { status, permissions } = await Permissions.requestCameraPermissionsAsync();
    if (status === 'granted') {
      console.log('Permissões concedidas!');
      // Continue com a gravação de áudio
    } else {
      console.log('Permissões negadas.');
      // Exiba uma mensagem ao usuário informando que a gravação não pode ser iniciada.
    }
  }

  requestPermissions(); // Chame a função quando o aplicativo iniciar

  async function takePicture() {
    if (camRef.current) {
      // Captura a foto sem zoom
      const data = await camRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(data.uri);

      setOriginalPhoto(data.uri);
      setCapturedPhoto(data.uri); // Salva a imagem original

      setSavedZoom(0);

      setOpen(true); // Abre o modal após capturar a foto
    }
  }

  function someCalculationBasedOnZoom(zoomLevel, imageSize) {
    const zoomFactor = 1 - zoomLevel; // Como o zoom máximo é 1, isso inverte o fator
    const width = imageSize * zoomFactor;
    const height = imageSize * zoomFactor;
    return { width, height };
  }

  async function savePicture() {
    if (capturedPhoto) { // Salva a imagem capturada
      let imageUri = capturedPhoto; 
      let actions = [];

      if (facing === 'front') {
        actions.push({ flip: ImageManipulator.FlipType.Horizontal });
      }
      if (zoom !== 0) {
        const { width, height } = someCalculationBasedOnZoom(zoom, 1080);
        actions.push({ crop: { originX: 0, originY: 0, width, height } });
      }

      const manipulated = await ImageManipulator.manipulateAsync(
        imageUri,
        actions,
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      imageUri = manipulated.uri;

      const asset = await MediaLibrary.createAssetAsync(imageUri);
      await MediaLibrary.createAlbumAsync("Saved Photos", asset, false);
      

      // Atualiza a galeria
      navigation.navigate('MinhasCapturas', { newImage: asset });
    }
  }

  function updateGallery(newAsset) {
    setImages(currentImages => [...currentImages, newAsset]);
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    setMirrored(current => !current);
  }

  function toggleFlash() {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }

  function closeCamera() {
    navigation.navigate('TelaInicial');
  }

  function increaseZoom() {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 1));
    setSavedZoom(zoom); // Atualiza o zoom salvo
  }

  function decreaseZoom() {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0));
    setSavedZoom(zoom); // Atualiza o zoom salvo
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing} flash={flash} ref={camRef} mirrored={mirrored} zoom={zoom}>
            <GridOverlay />
          </CameraView>
        </View>

        <View style={styles.controlsTop}>
          <TouchableOpacity onPress={() => navigation.navigate('TelaInicial')} style={styles.closeButton}>
            <Ionicons name="close-outline" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
            <Ionicons name={flash === 'off' ? 'flash-off-outline' : 'flash-outline'} size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.zoomControls}>
          <TouchableOpacity onPress={increaseZoom} style={styles.zoomButtonPlus}>
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>

          {/* Adiciona um ícone de zoom entre os botões de controle de zoom */}

          <Fontisto name="zoom" size={15} color="white" style={{ marginTop: 20 }} />

          <TouchableOpacity onPress={decreaseZoom} style={styles.zoomButtonMinus}>
            <Ionicons name="remove" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={() => navigation.navigate('MinhasCapturas')}>
            <AntDesign name="picture" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.captureButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Ionicons name="camera-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
            <Ionicons name="camera-reverse-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={false} visible={open}>
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImage}
              source={{ uri: capturedPhoto }} // Exibe a imagem capturada no modal
              style={[styles.modalImage, facing === 'front' && { transform: [{ scaleX: -1 }] }]}
            />

            <Botao mt={10} mb={1} children={"Descartar"} onPress={() => setOpen(false)} />
            <Botao mt={1} mb={1} children={"Detectar Faces"} onPress={() => navigation.navigate('FaceDetector', { photoUri: capturedPhoto,  isFrontCamera: facing === 'front', zoom: zoom })} />
          </View>
        </Modal>

      </SafeAreaView>
    </NativeBaseProvider>
  );
}