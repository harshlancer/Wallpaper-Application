import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {fetchWallpapers} from './api';
import LottieView from 'lottie-react-native';
import Animated, {FadeIn, FadeOut, ZoomIn,useAnimatedScrollHandler, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const {width} = Dimensions.get('window'); // Get device width

// WallpaperItem component to handle individual wallpaper loading and display
const WallpaperItem = ({item, navigation}) => {
  const [imageLoading, setImageLoading] = useState(true); // Track loading state for each image

  return (
    <ImageContainer
      onPress={() => navigation.navigate('Detail', {wallpaper: item})}>
      {imageLoading && (
        <LottieView
          source={require('./assets/loading.json')}
          autoPlay
          loop
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            zIndex: 1,
          }}
        />
      )}
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}>
        <FastImage
          style={{
            width: width / 2 - 30,
            height: (width / 2.5) * 1.5,
            borderRadius: 10,
          }}
          source={{uri: item.src.portrait}}
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
      </Animated.View>
    </ImageContainer>
  );
};

// HomeScreen component for fetching and displaying the wallpapers
const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('wallpapers');
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchWallpapers(search);
      setWallpapers(data);
      setLoading(false);
    };
    fetchData();
  }, [search]);

  // Render each wallpaper using the WallpaperItem component
  const renderItem = ({item}) => (
    <WallpaperItem item={item} navigation={navigation} />
  );

  return (
    <Container>
      <SearchInput
        placeholder="Search Wallpapers..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <LottieView source={require('./assets/loading.json')} autoPlay loop />
      ) : (
        <FlatList
          data={wallpapers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2} // Set the number of columns to 2 for a grid layout
          columnWrapperStyle={{justifyContent: 'space-between'}} // Ensure even spacing between columns
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  background-color: #000;
  padding: 20px;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  background-color: #fff;
  color: #000;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.TouchableOpacity`
  margin: 20px;
  flex: 1;
  align-items: center;
  elevation: 10;
`;
