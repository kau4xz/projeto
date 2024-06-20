import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function CameraTela() {
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}>
          Precisamos da sua permissão para acessar a Câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlash() {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }

  function closeCamera() {
    navigation.navigate('TelaInicial');
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing={facing} />
      <TouchableOpacity onPress={closeCamera} style={{ position: 'absolute', top: 60, left: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: 20, 
          padding: 2  }}>
        <Ionicons name="close-outline" size={30} color="white" />
      </TouchableOpacity>

      <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={toggleCameraFacing} >
          <Ionicons name="camera-reverse-outline" size={30} color="white" />
        </TouchableOpacity>

        <View 
          style={{
            width: 70,
            height: 70,
            borderRadius: 40,
            borderWidth: 3,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        <TouchableOpacity onPress={() => { /* ação do botão de captura */ }} style={{ width: 60, height: 60, 
          backgroundColor: 'white', borderRadius: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="camera-outline" size={30} color="white" />
        </TouchableOpacity>

        </View>

        <TouchableOpacity onPress={toggleFlash} >
          <Ionicons name={flash === 'off' ? 'flash-off-outline' : 'flash-outline'} size={30} color="white" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
