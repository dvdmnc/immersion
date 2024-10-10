import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, TouchableOpacity, Text, Button, TextInput, ImageBackground} from "react-native";
import View = Animated.View;
import useMenu from "@/hooks/useMenu";


const MenuCreateForm = () => {
  const { addMenuItem } = useMenu();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");

  const handleCreate = () => {
    const newItem = { title, subtitle, image };
    addMenuItem(newItem);
    setTitle("");
    setSubtitle("");
    setImage("");
  };
  return (
      <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
            position: 'absolute',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
      >
        <Text>Menu Create Form</Text>
        <TextInput
            style={styles.field}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
        />
        <TextInput
            style={styles.field}
            placeholder="Subtitle"
            value={subtitle}
            onChangeText={setSubtitle}
        />
        <TextInput
            style={styles.field}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
        />
        <Button title="Create" onPress={()=>{
          handleCreate();
          window.location.reload();
        }}/>
      </View>
  );
}

export default function AdminPage() {

  const {menu, addMenuItem, deleteMenuItem} = useMenu();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {}, []);

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Admin Dashboard</Text>
        <View style={styles.grid}>
        <View>
          <ImageBackground
              source={{uri: "https://img.freepik.com/premium-vector/food-menu-food-recipe-logo-design-template-spoon-fork-with-old-paper-scroll-vintage-vector_567423-1075.jpg"}}
              style={styles.tile}
              imageStyle={{ borderRadius: 10 }} // To ensure image fits with rounded corners
          >
          </ImageBackground>
          <Text style={styles.tileText}>Menu</Text>

        </View>
        <View>
          <ImageBackground
              source={{uri: "https://img.netty.fr/laroque/assets/teaserbox2462893046.png"}}
              style={styles.tile}
              imageStyle={{ borderRadius: 10 }} // To ensure image fits with rounded corners
          >

          </ImageBackground>
          <Text style={styles.tileText}>Avis</Text>
        </View>




          {menu.map((item, index) => (
              <View key={index}>
                <ImageBackground
                    source={{ uri: item.image }}
                    style={styles.tile}
                    imageStyle={{ borderRadius: 10 }} // To ensure image fits with rounded corners
                >
                </ImageBackground>
                <Text style={styles.tileText}>{item.title}</Text>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      deleteMenuItem(index);
                      window.location.reload();
                    }}
                >
                  <Text style={styles.deleteText}>-</Text>
                </TouchableOpacity>
              </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => { setShowForm(!showForm) }} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>

        {showForm && <MenuCreateForm/>}
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
    overflow: 'hidden', // To make sure the image stays within rounded corners
  },
  tileText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
  },
  addText: {
    color: 'black',
    fontSize: 40,
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  deleteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  field: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  }
});
