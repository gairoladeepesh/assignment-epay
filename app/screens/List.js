import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const List = props => {
  const {currencies, exchangeAmount} = props;

  const formatCurrency = currency => {
    return currency.toFixed(4).replace('.', ',');
  };

  const minorFormat = currency => {
    return currency.toFixed(2).replace('.', ',');
  };

  const baseConversion = currency => {
    if (exchangeAmount > 0) {
      return minorFormat(exchangeAmount * currency);
    } else {
      return '';
    }
  };

  const foreignConversion = currency => {
    return formatCurrency(1 / currency);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{width: '80%'}}
        data={Object.keys(currencies)}
        keyExtractor={item => item}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.row}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{marginLeft: 10, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#34495e',
                    }}>
                    {item}
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                  {exchangeAmount !== 0 ? (
                    <Text>{baseConversion(currencies[item])}</Text>
                  ) : null}
                  <Text style={{fontSize: 12, color: 'grey'}}>
                    1 EUR = {formatCurrency(currencies[item])} {item}
                  </Text>
                  <Text style={{fontSize: 12, color: 'grey'}}>
                    1 {item} = {foreignConversion(currencies[item])} EUR
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#ffff',
    height: 60,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
});
