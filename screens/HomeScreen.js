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

    console.log("HI! I need some state here so I can show lots of posts!")
  }

  logout = () => {
    // See if there's a session data stored on the phone and set whatever is there to the state
    SecureStore.deleteItemAsync('session').then(() => {
      console.log("You have been logged out!.");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Card Title</Text>
            <Text style={styles.cardDescription}>Card Description</Text>
          </View>
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
  card: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  cardDescription: {
    fontSize: 12
  }
});