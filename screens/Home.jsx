import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

export default function HomeScreen({ navigation }) {
  const [localTasks, setLocalTasks] = useState([]);
  const [apiTasks, setApiTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => {
        setApiTasks(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Erro ao carregar tarefas da API');
        setIsLoading(false);
      });
  }, []);

  const addTask = ({ title, description }) => {
    setLocalTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(), title, description: description || '', completed: false
      },
    ]);
  };




  const toggleTaskCompletion = (id) => {
    setLocalTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const allTasks = [...apiTasks, ...localTasks];

  const renderItem = ({ item }) => {
    const isLocal = typeof item.id === 'string';

    return (
      <TaskCard
        item={item}
        title={item.title}
        completed={item.completed}
        onPress={isLocal ? () => navigation.navigate('Details', { task: item }) : null}
        onToggle={isLocal ? () => toggleTaskCompletion(item.id) : null}
      />
    );
  };

  const [filter, setFilter] = useState('all');

  const filteredTasks = allTasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <Text style={styles.counterText}>
        Tarefas: {allTasks.length} | Concluídas: {allTasks.filter((task) => task.completed).length}
      </Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>Todas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={styles.filterText}>Pendentes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterText}>Concluídas</Text>
        </TouchableOpacity>
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
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask', { addTask })}
      >
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
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
    color: '#d35454',
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
    marginBottom: 10,
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
