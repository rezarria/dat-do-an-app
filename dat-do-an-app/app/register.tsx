import React, { memo } from "react";
import { Text, Button, Input, Stack } from "tamagui";

export default () => {
  return <Register />;
};

const Register = memo(() => {
  return (
    <Stack f={1} jc="center" ai="center" bg="white" p={30}>
      <Text
        f={1}
        height={35}
        lineHeight={35}
        color="red"
        fontSize={30}
        fontWeight="bold"
        marginTop={50}
        marginBottom={20}
      >
        Registration
      </Text>
      <Input
        placeholder="Email"
        height={50}
        lineHeight={50}
        bg="#f0f0f0"
        borderColor="#d9d9d9"
        borderWidth={1}
        borderRadius={10}
        padding={16}
        marginBottom={20}
        width="80%"
      />
      <Input
        placeholder="Full Name"
        height={50}
        lineHeight={50}
        bg="#f0f0f0"
        borderColor="#d9d9d9"
        borderWidth={1}
        borderRadius={10}
        padding={16}
        marginBottom={20}
        width="80%"
      />
      <Input
        placeholder="Password"
        height={50}
        lineHeight={50}
        bg="#f0f0f0"
        borderColor="#d9d9d9"
        borderWidth={1}
        borderRadius={10}
        padding={16}
        marginBottom={20}
        width="80%"
      />
      <Input
        placeholder="Confirm password"
        height={50}
        lineHeight={50}
        bg="#f0f0f0"
        borderColor="#d9d9d9"
        borderWidth={1}
        borderRadius={10}
        padding={16}
        marginBottom={80}
        width="80%"
      />
      <Button
        bg="#ffc1c1"
        borderRadius={25}
        padding={15}
        width="80%"
        marginBottom={10}
      >
        <Text color="white" height={50} lineHeight={50}>
          Register
        </Text>
      </Button>
      <Button
        bg="#ffc1c1"
        borderRadius={25}
        padding={15}
        width="80%"
        marginBottom={160}
      >
        <Text color="white" height={50} lineHeight={50}>
          Back to Login
        </Text>
      </Button>
    </Stack>
  );
});
