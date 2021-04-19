import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import List from './List';
import Graph from './Graph';
const Home = () => {
  const [exchangeAmount, setExchangeAmount] = useState(0);
  const [currencies, setCurrencies] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHeaderBtn, setSelectedHeaderBtn] = useState('RATES');

  useEffect(() => {
    axios
      .get('https://api.ratesapi.io/api/latest')
      .then(response => {
        setCurrencies(response.data.rates);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.containerView}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <TouchableOpacity
              disabled={selectedHeaderBtn === 'RATES' ? true : false}
              style={[
                styles.HeaderBtn,
                selectedHeaderBtn === 'RATES' ? styles.HeaderBtnSelected : null,
              ]}
              onPress={() => {
                setSelectedHeaderBtn('RATES');
              }}>
              <Text style={{fontSize: 18, color: '#ffff', fontWeight: 'bold'}}>
                RATES
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={selectedHeaderBtn === 'CHARTS' ? true : false}
              style={[
                styles.HeaderBtn,
                selectedHeaderBtn === 'CHARTS'
                  ? styles.HeaderBtnSelected
                  : null,
              ]}
              onPress={() => {
                setSelectedHeaderBtn('CHARTS');
              }}>
              <Text style={{fontSize: 18, color: '#ffff', fontWeight: 'bold'}}>
                CHARTS
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#ffff'}}>
            <TextInput
              placeholder="Enter Amount (EUR)"
              style={styles.input}
              onChangeText={e => setExchangeAmount(e)}
              value={exchangeAmount}
            />
          </View>
        </>
      )}
      {currencies ? (
        selectedHeaderBtn === 'RATES' ? (
          <List
            currencies={currencies}
            exchangeAmount={exchangeAmount.toString()}
          />
        ) : (
          <Graph currencies={Object.keys(currencies)} />
        )
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerView: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  HeaderBtn: {
    width: '50%',
    height: 44,
    justifyContent: 'center',
    backgroundColor: '#7f8c8d',
    alignItems: 'center',
  },
  HeaderBtnSelected: {
    backgroundColor: '#1abc9c',
  },
  input: {
    height: 50,
    margin: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    color: '#b2bec3',
    fontWeight: 'bold',
    borderColor: '#b2bec3',
  },
});
