import {
  StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';

export default function HomeScreen({ navigation }) {
  const [localTasks, setLocalTasks] = useState([]);
  const [apiTasks, setApiTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => {
        setApiTasks(response.data);
      })
      .catch(() => {
        setError('Erro ao carregar tarefas da API');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addTask = ({ title, description, id }) => {
    setLocalTasks(prev => [
      ...prev,
      { id, title, description: description || '', completed: false }
    ]);
  };

  const deleteTask = () => {
    setLocalTasks(prev =>
      prev.filter(task => task.id !== taskToDelete)
    );
    setModalVisible(false);
    setTaskToDelete(null);
  };

  const toggleTaskCompletion = id => {
    setLocalTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const allTasks = [...apiTasks, ...localTasks];

  const renderItem = ({ item }) => {
    const isLocal = typeof item.id === 'string';

    return (
      <View>
        <Text style={styles.sourceText}>
          {isLocal ? 'Local' : 'API'}
        </Text>
        <TaskCard
          item={item}
          title={item.title}
          completed={item.completed}
          onPress={
            isLocal
              ? () => navigation.navigate('Details', { task: item })
              : null
          }
          onToggle={
            isLocal
              ? () => toggleTaskCompletion(item.id)
              : null
          }
          onDelete={
            isLocal
              ? () => {
                setTaskToDelete(item.id);
                setModalVisible(true);
              }
              : null
          }
        />
      </View>
    );
  };

  const [filter, setFilter] = useState('all');
  const filteredTasks = allTasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <Text style={styles.counterText}>
        Tarefas: {allTasks.length} | Concluídas: {allTasks.filter(t => t.completed).length}
      </Text>

      <View style={styles.filterContainer}>
        <CustomButton
          title="Todas"
          onPress={() => setFilter('all')}
          color={filter === 'all' ? '#007bff' : '#ddd'}
          textStyle={{ color: filter === 'all' ? '#fff' : '#333' }}
        />
        <CustomButton
          title="Pendentes"
          onPress={() => setFilter('pending')}
          color={filter === 'pending' ? '#007bff' : '#ddd'}
          textStyle={{ color: filter === 'pending' ? '#fff' : '#333' }}
        />
        <CustomButton
          title="Concluídas"
          onPress={() => setFilter('completed')}
          color={filter === 'completed' ? '#007bff' : '#ddd'}
          textStyle={{ color: filter === 'completed' ? '#fff' : '#333' }}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredTasks.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma tarefa adicionada</Text>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.list}
        />
      )}

      <CustomButton
        title="Adicionar Tarefa"
        onPress={() => navigation.navigate('AddTask', { addTask })}
        color="#28a745"
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirmar Exclusão"
        message="Deseja realmente excluir esta tarefa?"
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={deleteTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  counterText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
});