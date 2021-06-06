import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {RadioButton, Text, TextInput} from 'react-native-paper';
import GetJWT from '../services/getJWS';
import fetchJWS from '../services/fetchJWS';
import {useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
const AddIncome = ({navigation, filename}) => {
  const url = `https://budgetapp.digitalcube.rs/api/transactions/categories?category_type=income`;
  const jwt = useSelector(state => state.jwt);
  const {data: expanseList, error} = GetJWT(url, jwt);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expanseCategory, setExpanseCategory] = useState('');
  const url2 = `https://budgetapp.digitalcube.rs/api/transactions`;
  const {sendData} = fetchJWS(url2, jwt);
  const [sendError, setSendError] = useState(null);
  console.log('income/data', expanseList);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);

    let inputObject = {
      amount: parseInt(amount),
      category: expanseCategory,
      currency: 'RSD',
      description: description,
    };

    console.log('input expanse', inputObject);

    let answer = await sendData(inputObject);

    setIsPending(false);

    if (answer !== 'Added') {
      setSendError(answer);
      // console.log(answer)
    } else {
      navigation.push('Wallet', inputObject);
    }
  };

  async function handleButtonPress() {
    if (!amount.trim()) {
      alert('Please Enter Amount');
      return;
    } else if (!description.trim()) {
      alert('Please Enter Description');
      return;
    } else {
      handleSubmit();
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <Text
          {...props}
          style={{
            color: 'rgba(16, 16, 16, 0.85)',
            fontFamily: 'Lato-Bold',
            alignSelf: 'center',
            paddingRight: 50,
          }}>
          Add an income
        </Text>
      ),
      headerLeft: () => (
        <Ionicons
          name="chevron-back"
          size={26}
          color="#000"
          style={{paddingLeft: 25}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),

      headerStyle: {
        backgroundColor: '#fff',
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      <View style={{marginRight: 25, marginLeft: 25}}>
        <View style={{flexDirection: 'row', position: 'relative'}}>
          <TextInput
            type="text"
            style={{
              backgroundColor: '#fff',
              marginBottom: 20,
              marginTop: 20,
              width: width - 40,
            }}
            placeholder="Enter amount here"
            required
            onChangeText={amount => setAmount(amount)}
            value={amount}
            keyboardType="numeric"
            theme={{
              colors: {
                primary: 'green',
                underlineColor: 'black',
                backgroundColor: 'transparent',
              },
            }}
          />

          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 12,
              position: 'absolute',
              lineHeight: 14,
              right: 0,
              bottom: 30,
              color: '#00000099',
            }}>
            RSD
          </Text>
        </View>

        <TextInput
          type="text"
          placeholder="Enter description"
          required
          style={{backgroundColor: '#fff'}}
          onChangeText={description => setDescription(description)}
          value={description}
          keyboardType="default"
          theme={{
            colors: {
              primary: 'green',
              underlineColor: 'black',
              backgroundColor: 'transparent',
            },
          }}
        />
        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 16, lineHeight: 19, fontFamily: 'Lato-Bold'}}>
            Choose Category
          </Text>
          <View style={{marginTop: 38, marginBottom: 18}}>
            {expanseList &&
              expanseList.map(expanse => (
                <View style={{marginBottom: 18}}>
                  <RadioButton.Group
                    onValueChange={expanseCategory =>
                      setExpanseCategory(expanseCategory)
                    }
                    value={expanseCategory}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{
                          uri: `https://budgetapp.digitalcube.rs/assets/icons/categories/${expanse.icon_png}`,
                        }}
                        style={{
                          width: 33,
                          height: 34,
                          position: 'relative',
                          top: 9,
                        }}
                      />

                      <View>
                        <Text
                          style={{
                            paddingLeft: 20,
                            paddingTop: 7,
                            fontSize: 14,
                            fontFamily: 'Lato-Regular',
                            lineHeight: 17,
                          }}>
                          {expanse.name}
                        </Text>
                        <Text
                          style={{
                            paddingLeft: 20,
                            paddingTop: 2,
                            fontSize: 12,
                            fontFamily: 'Lato-Regular',
                            lineHeight: 14,
                            color: '#00000099',
                          }}>
                          {expanse.description}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-end',

                          flex: 2,
                        }}>
                        <RadioButton
                          value={expanse.id}
                          uncheckedColor={'#000'}
                          chekedColor={'#5E9C60'}
                          color={'#5E9C60'}
                        />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
              ))}
          </View>
          {isPending ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add an Income</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={handleButtonPress}>
                Add an Income
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <Text style={{textAlign: 'center', marginTop: 10}}>
            {error} {sendError}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddIncome;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5E9C60',
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 16,
    fontSize: 16,
  },
  container: {
    backgroundColor: '#fff',

    display: 'flex',
    flex: 1,
  },
});
