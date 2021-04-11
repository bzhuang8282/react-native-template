import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    // Initialize our login state
    this.state = {
      email: '',
      password: ''
    }
  }
  // On our button press, attempt to login
  // this could use some error handling!
  onSubmit = () => {
    const { email, password } = this.state;

    fetch("https://webdev.cse.buffalo.edu/hci/mixtape/api/api/auth/login", {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(`Logging in with session token: ${json.token}`);

        // enter login logic here
        SecureStore.setItemAsync('session', json.token).then(() => {
          this.props.route.params.onLoggedIn();
        },
          error => {
            console.log("Incorrect username or password.")
            this.failToLogin();
          });
      })
      .catch(exception => {
        console.log("Error occured", exception);
      })
  }

  failToLogin = () =>
    Alert.alert(
      "Incorrect Login Details",
      "Oof.",
      [
        {
          text: "Try Again",
          onPress: () => console.log("Alert Canceled."),
          style: "cancel"
        }
      ]
    );


  render() {
    const { email, password } = this.state

    // this could use some error handling!
    // the user will never know if the login failed.
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.welcomeImage}
        />
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.loginLabelText}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={text => this.setState({ email: text })}
          value={email}
          textContentType="emailAddress"
        />
        <Text style={styles.loginLabelText}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => this.onSubmit()} style={styles.loginbutton}>
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Our stylesheet, referenced by using styles.container or styles.loginText (style.property)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 30
  },
  welcomeImage: {
    width: 300,
    height: 240,
    resizeMode: 'contain',
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
    marginLeft: 15,
    marginBottom: -20
  },
  loginbutton: {
    backgroundColor: '#c3073f',
    borderRadius: 20,
    borderWidth: 1,
    textAlign: "center",
    marginLeft: 50,
    marginRight: 50
  },
  loginText:{
    color: 'maroon',
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 3,
    paddingBottom: 3
  },
  loginLabelText: {
    color: 'maroon',
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    textAlign: "center"
  },
});