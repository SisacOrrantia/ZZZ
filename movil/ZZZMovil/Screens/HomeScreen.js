import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, Usuario</Text>
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>Algo sobre clima...</Text>
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Preguntale a IAxis</Text>
        <FontAwesome name="question-circle" size={24} color="#F9F6F3" />
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>cuadro 1</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>cuadro 2</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>cuadro 3</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>cuadro 4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415E72',
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#F9F6F3",
    textAlign: 'start',
    fontFamily: 'Exo2-Bold',
  },
  weatherContainer: {
    height: 180,
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  weatherText: {
    color: '#F9F6F3',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Exo2-Bold',
  },
  searchBar: {
    height: 50,
    backgroundColor: '#2C3E50',
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  searchText: {
    color: '#F9F6F3',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Exo2-Bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 150,
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardText: {
    color: '#F9F6F3',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Exo2-Bold',
  },
});