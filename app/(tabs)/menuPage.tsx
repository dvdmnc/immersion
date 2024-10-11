import React, { useRef } from 'react';
import { View, Text, StyleSheet,Image, ScrollView, ImageBackground } from 'react-native';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const backgroundImage = Asset.fromModule(require('../../assets/images/background.jpg')).uri;
const entreeModel = '../../assets/images/entree.glb';
const foodModel = '../../assets/images/food.glb';
const ramenModel = '../../assets/images/Ramen.glb';
const dessertModel = '../../assets/images/dessert.glb';

const ModelDisplay = ({ modelPath, title, subtitle }) => {
  const modelRef = useRef(null);

  const onContextCreate = async (gl) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);

    camera.position.z = 5;

    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const light = new THREE.AmbientLight(0xffffff, 3);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        modelRef.current = gltf.scene;

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);

        const scale = 8 / box.getSize(new THREE.Vector3()).length();
        gltf.scene.scale.set(scale, scale, scale);
        gltf.scene.rotation.x = Math.PI / 8;

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
    <View style={styles.menuItemContainer}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
      <View style={styles.menuItemText}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const MenuScreen = () => {
  return (
    <ImageBackground 
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
    >
      <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue à notre expérience culinaire immersive!</Text>
          <Text style={styles.subtitle}>Veuillez mettre votre téléphone en mode "Ne pas déranger" pour une expérience agréable.</Text>
          
          <ModelDisplay 
            modelPath={entreeModel}
            title="Entrée" 
            subtitle="Frites" 
          />
          <ModelDisplay 
            modelPath={foodModel}
            title="Plat principale" 
            subtitle="Burger" 
          />
          <ModelDisplay 
            modelPath={ramenModel}
            title="Plat Secondaire" 
            subtitle="Ramen" 
          />
          <ModelDisplay 
            modelPath={dessertModel}
            title="Dessert" 
            subtitle="Cake" 
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
  },
  backgroundImageStyle: {
    opacity: 0.1,
    resizeMode: 'repeat',
  },
  container: {
    flexGrow: 1,
    paddingTop: 50,
  },
  content: {
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    margin: 10,
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
  logo: {
    width: '100%',
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  menuItemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ffd700',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
  },
  glView: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  menuItemText: {
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 5,
  },
  menuItemSubtitle: {
    fontSize: 18,
    color: '#fff',
  },
});

export default MenuScreen;