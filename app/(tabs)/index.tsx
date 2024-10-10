import React from "react";
import {Animated, StyleSheet, TouchableOpacity, Text, Button} from "react-native";
import View = Animated.View;

export default function AdminPage() {

  const [plats, setPlats] = React.useState([]);





  return (
      <View style={styles.container}>
        <Text style={styles.header}>Admin Dashboard</Text>

        <View style={styles.grid}>
          <View>
            <TouchableOpacity style={styles.tile}/>
            <Text style={styles.tileText}>Menu</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.tile}/>
            <Text style={styles.tileText}>Avis</Text>
            </View>

          <View>
            <TouchableOpacity style={styles.tile}/>
            <Text style={styles.tileText}>Plat</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.tile}/>
            <Text style={styles.tileText}>Dessert</Text>
          </View>
        </View>

        <TouchableOpacity onPress={()=>{
            console.log('click')
        }} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startText}>Démarrer</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505050',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  tile: {
    backgroundColor: '#d3d3d3',
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  tileText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  addText: {
    color: 'black',
    fontSize: 40,
  },
  startButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});