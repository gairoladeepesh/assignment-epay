import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const CurrencyModal = props => {
  const {currencies, showCurrencyModal, handleCallBack} = props;
  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="slide"
      transparent
      visible={showCurrencyModal}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}>
        <View
          style={{
            height: 300,
            width: '100%',
            alignItems: 'center',
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{width: '80%', backgroundColor: '#2c3e50'}}
            data={currencies}
            keyExtractor={item => item}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    handleCallBack(item);
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{height: 40, backgroundColor: '#ffff', width: '80%'}}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              handleCallBack();
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#ffff'}}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CurrencyModal;
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
