import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing, ImageBackground } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Asset } from 'expo-asset';
import BackButton from "@/components/BackButton";


const backgroundImage = Asset.fromModule(require('../../assets/images/background.jpg')).uri;
const burgerImage = Asset.fromModule(require('../../assets/images/burger.png')).uri;


const DetailPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const floatAnim = useRef(new Animated.Value(0)).current;

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
        })
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

  return (
    <ImageBackground 
    source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />
        <Animated.Image
         source={{ uri: burgerImage }}
          style={[
            styles.image,
            {
              transform: [
                { perspective: 1000 },
                { translateY },
                { rotateX },
                { scale },
              ],
            },
          ]}
          resizeMode="contain"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>Title of the Page</Text>
          <Text style={styles.subtitle}>Subtitle goes here</Text>
          
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>

          <View style={styles.quizContainer}>
            <Text style={styles.quizQuestion}>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
            <RadioButton.Group onValueChange={newValue => setSelectedOption(newValue)} value={selectedOption}>
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

        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: 15,
                margin: 10,
              justifyContent: 'center',
                alignItems: 'center',
              flexWrap: 'wrap',
            }}
        >
          //Make two button with arrows going left and right
          <button title={"Back"} onClick={() => {
            window.history.back();

          }
            }
            style={{
              backgroundColor: '#ffd700',
              color: 'white',
              fontSize: '40px',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            > ← </button>
            <button title={"Next"} onClick={() => {
                window.history.forward();
            }
            }
            style={{
              backgroundColor: '#ffd700',
              color: 'white',
              fontSize: '40px',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '5px',
            }}
            > → </button>

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
  image: {
    width: '100%',
    height: '60%',
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
});

export default DetailPage;