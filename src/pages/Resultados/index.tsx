import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RectButton } from 'react-native-gesture-handler';

// Interface para os itens das receitas
interface Item {
  _id: string;
  nome: string;
  secao: {
    nome: string;
    conteudo: string[];
  }[];
}

// Interface para os parâmetros da rota
interface RouteParams {
  ingredientes: string[]; // Agora recebendo os ingredientes como um array
}

const Resultados = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { ingredientes } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [receitas, setReceitas] = useState<Item[]>(require('../../data/afrodite.json'));
  const [filteredReceitas, setFilteredReceitas] = useState<Item[]>([]);

  // Função para retornar à tela anterior
  function handleNavigateBack() {
    navigation.goBack();
  }

  // Função para navegar para a tela de detalhes de uma receita
  function handleNavigateToDetalhes(item: Item) {
    navigation.navigate('Detalhes', item);
  }

  useEffect(() => {
    // Filtrar receitas para remover duplicatas
    const uniqueReceitas: Item[] = [];

    receitas.forEach((item) => {
      if (!uniqueReceitas.some((receita) => receita.nome === item.nome)) {
        uniqueReceitas.push(item);
      }
    });

    // Atualizar receitas sem duplicatas
    setReceitas(uniqueReceitas);

    // Filtrar receitas com base nos ingredientes fornecidos
    const matchedReceitas = uniqueReceitas.filter((item) =>
      ingredientes.every((ing) =>
        item.nome.toLowerCase().includes(ing.toLowerCase()) ||
        item.secao.some(sec =>
          sec.conteudo.some(cont => cont.toLowerCase().includes(ing.toLowerCase()))
        )
      )
    );

    setFilteredReceitas(matchedReceitas);
    setIsLoading(false);
  }, [ingredientes]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#ff8c00" />
        </TouchableOpacity>

        {isLoading ? (
          <View style={styles.loadView}>
            <Text style={styles.loadText}>Procurando...</Text>
            <ActivityIndicator size="large" color="#00BFFF" />
          </View>
        ) : (
          <>
            <Text style={styles.title}>Reseitas Para Você</Text>
            <Text style={styles.description}>
              {filteredReceitas.length} receitas encontradas:
            </Text>
            <View style={styles.viewLista}>
              <FlatList
                data={filteredReceitas}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleNavigateToDetalhes(item)}
                    activeOpacity={0.5}
                  >
                    <Text style={styles.itemText}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  title: {
    color: '#ff8c00',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 10,
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 80,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    justifyContent: 'center',
    textAlign: 'center',
  },
  itemText: {
    color: '#6C6C80',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00BFFF',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {
    color: '#322153',
    fontSize: 20,
    marginTop: 16,
    fontFamily: 'Ubuntu_700Bold',
  },
  loadView: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
    marginTop: 250,
    backgroundColor: 'white',
  },
  viewLista: {
    flex: 1,
  },
});

export default Resultados;
