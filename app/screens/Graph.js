import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import CurrencyModal from './CurrencyModal';
import axios from 'axios';

const {width: SIZE} = Dimensions.get('window');

const Graph = props => {
  const {currencies} = props;
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showCurrentGraph, setShowCurrentGraph] = useState(false);
  const [graphData, setGraphData] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState();

  const handleCallBack = async currency => {
    if (currency) {
      setSelectedCurrency(currency);
      setShowCurrentGraph(false);
      await fetchWeeklyRates(currency);
      setShowCurrentGraph(true);
    } else {
      setSelectedCurrency('');
    }
    setShowCurrencyModal(false);
  };

  const fetchWeeklyRates = async foreignCurrency => {
    let data = {};
    for (let index = 6; index >= 0; index--) {
      var date = new Date();
      date.setDate(date.getDate() - index);
      const formattedDate = date.toJSON().split('T')[0];
      await axios
        .get(
          `https://api.ratesapi.io/api/${formattedDate}?base=EUR&symbols=${foreignCurrency}`,
        )
        .then(response => {
          const dateSplit = response.data.date.split('-');
          const shortDate = `${dateSplit[1]}-${dateSplit[2]}`;
          data[shortDate] = response.data.rates[foreignCurrency];
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setGraphData(data);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <TextInput
        value={selectedCurrency ? selectedCurrency : 'Select A Currency'}
        // editable={false}
        style={styles.input}
        onPressIn={() => {
          setShowCurrencyModal(true);
        }}
      />
      {showCurrentGraph && (
        <LineChart
          data={{
            labels: Object.keys(graphData),
            datasets: [
              {
                data: Object.values(graphData),
              },
            ],
          }}
          width={SIZE} // from react-native
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 4, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      <CurrencyModal
        currencies={currencies}
        showCurrencyModal={showCurrencyModal}
        handleCallBack={handleCallBack}
      />
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
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
    backgroundColor: '#ffff',
  },
  row: {
    backgroundColor: '#ffff',
    height: 40,
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    height: 40,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
