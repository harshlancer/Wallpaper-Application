import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const SearchResult = ({ route, navigation }) => {
  const { results } = route.params;

  const renderItem = ({ item }) => (
    <ImageContainer onPress={() => navigation.navigate('Detail', { wallpaper: item })}>
      <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)}>
        <FastImage
          style={{
            width: width / 2 - 30,
            height: (width / 2.5) * 1.5,
            borderRadius: 10,
          }}
          source={{ uri: item.src.portrait }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </Animated.View>
    </ImageContainer>
  );

  return (
    <Container>
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <LottieView source={require('./assets/loading.json')} autoPlay loop />
      )}
    </Container>
  );
};

export default SearchResult;

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
