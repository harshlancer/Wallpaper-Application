import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchWallpapers } from './api'; // Import the API function

const categories = [
  { title: 'Nature', query: 'nature' },
  { title: 'Animals', query: 'animals' },
  { title: 'Technology', query: 'technology' },
  { title: 'Architecture', query: 'architecture' },
  { title: 'Food', query: 'food' },
  { title: 'People', query: 'people' },
  { title: 'Cars', query: 'cars' },
  { title: 'Abstract', query: 'abstract' },
  { title: 'Space', query: 'space' },
  { title: 'Sports', query: 'sports' },
];

const Categories = ({ navigation }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random wallpapers for each category
    const loadWallpapers = async () => {
      try {
        const wallpapersData = await Promise.all(
          categories.map(category => fetchWallpapers(category.query))
        );
        setWallpapers(wallpapersData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadWallpapers();
  }, []);

  // Render a single category item in the grid
  const renderCategory = ({ item, index }) => {
    const wallpaper = wallpapers[index]?.[0]?.src?.medium; // Use the first wallpaper as the thumbnail

    return (
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() => navigation.navigate('CategoryDetail', { category: item.query })} // Ensure navigation is correct
      >
        {wallpaper ? (
          <Image source={{ uri: wallpaper }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>{item.title}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.categoryText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={styles.loadingText}>Loading Categories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.title}
        numColumns={2} // Grid with 2 columns
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  gridContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flex: 1,
    margin: 10,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});
