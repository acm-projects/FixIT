import * as React from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import Carousel from 'react-native-stack-carousel';

const ReanimatedCarousel = ({images}) => {
  const width = Dimensions.get('window').width;
  console.log(images)
  return (
    <View>
      <Carousel
        loop
        data={images}
        maxVisibleItems={2}
        direction="horizontalRight"
        />
    </View>
  )
}

export default ReanimatedCarousel