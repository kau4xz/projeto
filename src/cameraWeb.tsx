import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  // ... seus estilos para a câmera web ...
  container: {
    flex: 1,
    position: 'relative', // Para posicionar o botão
  },
  camera: {
    width: '100%',
    height: '100%', // Ocupar toda a área do container
  },
  captureButton: {
    position: 'absolute', // Posicionar o botão sobre o vídeo
    bottom: 20,
    alignSelf: 'center', 
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CameraWeb = ({ onCapture }) => {
    const videoRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
  
    useEffect(() => {
      const getCameraStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setMediaStream(stream);
        } catch (error) {
          console.error('Erro ao acessar a câmera:', error);
          // Lide com o erro, talvez exiba uma mensagem para o usuário
        }
      };
  
      getCameraStream();
  
      return () => {
        // Limpar o stream da câmera quando o componente for desmontado
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }
      };
    }, []);
  
    const capture = async () => {
      if (videoRef.current && mediaStream) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        const imageSrc = canvas.toDataURL('image/jpeg');
        onCapture(imageSrc);
      }
    };
  
    return (
      <View style={styles.container}>
      {mediaStream && (
        <video ref={videoRef} autoPlay playsInline style={styles.camera} srcObject={mediaStream} />
      )}
      <TouchableOpacity style={styles.captureButton} onPress={capture}>
        <Ionicons name="camera-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
    );
  };
  
export default CameraWeb;