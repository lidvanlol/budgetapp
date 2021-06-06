import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {removeJWT} from '../redux/actions';
const More = ({navigation}) => {
  const idtenant = '83fb2dd8-1620-4516-a79d-0a721ea8e0d9';

  const [error, setError] = React.useState('');
  const [isPending, setIsPending] = React.useState(false);
  const jwt = useSelector(state => state.jwt);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsPending(true);
    setError('');

    const url = `https://budgetapp.digitalcube.rs/api/tenants/${idtenant}/sessions`;

    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: jwt,
      },
    };

    let response = await fetch(url, fetchOptions);
    // console.log(response)

    if (response.ok) {
      dispatch(removeJWT());

      setIsPending(false);

      navigation.navigate('Login');
    }

    if (response.status === 404) {
      setError('Error 404');

      setIsPending(false);
    }

    if (response.status === 401) {
      setError('Credential Error');

      setIsPending(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      <View>
        <Image
          style={{width: 388, height: 305}}
          source={require('../../assets/logut.png')}
        />
        <Text style={styles.title}>
          We hope Budget App has lived {'\n'} up to your expectations
        </Text>
        <Text style={styles.subtitle}>
          Our main priority is to improve your budget
        </Text>
        {isPending ? (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text> {error} </Text>
    </SafeAreaView>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 4,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    paddingBottom: 80,
  },
  button: {backgroundColor: '#5E9C60', borderRadius: 10, padding: 15},
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 16,
    fontSize: 16,
  },
});
