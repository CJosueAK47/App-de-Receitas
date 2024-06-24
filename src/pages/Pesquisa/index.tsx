import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';

const Pesquisa = () => {
  const navigation = useNavigation();
  const [ingredientes, setIngredientes] = useState<string[]>(['']);
  const [isLoad, setIsLoad] = useState(false);

  async function handleNavigateToResultados() {
    setIsLoad(true);
    // Simula um pequeno atraso para o carregamento
    setTimeout(() => {
      setIsLoad(false);
      // Navega para a tela de Resultados e passa os ingredientes como parâmetros
      navigation.navigate('Resultados', { ingredientes });
    }, 1000);
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function addInput() {
    setIngredientes([...ingredientes, '']);
  }

  function removeInput(index: number) {
    if (ingredientes.length > 1) {
      const newIngredientes = ingredientes.filter((_, i) => i !== index);
      setIngredientes(newIngredientes);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#ff8c00" />
        </TouchableOpacity>
        {isLoad ? (
          <View style={styles.loadView}>
            <Text style={styles.loadText}>Procurando Receitas...</Text>
            <ActivityIndicator size="large" color="#ff8c00" />
          </View>
        ) : (
          <>
            <Text style={styles.title}>Vamos Cozinhar?</Text>
            <Text style={styles.description}>
              Digite abaixo os ingredientes que você tem em casa!
            </Text>
            {ingredientes.map((ingrediente, index) => (
              <View key={index} style={styles.ingredientRow}>
                <TextInput
                  style={styles.input}
                  placeholder={`Ingrediente ${index + 1}`}
                  value={ingrediente}
                  onChangeText={(text) => {
                    const newIngredientes = [...ingredientes];
                    newIngredientes[index] = text;
                    setIngredientes(newIngredientes);
                  }}
                />
                <RectButton
                  style={styles.buttonRemove}
                  onPress={() => removeInput(index)}
                >
                  <Icon name="x-circle" color="#fff" size={24} />
                </RectButton>
              </View>
            ))}
            <RectButton style={styles.buttonAdd} onPress={addInput}>
              <Icon name="plus-circle" color="#fff" size={24} />
            </RectButton>
            <RectButton style={styles.button} onPress={handleNavigateToResultados}>
              <View style={styles.buttonIcon}>
                <Icon name="search" color="#ff8c00" size={24} />
              </View>
              <Text style={styles.buttonText}>Procurar</Text>
            </RectButton>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    marginRight: 8,
  },
  buttonAdd: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 16,
  },
  buttonRemove: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: '#ff8c00',
    alignItems: 'center',
    borderRadius: 15,
  },
  title: {
    color: 'black',
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
    paddingBottom: 40,
  },
  button: {
    backgroundColor: 'black',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loadText: {
    color: '#322153',
    fontSize: 20,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
  },
  loadView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Pesquisa;
