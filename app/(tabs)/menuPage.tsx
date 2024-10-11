import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageSourcePropType, Animated, ImageBackground } from 'react-native';
import { Asset } from 'expo-asset';

const backgroundImage = Asset.fromModule(require('../../assets/images/background.jpg')).uri;

interface MenuItemProps {
  title: string;
  subtitle: string;
  imageSource: ImageSourcePropType;
  animatedStyle?: Animated.AnimatedProps<any>;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subtitle, imageSource, animatedStyle }) => (
  <View style={styles.menuItemContainer}>
    <View style={styles.menuItem}>
      <Animated.Image source={imageSource} style={[styles.menuItemImage, animatedStyle]} />
      <View style={styles.menuItemText}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
      </View>
    </View>
  </View>
);

const MenuScreen = () => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotationValue]);

  const rotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotateY: rotation }],
  };

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
          
          <MenuItem 
            title="Entrée" 
            subtitle="Frites" 
            imageSource={require('../../assets/images/6154401.webp')} 
            animatedStyle={animatedStyle}
          />
          <MenuItem 
            title="Plat principale" 
            subtitle="Burger" 
            imageSource={require('../../assets/images/6154401.webp')} 
            animatedStyle={animatedStyle}
          />
          <MenuItem 
            title="Fromage" 
            subtitle="Fromage" 
            imageSource={require('../../assets/images/6154401.webp')} 
            animatedStyle={animatedStyle}
          />
          <MenuItem 
            title="Dessert" 
            subtitle="Cake" 
            imageSource={require('../../assets/images/6154401.webp')} 
            animatedStyle={animatedStyle}
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
  logo: {
    width: '100%',
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
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
  menuItemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ffd700',
    backgroundColor:'#0006',
    borderRadius: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
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