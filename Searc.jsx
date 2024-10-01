import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { fetchWallpapers } from './api'; // Import your API fetching function
import LinearGradient from 'react-native-linear-gradient';

const Search = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [randomImage, setRandomImage] = useState('https://picsum.photos/2000/3000');

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomImage(`https://picsum.photos/2000/3000?random=${Math.random()}`);
    }, 20000); // 20 seconds interval

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (search) {
      const data = await fetchWallpapers(search); // Fetch wallpapers based on search term
      navigation.navigate('SearchResult', { results: data });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      {/* Image Background */}
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={{ uri: randomImage }}
          style={styles.imageBackground}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#121212']}
            style={styles.gradient}
          />
        </ImageBackground>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.heading}>Search Wallpapers</Text>

        <TextInput
          style={styles.input}
          placeholder="Type to search..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageWrapper: {
    width: '100%',
    height: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 250, // Adjusted to position the search section below the image
  },
  heading: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
