// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromAPI, getImageFromAPI } from '../API/TMDBkey';




class FilmDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            film: undefined,
            isloading: true
         }
    }
    componentDidMount(){
        console.log("Component FilmDetail monté")
        id = this.props.navigation.state.params.idFilm
        getFilmDetailFromAPI(id).then(data =>{
            this.setState({
                film: data,
                isloading: false
            })
        }) 
    }
    
    
    _displayloading(){
        if(this.state.isloading){
          return(
           <View style={styles.loading_container}>
           <ActivityIndicator size="small"/>
         </View>
          )
        }
      } 
      _displayFilm(){
        if(this.state.film != undefined){
            return (
                <ScrollView style ={styles.scrollview_container}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromAPI(this.state.film.backdrop_path)}}
                />
                
                    <Text style={styles.title_text}>
                        {this.state.film.title}
                    </Text>
                    <Text style={styles.default_text}>
                        Date de sortie: {this.state.film.release_date}
                    </Text>
                    <Text style={styles.description_text}>
                        {this.state.film.overview}
                    </Text>
                    <Text style={styles.note}>
                        {this.state.film.vote_average}/10
                    </Text>
                              {/* Pour l'instant je n'affiche que le titre, je vous laisserais le soin de créer la vue. Après tout vous êtes aussi là pour ça non ? :)*/}
                 </ScrollView>   
                 
            )
        }
    }
      render() {
    console.log("Component FilmDetail rendu")
    return (
      <View style={styles.main_container}>
        {this._displayloading()}
        {this._displayFilm()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  scrollview_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent:'center'
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 10,
    marginBottom: 15,
    textAlign: 'justify'
  },
  default_text: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 10
  },
  note: {
     color:'#666666',
     fontWeight: 'bold',
     fontSize: 48,
     textAlign: 'center' 
  }
})
  export default FilmDetail
