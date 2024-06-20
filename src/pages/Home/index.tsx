import React, {useState} from 'react';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    
    function handleNavigateToPesquisa(){
        navigation.navigate('Pesquisa');
    }
      
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground 
                source={require('../../assets/Untitledwallpaper.png')} 
                style={styles.container}
                imageStyle={{width: 500, height: 800}}
            >
                <View  style={styles.main}>
                    <Text style={styles.title}>COOK NOW!</Text>
                    <Text style={styles.description}>Ajudaremos você a fazer receitas com ingredientes que estão na sua casa!</Text>
                    
                </View>
                <View>
                    <RectButton style={styles.button} onPress={handleNavigateToPesquisa}>
                        <View style={styles.buttonIcon}>
                            <Icon name="arrow-right" color="#ff8c00" size={24}/>
                        </View>
                        <Text style={styles.buttonText}>Pesquisar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
            
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#ff8c00',
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
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: 'black',
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
    }
  });

export default Home;