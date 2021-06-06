import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  SectionList,
  StatusBar,
  Button,
} from 'react-native';

import moment from 'moment';

const {width, height} = Dimensions.get('window');

import GetJWT from '../services/getJWS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

const Wallet = ({navigation}) => {
  const [page, setPage] = React.useState(1);

  const [refreshing, setRefreshing] = React.useState(false);

  const [url, setUrl] = React.useState(
    `https://budgetapp.digitalcube.rs/api/transactions?page=${page}&per_page=20`,
  );
  const jwt = useSelector(state => state.jwt);
  const {data, error} = GetJWT(url, jwt);
  console.log('wallet/data', data);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logo}
        resizeMode={'cover'}
      />
      <Text style={styles.title}>Current Balance</Text>
      <Text style={styles.amount}>
        {data && data.summary.balance} <Text style={styles.currency}>RSD</Text>
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AddIncome')}>
          <Text style={styles.btntext}>Add an income </Text>
          <Icon name={'plus'} style={[styles.plus]} size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddExpanse')}
          style={[styles.btn, {backgroundColor: '#FDECEC', marginLeft: 24}]}>
          <Text style={[styles.btntext, {color: '#E35959'}]}>
            Add an expanse{' '}
          </Text>
          <Icon name={'minus'} size={16} style={styles.minus} />
        </TouchableOpacity>
      </View>

      <View style={styles.history}>
        <Text style={styles.titleSub}>History</Text>

        {data &&
          data.transactions.map(transaction => (
            <FlatList
              data={data.transactions}
              extraData={data.transactions}
              onEndReachedThreshold={0.05}
              keyExtractor={item => item.id.toString()}
              initialNumToRender={10}
              scrollEnabled
              nestedScrollEnabled
              refreshControl={<RefreshControl refreshing={refreshing} />}
              enableEmptySections={false}
              renderItem={({item, index}) => (
                <View style={styles.flexContain}>
                  <View style={styles.elementContain}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 19,
                            fontFamily: 'Lato-Bold',
                            textAlign: 'center',
                          }}>
                          {moment(item.created).format('DD')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            lineHeight: 12,
                            fontFamily: 'Lato-Regular',
                            textAlign: 'center',
                          }}>
                          {moment(item.created).format('MMMM')}
                        </Text>
                      </View>
                      <Image
                        source={{
                          uri: `https://budgetapp.digitalcube.rs/assets/icons/history/${item.icon_png}`,
                        }}
                        style={{width: 28, height: 28, marginLeft: 16}}
                      />
                    </View>
                    <View
                      style={{
                        flex: 2,
                        alignItems: 'flex-end',
                        alignContent: 'flex-end',
                        alignSelf: 'flex-end',
                        position: 'relative',
                        top: -5,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 16,
                          fontFamily: 'Lato-Regular',
                        }}>
                        {item.description}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Lato-Bold',
                        }}>
                        {item.amount} <Text style={{fontSize: 12}}> RSD </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ))}

        <View>
          <Text style={{textAlign: 'center', marginTop: 10}}>{error}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  elementContain: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  flexContain: {
    flex: 1,
    flexGrow: 0,
  },
  currency: {
    fontSize: 16,
    lineHeight: 19,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  history: {
    borderTopColor: '#ccc',
    marginTop: 33,
    width: width - 30,
    marginLeft: 19,
    marginRight: 19,
    borderTopWidth: 2,
  },
  titleSub: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Lato-Regular',
    color: '#1C092C',
    textAlign: 'left',
    paddingTop: 18,
    paddingBottom: 18,
  },
  btn: {
    backgroundColor: '#F2F9F2',
    borderRadius: 14,
    paddingLeft: 11,
    flexDirection: 'row',
  },
  btntext: {
    color: '#5E9C60',
    paddingTop: 21,
    paddingBottom: 21,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 17,
  },
  amount: {
    paddingTop: 30,
    fontSize: 30,
    lineHeight: 36,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    color: '#5E9C60',
  },
  logo: {
    width: 45,
    height: 45,
    marginBottom: 19,
    marginTop: 40,
    marginLeft: 19,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 43,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: '#5E9C60',
    backgroundColor: 'rgba(217, 239, 217, 0.6)',
    padding: 15,
    alignSelf: 'center',
    margin: 6,
    textAlign: 'center',
    borderRadius: 14,
  },
  minus: {
    color: '#E35959',
    backgroundColor: 'rgba(249, 196, 196, 0.6)',
    padding: 15,
    alignSelf: 'center',
    margin: 6,
    textAlign: 'center',
    borderRadius: 14,
  },
});
