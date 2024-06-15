import BackButton from "@/components/buttons/BackButton";
import DotsThreeVertical from "@/components/buttons/DotsThreeVertical";
import PenButton from "@/components/buttons/PenButton";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Text, Button, Stack, Image, YStack, XStack } from "tamagui";

export default () => {
  return <Profile />;
};

const Profile = memo(() => {
  return (
    <Stack f={1} bg="white" p={20}>
      <XStack jc="space-between" ai="center" mb={20}>
        <BackButton />
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          Profile
        </Text>
        <DotsThreeVertical />
      </XStack>
      <XStack ai="center" mb={40} space="$4">
        <Image
          source={{
            uri: "https://m.yodycdn.com/blog/anh-dai-dien-hai-yodyvn3-b3a8cf32-e08a-47fc-a741-71626aadc4de.jpg",
          }}
          width={80}
          height={80}
          borderRadius={50}
          mb={20}
        />
        <YStack ai="center">
          <Text color="red" fontSize={18} fontWeight="bold" mb={5}>
            Thomas K. Wilson
          </Text>
          <Text fontSize={14} mb={2}>
            <EvilIcons name="bell" size={14} color="black" />
            (+44) 20 1234 5629
          </Text>
          <Text fontSize={14} mb={20}>
            <EvilIcons name="envelope" size={14} color="black" />
            thomas.abc.inc@gmail.com
          </Text>
        </YStack>
        <PenButton />
      </XStack>

      <Button
        bg="#FFEFED"
        borderRadius={25}
        padding={15}
        width="80%"
        alignSelf="center"
      >
        <Text
          height={20}
          lineHeight={20}
          color="#FF6347"
          fontSize={16}
          fontWeight="bold"
        >
          <EvilIcons name="lock" size={16} color="#FF6347" />
          Logout
        </Text>
      </Button>
    </Stack>
  );
});
