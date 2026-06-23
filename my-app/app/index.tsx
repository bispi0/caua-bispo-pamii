import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

// Definição da estrutura de cada anotação
interface Anotacao {
  id: string;
  texto: string;
}

export default function AgendaScreen() {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([
    { id: '1', texto: 'Estudar conceitos de React Native' },
    { id: '2', texto: 'Entrega da atividade do Expo' },
  ]);
  const [novoTexto, setNovoTexto] = useState('');

  // Função para adicionar uma nova anotação
  const adicionarAnotacao = () => {
    if (novoTexto.trim() === '') return;

    const nova: Anotacao = {
      id: Date.now().toString(),
      texto: novoTexto,
    };

    setAnotacoes([...anotacoes, nova]);
    setNovoTexto('');
  };

  // Função para remover uma anotação
  const removerAnotacao = (id: string) => {
    setAnotacoes(anotacoes.filter(item => item.id !== id));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Minha Agenda</Text>
          <Text style={styles.subtitle}>Gerencie suas anotações e compromissos</Text>
        </View>

        {/* Campo de Entrada e Botão */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma nova anotação..."
            placeholderTextColor="#A1A1AA"
            value={novoTexto}
            onChangeText={setNovoTexto}
          />
          <TouchableOpacity style={styles.button} onPress={adicionarAnotacao} activeOpacity={0.8}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Anotações */}
        <FlatList
          data={anotacoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.texto}</Text>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => removerAnotacao(item.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma anotação para hoje.</Text>
          }
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#18181B',
  },
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    color: '#18181B',
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  cardText: {
    fontSize: 16,
    color: '#27272A',
    flex: 1,
    marginRight: 12,
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#A1A1AA',
    marginTop: 40,
    fontSize: 16,
  },
});
