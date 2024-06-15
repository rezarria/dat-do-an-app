import React, { memo } from "react";
import { Text, Button, Stack, Image, YStack, XStack } from "tamagui";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/buttons/BackButton";
import LoveButton from "@/components/buttons/LoveButton";

export default () => {
  return <ProductDetails />;
};

const ProductDetails = memo(() => {
  return (
    <Stack f={1} bg="white" p={20}>
      <Stack position="relative" width="100%" height={200} mb={20}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOsmMp-gKkRJ81osXUXGiNfHWz99nLemklDg&s",
          }}
          width="100%"
          height="100%"
          borderRadius={10}
        />
        <XStack position="absolute" top={10} left={10}>
          <BackButton />
        </XStack>
        <XStack position="absolute" top={10} right={10}>
          <LoveButton />
        </XStack>
      </Stack>
      <YStack ai="flex-start" mb={20}>
        <Text fontSize={24} fontWeight="bold">
          Chicken Burger
        </Text>
        <XStack ai="center" mb={10}>
          <Text fontSize={18} textDecorationLine="line-through" color="gray">
            £10.00
          </Text>
          <Text fontSize={24} fontWeight="bold" color="red" ml={10}>
            £6.00
          </Text>
        </XStack>
        <XStack ai="center" mb={10} jc="space-between" width="100%">
          <XStack ai="center" mb={10}>
            <EvilIcons name="star" size={24} color="gold" />
            <Text fontSize={18} ml={5}>
              4.9 (1,205)
            </Text>
          </XStack>
          <Text fontSize={16} color="blue">
            See all reviews
          </Text>
        </XStack>
        <Text fontSize={16} mt={10}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
          earum corrupti quibusdam voluptatibus vel voluptates amet delectus
          recusandae eveniet facere quas aspernatur debitis, dicta consequuntur
          sint ipsum autem voluptate! In.
        </Text>
      </YStack>
    </Stack>
  );
});
