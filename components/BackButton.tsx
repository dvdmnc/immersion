import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, Animated, Easing, ImageBackground, Button} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Asset } from 'expo-asset';

const BackButton = () => {

    return (
        <View>
            <button title={"Back"} onClick={() => {
                window.history.back();
            }}
            style={{
                backgroundColor: '#ffd700',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                position: 'fixed',
                top: '10px',
                left: '10px',
                width: '50px',
                height: '50px',
                zIndex: '1000',
            }}
            > ← </button>
        </View>
    );
};

const styles = StyleSheet.create({});

export default BackButton;