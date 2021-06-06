import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {Link} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {FloatingLabelInput} from 'react-native-floating-label-input';
const {width, height} = Dimensions.get('window');
import {useDispatch} from 'react-redux';
import {addJWT} from '../redux/actions';
const Register = ({navigation}) => {
  const idtenant = '83fb2dd8-1620-4516-a79d-0a721ea8e0d9';
  const [error, setError] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [isPending, setIsPending] = React.useState(false);
  const [hidePass, setHidePass] = React.useState(true);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);
  const dispach = useDispatch();

  async function handleButtonPress() {
    if (!username.trim()) {
      alert('Please Enter username');
      return;
    } else if (!password.trim()) {
      alert('Please Enter password');
      return;
    } else if (!firstName.trim()) {
      alert('Please Enter First Name');
      return;
    } else if (!lastName.trim()) {
      alert('Please Enter Last Name');
      return;
    } else {
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    setIsPending(true);
    setError('');

    const userDetails = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };

    const url = `https://budgetapp.digitalcube.rs/api/tenants/${idtenant}/users`;

    const fetchOptions = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userDetails),
    };

    let response = await fetch(url, fetchOptions);
    console.log(response);

    if (response.status === 201) {
      let data = await response.json();

      dispach(addJWT(data.token));

      setIsPending(false);

      navigation.navigate('Wallet');
    }

    if (response.status === 400) {
      setError('Parameter is not valid ');

      setIsPending(false);
    }

    if (response.status === 406) {
      setError('User is already created');

      setIsPending(false);
    }

    if (response.status === 404) {
      setError('Id tenant is not valid');

      setIsPending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      <View style={{width: width, paddingLeft: 19, paddingRight: 19}}>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logo}
          resizeMode={'cover'}
        />

        <Text style={styles.title}>Welcome to Budget App</Text>
        <Text style={styles.subtitle}>Fill in fields to continue</Text>

        <Text>{error}</Text>
        <View styles={styles.width}>
          <TextInput
            style={[styles.input, {fontFamily: 'Lato-Regular'}]}
            label="Username*"
            value={username}
            onChangeText={username => setUsername(username)}
            required
            autoCapitalize="none"
            theme={{
              colors: {
                primary: 'green',
                underlineColor: 'black',
                background: 'transparent',
              },
            }}
          />

          <View style={{flexDirection: 'row', position: 'relative'}}>
            <TextInput
              style={{width: width - 40}}
              autoCapitalize="none"
              label="Password*"
              onChangeText={password => setPassword(password)}
              autoCompleteType="password"
              secureTextEntry={hidePass ? true : false}
              theme={{
                colors: {
                  primary: 'green',
                  underlineColor: 'black',
                  background: 'transparent',
                },
              }}
            />
            <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
              style={styles.eye}
            />
          </View>

          <TextInput
            style={[styles.input, {fontFamily: 'Lato-Regular'}]}
            label="Name*"
            value={firstName}
            onChangeText={firstName => setFirstName(firstName)}
            required
            autoCapitalize="none"
            theme={{colors: {primary: 'green', underlineColor: 'black'}}}
          />
          <TextInput
            style={[styles.input, {fontFamily: 'Lato-Regular'}]}
            label="Last Name*"
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}
            required
            autoCapitalize="none"
            theme={{colors: {primary: 'green', underlineColor: 'black'}}}
          />

          {isPending ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}
          <View style={styles.acc}>
            <Text>Already have an account? </Text>
            <Link to="/Login" style={styles.reg}>
              Login
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    marginBottom: 27,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  acc: {
    textAlign: 'center',
    paddingTop: 14,
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    lineHeight: 16,
    paddingRight: 5,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 4,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  input: {
    marginBottom: 20,
    borderColor: '#5E9C60',
    width: width - 40,
  },
  button: {backgroundColor: '#5E9C60', borderRadius: 10, padding: 15},
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 16,
    fontSize: 16,
  },
  container: {
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  reg: {
    color: '#5E9C60',
    paddingLeft: 5,
  },
  eye: {
    position: 'absolute',
    bottom: 6,
    right: 10,
  },
  forgotpass: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Lato-Bold',
    color: '#5E9C60',

    paddingLeft: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  labelStyle: {
    position: 'absolute',
    left: 0,
  },
  textInput: {
    height: 20,
    fontSize: 15,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  focusedTextInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
});
