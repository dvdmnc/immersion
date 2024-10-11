import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, TouchableOpacity, Text, Button, TextInput, ImageBackground, Image} from "react-native";
import View = Animated.View;
import useMenu from "@/hooks/useMenu";


const MenuCreateForm = () => {
  const { addMenuItem } = useMenu();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const handleCreate = () => {
    const newItem = { title, subtitle, image,url };
    addMenuItem(newItem);
    setTitle("");
    setSubtitle("");
    setImage("");
    setUrl("");
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
        <button style={{
            backgroundColor: '#ffd700',
            padding: 10,
            borderRadius: 5,
            width: '100%',
            textAlign: 'center',
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
        }} title="Create" onClick={()=>{
          handleCreate();
          window.location.reload();
        }}> Créer </button>

      </View>
  );
}

export default function AdminPage() {

  const {menu, addMenuItem, deleteMenuItem} = useMenu();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {}, []);


  return (
      <>
      <Image
          source={{ uri: "../../assets/images/background.jpg" }}
          style={styles.backgroundImage}
      />
      <View style={styles.container}>

        <Text style={styles.header}>Admin Dashboard</Text>
        <View style={styles.grid}>
          <View>
            <a href={"menuPage"}>
              <ImageBackground
                  source={{uri: "https://img.freepik.com/premium-vector/food-menu-food-recipe-logo-design-template-spoon-fork-with-old-paper-scroll-vintage-vector_567423-1075.jpg"}}
                  style={styles.tile}
                  imageStyle={{borderRadius: 10}} // To ensure image fits with rounded corners
              >
              </ImageBackground>
            </a>
              <Text style={styles.tileText}>Menu</Text>

          </View>
          <View>
          <a href={"AvisPage"}>
          <ImageBackground
              source={{uri: "https://img.netty.fr/laroque/assets/teaserbox2462893046.png"}}
              style={styles.tile}
              imageStyle={{ borderRadius: 10 }} // To ensure image fits with rounded corners
          >

          </ImageBackground>
          </a>
          <Text style={styles.tileText}>Avis</Text>
        </View>




          {menu.map((item, index) => (
              <View key={index}>
                <a href={"/details"}>


                <ImageBackground
                    source={{ uri: item.image }}
                    style={styles.tile}
                    imageStyle={{ borderRadius: 10 }} // To ensure image fits with rounded corners
                >
                </ImageBackground>
                </a>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                }}>
                  <Text style={styles.tileText}>{item.title}</Text>

                  <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => {
                        deleteMenuItem(index);
                        window.location.reload();
                      }}
                  >
                    -
                  </TouchableOpacity>
                </View>

              </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => { setShowForm(!showForm) }} style={styles.addButton}>
         +
        </TouchableOpacity>

        <TouchableOpacity  style={{
          backgroundColor: '#ffd700',
          padding: 10,
          borderRadius: 5,
          width: '100%',
          textAlign: 'center',
        }}
        onPress={() => {
          window.location.href = "/detailsPage";
        }}
        >
          Lancer
        </TouchableOpacity>

        {showForm && <MenuCreateForm/>}


      </View>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    opacity: 0.8,
    width: '100vw',
    height: '100vh',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffd700'
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
    backgroundColor: '#ffd700',
    fontSize: 40,
  },
  addText: {
    color: 'black',
    fontSize: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4646',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    fontSize: 29,
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

  },
  backgroundImage: {
    width: '100vw',
    height: '100vh',
    opacity: 0.1,
  },
  backgroundImageStyle: {
    opacity: 0.1,
    resizeMode: 'repeat',
  },

});
