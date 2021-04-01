import React from 'react'
import { StyleSheet, Button, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBkey';
import Store from './Store';


class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isloading: false
    }
  }
  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
}


  _loadFilms() {
    this.setState({isloading: true})
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages  
        this.setState({ 
            films: this.state.films.concat(data.results), // ... crée une copie et dans un tableau pour concaténer
            isloading: false
          })
      })
    }
  }
 _displayloading(){
   if(this.state.isloading){
     return(
      <View style={[styles.loading_container]}>
      <ActivityIndicator size="small"/>
    </View>
     )
   }
 } 
  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }
  _searchFilms(){
    this.page = 0
    this.totalPages =0
    this.setState({
      films: []
    }, () => {    this._loadFilms()})
  }
  render() {
    console.log(this.props)
    return (
      <Store>
        <View style={styles.main_container}>
          <TextInput
            style={styles.textinput}
            placeholder='Titre du film'
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing={() => this._searchFilms}
          />
          <Button title='Rechercher' onPress={() => this._searchFilms()}/>
          <FlatList
            data={this.state.films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
            onEndReachedThreshold ={0.75}
            onEndReached = {() => { 
              if (this.page < this.totalPages){
                this._loadFilms()
              }
            }}
          />
          {this._displayloading()}
        </View>
      </Store>
    )
  }
}
export default Search
const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent:'center'
  }
})
