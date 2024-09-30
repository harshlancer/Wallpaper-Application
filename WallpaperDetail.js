import React from 'react';
import {
  Dimensions,
  Alert,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import {NativeModules} from 'react-native';

const {WallPaperManager} = NativeModules;

const setAsWallpaper = imageUrl => {
  WallPaperManager.setWallpaper(imageUrl, (error, success) => {
    if (error) {
      Alert.alert('Error', error);
    } else {
      Alert.alert('Success', success);
    }
  });
};
const {width, height} = Dimensions.get('window'); // Get device width and height

const WallpaperDetail = ({route}) => {
  const {wallpaper} = route.params;

  // Function to download the image
  const downloadImage = async () => {
    const fileUri = `${RNFS.DocumentDirectoryPath}/${wallpaper.id}.jpg`;
    try {
      const download = RNFS.downloadFile({
        fromUrl: wallpaper.src.portrait,
        toFile: fileUri,
      });
      await download.promise;
      Alert.alert('Download complete', `Image saved to ${fileUri}`);
    } catch (error) {
      Alert.alert('Download failed', error.message);
    }
  };

  // Function to share the image
  const shareImage = async () => {
    try {
      const shareOptions = {
        url: wallpaper.src.portrait,
        message: 'Check out this cool wallpaper!',
      };
      await Share.open(shareOptions);
    } catch (error) {
      Alert.alert('Share failed', error.message);
    }
  };

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <FastImage
        style={{width, height}}
        source={{uri: wallpaper.src.portrait}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <ButtonContainer>
        <FuturisticButton onPress={downloadImage}>
          <ButtonText>Download</ButtonText>
        </FuturisticButton>
        <FuturisticButton onPress={shareImage}>
          <ButtonText>Share</ButtonText>
        </FuturisticButton>
        <FuturisticButton
          onPress={() => setAsWallpaper(wallpaper.src.portrait)}>
          <ButtonText>Set as Wallpaper</ButtonText>
        </FuturisticButton>
      </ButtonContainer>
    </Container>
  );
};

export default WallpaperDetail;

const Container = styled.View`
  flex: 1;
  background-color: #222222;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const FuturisticButton = ({onPress, children}) => (
  <TouchableOpacity onPress={onPress}>
    <StyledLinearGradient>
      <ButtonText>{children}</ButtonText>
    </StyledLinearGradient>
  </TouchableOpacity>
);

const StyledLinearGradient = styled(LinearGradient).attrs({
  colors: ['transparent', '#434343'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
})`
  border-radius: 10px;
  padding: 10px 20px;
  ${Platform.select({
    ios: `
      shadow-color: rgba(0, 255, 255, 0.8);
      shadow-offset: { width: 0, height: 10 };
      shadow-opacity: 0.8;
      shadow-radius: 10px;
    `,
    android: `
      elevation: 10;
    `,
  })}
`;

const ButtonText = styled(Text)`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 10px #00f;
`;
