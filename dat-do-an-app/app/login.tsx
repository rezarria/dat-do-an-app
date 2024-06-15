import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { memo } from "react";
import { Text, Button, Input, Stack } from "tamagui";

export default () => {
  return <Login />;
};

const Login = memo(() => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(false);

  React.useEffect(() => {
    if (email !== "" && password !== "") {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const saveTokenInStorage = async (token: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(token, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const saveUserInfoInStorage = (token: string, user: any, jwt: any) => {
    fetch(`/api/user?id=` + user.userId, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          saveTokenInStorage(token, data);
          console.log(data);
        });
      } else {
        console.log("Called API faily");
      }
    });
  };

  const onsubmit = () => {
    let submitData = {
      email,
      password,
    };

    fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
        });
      } else {
        console.log("Called API faily");
      }
    });
  };

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
      >
        Login
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
        placeholder="Password"
        height={50}
        lineHeight={50}
        bg="#f0f0f0"
        borderColor="#d9d9d9"
        borderWidth={1}
        borderRadius={10}
        padding={16}
        marginBottom={160}
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
          Login
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
          Register
        </Text>
      </Button>
    </Stack>
  );
});
