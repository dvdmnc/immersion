import React from 'react'
import { View, StyleSheet, Image, TextInput } from 'react-native'
import BackButton from "../../../components/BackButton";

function Details() {
  return (
    <>
    <Image source={require('../../../assets/images/background.jpg')} style={styles.backgroundImg}/>
      <View style={styles.container}>
        <BackButton />
        <h1 style={styles.Title}>Admin Dashboard</h1>
        <View style={styles.content}>
          <TextInput type='text' placeholder='Titre'  placeholderTextColor={'black'} style={styles.input}/>
          <View>
            <input type='file' />
            <button style={styles.polycam}><Image source={require('../../../assets/images/polycam.jpg')} style={styles.img}/>Polycam</button>
          </View>
          <TextInput placeholderTextColor={'black'} multiline='true' numberOfLines={4} placeholder='Description' rows={10} cols={5} style={styles.input}></TextInput>
          <View style={styles.quizContainer}>
            <h1 style={styles.Title}>--- Quiz ----</h1>
            <View style={styles.toGenerate}>
              <TextInput placeholderTextColor={'black'} type='text' placeholder='Theme' style={styles.input}/>
              <button style={styles.generate}><Image source={require('../../../assets/images/etoiles.png')} />Generate</button>
            </View>
            <View style={styles.quizContent}>
              <p>Ici s'affichera la question du quiz généré par Intelligence Artificielle ?</p>
              <div>
                <input type="radio" id="answer1" name="answer1" value="answer1" checked style={styles.input}/>
                <label htmlFor="answer1">Huey</label>
              </div>

              <div>
                <input type="radio" id="answer2" name="answer2" value="answer2" style={styles.input}/>
                <label htmlFor="answer2">Answer 2</label>
              </div>

              <div>
                <input type="radio" id="answer3" name="answer3" value="answer3" style={styles.input}/>
                <label htmlFor="answer3">Answer 3</label>
              </div>
              <button style={styles.valider}>Valider</button>
            </View>
          </View>
        </View>
    </View>
    </>
  )
}

export default Details

const styles = StyleSheet.create({
  backgroundImg:{
    width:'100vw',
    height:'100vh',
    opacity:0.1,
  },
  container:{
    position:'absolute',
    display:'flex',
    justifyContent:'center',
    width:'100vw',
    height:'100vh',
    backgroundColor:'black',
    opacity:0.8,
    color:'white',
    padding:20,
    flexDirection:'column',
    gap:6,
    fontFamily:'monospace',
  },
  Title:{
    margin:'auto',
    color:'#FFD700'
  },
  content:{
    width:'80vw',
    margin:'auto',
    gap:6
  },
  quizContainer:{
    gap:6
  },
  polycam:{
    color:'black',
    backgroundColor:'white',
    padding:4,
    fontSize:'12px',
    display:'flex',
    flexDirection:'row',
    gap:2,
    alignItems:'center',
    justifyContent:'center',
    width:'40%',
    alignSelf:'flex-end',
    borderRadius:6
  },
  img:{
    width:20,
    height:20
  },
  input:{
    backgroundColor:'lightgray',
    padding:6,
    borderRadius:6
  },
  generate:{
    padding:4,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    fontSize:'12px',
    gap:4,
    width:'40%',
    backgroundColor:'#FFD700',
    color:'white',
    alignSelf:'flex-end',
    borderWidth:0,
    borderRadius:6
  },
  toGenerate:{
    gap:4,
  },
  valider:{
    backgroundColor:'green',
    padding:4,
    width:'50%',
    alignSelf:'center',
    marginTop:5,
    borderWidth:0,
    color:'white',
    borderRadius:6
  },
  quizContent:{
    gap:4
  }
})