import React, { useState, useEffect, ChangeEvent } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse {
  sigla: string;
}

interface ItemsSelectPicker {
  label: string;
  value: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [ ufs, setUfs ] = useState<ItemsSelectPicker[]>([]);
  const [ uf, setUf ] = useState<String>('');
  const [ city, setCity ] = useState<String>('');
  const [ cities, setCities ] = useState<ItemsSelectPicker[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUfs();
  }, []);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city
    })
  }

  async function handleSelectUf(value: String) {
    setUf(value);
  }

  // async function handleSelectCity(value: String) {
  //   setCity(value);
  // }

  function getUfs() {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(async res => {
      const ufInitialsResponse = await res.data.map(uf => uf.sigla);
      ufInitialsResponse.sort((a, b) => a.localeCompare(b)); // ordenando em ordem alfabética

      const ufArray = await ufInitialsResponse.map(e => {
        return { label: e, value: e }
      });
      await setUfs(ufArray);
    });
  }

  useEffect(() => {
    if (uf !== '0') {
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`).then(async res => {
        const citiesResponse = res.data.map(city => city.nome);
        citiesResponse.sort((a, b) => a.localeCompare(b)); // ordenando em ordem alfabética
        const cityArray = await citiesResponse.map(e => {
          return { label: e, value: e }
        });
        
        setCities(cityArray);
      });
    }
  }, [uf]);
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            placeholder={{
              label: 'Selecione a UF',
              value: null,
              color: '#cdcdcd'
            }}
            style={pickerSelectStyles}
            onValueChange={(value) => handleSelectUf(value)}
            items={ufs}
          />

          <RNPickerSelect
            placeholder={{
              label: 'Selecione a Cidade',
              value: null,
              color: '#cdcdcd'
            }}
            style={pickerSelectStyles}
            onValueChange={(value) => setCity(value)}
            items={cities}
          />
          
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    
    paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    // color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});