import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Link,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import SvgUri from 'expo-svg-uri';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import GetJWT from '../services/getJWS';

import {useSelector} from 'react-redux';
const Statistics = () => {
  const jwt = useSelector(state => state.jwt);
  const [year, setYear] = React.useState(2021);
  const [month, setMonth] = React.useState(6);
  let options = {
    month: 'long',
  };
  const [url, setUrl] = React.useState(
    `https://budgetapp.digitalcube.rs/api/transactions/statistics?year=${year}&month=${month}`,
  );

  const {data, error} = GetJWT(url, jwt);
  console.log('statistics/data', data);
  const moveMonths = differ => {
    if (differ === 1 || differ === -1) {
      let newMonth = parseInt(month) + differ;
      let newYear = parseInt(year);
      if (newMonth === 13) {
        newMonth = 1;
        newYear++;
      }
      if (newMonth === 0) {
        newMonth = 12;
        newYear--;
      }

      setYear(newYear);
      setMonth(newMonth);
      setUrl(
        `https://budgetapp.digitalcube.rs/api/transactions/statistics?year=${year}&month=${month}`,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      <ScrollView>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logo}
          resizeMode={'cover'}
        />
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: 'Lato-Bold',
                fontSize: 28,
                paddingLeft: 19,
                paddingTop: 20,
              }}>
              {month} {year}
            </Text>
          </View>

          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              position: 'relative',
              right: 30,
              top: -30,
            }}>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
                border: 'none',
                position: 'absolute',
                right: 30,
              }}
              onPress={() => moveMonths(-1)}>
              <Text>{'<'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
                border: 'none',
              }}
              onPress={() => moveMonths(1)}>
              <Text>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {data && (
            <View
              style={{
                marginTop: 15,
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text>
                <Text>
                  Total Spent in{' '}
                  {month.toLocaleString('default', {month: 'long'})}
                </Text>
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  lineHeight: 16,
                  fontFamily: 'Lato-Regular',
                }}></Text>
              <Text
                style={{
                  paddingTop: 6,
                  fontSize: 20,
                  lineHeight: 24,
                  paddingBottom: 10,
                  fontFamily: 'Lato-Bold',
                  color: '#5E9C60',
                  textAlign: 'center',
                }}>
                {data.income - data.outcome}{' '}
                <Text
                  style={{
                    fontSize: 12,
                  }}>
                  RSD
                </Text>
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            marginTop: 15,
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#F5F5F5',
            width: width - 40,
            borderRadius: 10,
          }}>
          {data && (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 12,
                  lineHeight: 14,
                  fontFamily: 'Lato-Regular',
                }}>
                Expenses
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 6,
                  fontSize: 20,
                  lineHeight: 24,
                  paddingBottom: 12,
                  fontFamily: 'Lato-Bold',
                }}>
                {data.outcome}{' '}
                <Text
                  style={{
                    fontSize: 12,
                  }}>
                  RSD
                </Text>
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#7FC48124',
            width: width - 40,
            borderRadius: 10,
          }}>
          {data && (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 10,
                  fontSize: 12,
                  lineHeight: 14,
                  fontFamily: 'Lato-Regular',
                  color: '#5E9C60',
                }}>
                Income
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 6,
                  fontSize: 20,
                  lineHeight: 24,
                  paddingBottom: 12,
                  fontFamily: 'Lato-Bold',
                  color: '#5E9C60',
                }}>
                {data.income}{' '}
                <Text
                  style={{
                    fontSize: 12,
                  }}>
                  RSD
                </Text>
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            fontSize: 14,
            lineHeight: 17,
            paddingTop: 13,
            paddingLeft: 20,
            paddingBottom: 10,
          }}>
          Most spent on
        </Text>

        <ScrollView horizontal>
          {data &&
            data.by_category.map(category => {
              return (
                <View
                  key={category.id_category}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      paddingTop: 10,
                      backgroundColor: '#FAFAFA',
                      borderRadius: 70,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',

                        fontFamily: 'Lato-Regular',
                        fontSize: 12,
                        padding: 15,
                      }}>
                      {category.category_name}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Lato-Regular',
                        fontSize: 16,
                        lineHeight: 19,
                      }}>
                      {category.amount}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingBottom: 30,
                        fontSize: 10,
                        lineHeight: 12,
                      }}>
                      RSD
                    </Text>
                    <SvgUri
                      source={{
                        uri: `https://budgetapp.digitalcube.rs/assets/icons/history/${category.category_icon}`,
                      }}
                      style={{
                        width: 33,
                        height: 34,
                        position: 'relative',
                        bottom: 20,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

    display: 'flex',
    flex: 1,
  },
  logo: {
    width: 45,
    height: 45,
    marginBottom: 19,
    marginTop: 20,
    marginLeft: 19,
  },
});
