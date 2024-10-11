import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing, ImageBackground } from 'react-native';
import { GLView } from 'expo-gl';
import { RadioButton } from 'react-native-paper';
import { Asset } from 'expo-asset';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const backgroundImage = Asset.fromModule(require('../../assets/images/background.jpg')).uri;
const burgerImage = Asset.fromModule(require('../../assets/images/burger.png')).uri;
const gltfModel = '../../assets/images/food.glb'; // Path to your uploaded 3D model

const DetailPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const floatAnim = useRef(new Animated.Value(0)).current;
  const modelRef = useRef(null);

  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    floatAnimation.start();
    return () => floatAnimation.stop();
  }, [floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotateX = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  const scale = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const onContextCreate = async (gl) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
  
    camera.position.z = 5; // Increase this value to show more of the model
  
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  
    const light = new THREE.AmbientLight(0xffffff, 3);
    scene.add(light);
  
    const loader = new GLTFLoader();
    loader.load(
      gltfModel,
      (gltf) => {
        modelRef.current = gltf.scene;
  
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
  
        // Adjust the scale to fit the view
        const scale = 8 / box.getSize(new THREE.Vector3()).length(); // Reduced scale factor
        gltf.scene.scale.set(scale, scale, scale);
        gltf.scene.rotation.x = Math.PI / 8; // Reduced rotation for better view
  
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading the GLB model:', error);
      }
    );
  
    const renderScene = () => {
      requestAnimationFrame(renderScene);
  
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
  
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    renderScene();
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 3D Model Display */}
        <GLView style={styles.glView} onContextCreate={onContextCreate} />

        <View style={styles.content}>
          <Text style={styles.title}>Title of the Page</Text>
          <Text style={styles.subtitle}>Subtitle goes here</Text>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <View style={styles.quizContainer}>
            <Text style={styles.quizQuestion}>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
            <RadioButton.Group onValueChange={(newValue) => setSelectedOption(newValue)} value={selectedOption}>
              <View style={styles.radioOption}>
                <RadioButton value="cheese" color="#ffd700" />
                <Text style={styles.radioText}>adipiscing</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="bacon" color="#ffd700" />
                <Text style={styles.radioText}>eiusmod</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="veggies" color="#ffd700" />
                <Text style={styles.radioText}>consectetur</Text>
              </View>
            </RadioButton.Group>
            <Text style={styles.hint}>Hint: Ask invite number 5 for help!</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.1,
    resizeMode: 'repeat',
  },
  container: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: '40%',
    marginBottom: 20,
  },
  content: {
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    margin: 10,
    marginTop: 40, // Add this line
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffd700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  quizContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ffd700',
    paddingTop: 15,
  },
  quizQuestion: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  hint: {
    color: '#ffd700',
    marginTop: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  glView: {
    width: '100%',
    height: 300, // Increased height
    marginVertical:30,
  },
});

export default DetailPage;
