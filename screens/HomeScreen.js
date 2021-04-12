import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postsandcomments: [],
      justposts: []
    }
    //console.log("HI! I need some state here so I can show lots of posts!")
    this.getPosts()
  }

  getPosts = () => {
    fetch("https://webdev.cse.buffalo.edu/hci/mixtape/api/api/posts", {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
      .then(res => res.json())
      .then(result => {
        //console.log(result)
        this.setState({
          postsandcomments: result[0]
        })
      })
  }

  logout = () => {
    // See if there's a session data stored on the phone and set whatever is there to the state
    SecureStore.deleteItemAsync('session').then(() => {
      console.log("You have been logged out!.");
    });
  }

  removecommentsfromlist = () => {
    var holderarray = []
    const allposts = this.state.postsandcomments;

    allposts.forEach(post => {
      if (post['parent'] == null) {
        holderarray.push(post)
      }
    });

    return holderarray
  }

  testloop = (array) => {
    console.log(array)
    var exampleret = array.map(post => (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Title : {post['content'].split("/split")[0]}</Text>
        {post['thumbnailURL'] ?
          <Image
            source={{ uri: post['thumbnailURL'].split(',')[0] }}
            style={styles.welcomeImage}
          /> : null}
        <Text style={styles.cardTitle}>Prep Time:  {post['content'].split("/split")[1] + " Minutes"}</Text>
        <Text style={styles.cardTitle}>Ingredients:</Text>
        <Text style={styles.cardContent}>{post['content'].split("/split")[2].replace(/,/g, "\n")}</Text>
        <Text style={styles.cardTitle}>Steps: </Text>
        <Text style={styles.cardContent}>{post['content'].split("/split")[3].replace(/,/g, "\n")}</Text>
      </View>
    ))
    return exampleret
  }

  render() {
    //console.log("Loading posts...")
    //console.log(this.state.posts)

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.welcomeImage}
          />
          {this.testloop(this.removecommentsfromlist())}
        </ScrollView>
        <Button title="Log Out" onPress={() => this.logout()} />
      </View>

    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  welcomeImage: {
    width: 300,
    height: 240,
    resizeMode: 'contain',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  card: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#e5e4e4',
    padding: 10,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: '#500000'
  },
  cardContent: {
    fontSize: 18,
    marginBottom: 10,
    color: '#500000'
  },
  cardDescription: {
    fontSize: 12
  }
});