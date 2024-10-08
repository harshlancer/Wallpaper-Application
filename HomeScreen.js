import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {fetchWallpapers} from './api';
import LottieView from 'lottie-react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

// WallpaperItem component to handle individual wallpaper loading and display
const WallpaperItem = ({item, navigation}) => {
  return (
    <ImageContainer
      onPress={() => navigation.navigate('Detail', {wallpaper: item})}>
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
        />
      </Animated.View>
    </ImageContainer>
  );
};

// HomeScreen component for fetching and displaying the wallpapers
const HomeScreen = ({navigation}) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     setWallpapers('random');
  //   }, 2000); 
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchWallpapers('wallpapers');
      setWallpapers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Render each wallpaper using the WallpaperItem component
  const renderItem = ({item}) => (
    <WallpaperItem item={item} navigation={navigation} />
  );

  return (
    <Container>
      {loading ? (
        <LottieView source={require('./assets/loading.json')} autoPlay loop />
      ) : (
        <FlatList
          data={wallpapers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
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

const ImageContainer = styled.TouchableOpacity`
  margin: 20px;
  flex: 1;
  align-items: center;
  elevation: 10;
`;
