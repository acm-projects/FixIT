import React from 'react';
import { SafeAreaView, ScrollView, YStack, XStack, Text, Image } from 'tamagui';
import { icons, images } from "../../constants";
import trending_today from "../../constants/trending_today.js";

const Trending = () => {
  console.log(images.placeholderImage);
  
  return (
    <SafeAreaView>
      <YStack backgroundColor="#64748b" height={56} width="100%" />

      <YStack space={2} paddingX={3} marginTop={5}>
        <Text fontSize={24} fontWeight="500">Most Upvoted</Text>

        <ScrollView
          horizontal
          height={160}
          width="100%"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            gap: 10,
          }}
        >
          {[...Array(5)].map((_, index) => (
            <YStack key={index} alignItems="center" marginRight={10}>
              <Image
                source={images.placeholderImage}
                height={80}
                width={80}
                resizeMode="contain"
              />
              <Text>Office Chairs</Text>
            </YStack>
          ))}
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
};

export default Trending;
