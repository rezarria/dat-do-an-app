import { memo } from "react";
import { Pressable } from "react-native";
import { Circle, View } from "tamagui";
import { Path, Svg } from "react-native-svg";

export default memo(() => {
  return (
    <View>
      <Pressable>
        <Circle
          justifyContent="center"
          alignItems="center"
          elevate
          elevationAndroid={3}
          backgroundColor={"white"}
          width={42}
          height={42}
        >
          <Icon />
        </Circle>
      </Pressable>
    </View>
  );
});

const Icon = () => {
  return (
    <Svg width="22" height="6" viewBox="0 0 22 6" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.4375 2.99992C0.4375 1.35457 1.77132 0.020752 3.41667 0.020752C5.06202 0.020752 6.39583 1.35457 6.39583 2.99992C6.39583 4.64527 5.06202 5.97909 3.41667 5.97909C1.77132 5.97909 0.4375 4.64527 0.4375 2.99992ZM3.41667 1.64575C2.66878 1.64575 2.0625 2.25203 2.0625 2.99992C2.0625 3.7478 2.66878 4.35409 3.41667 4.35409C4.16455 4.35409 4.77083 3.7478 4.77083 2.99992C4.77083 2.25203 4.16455 1.64575 3.41667 1.64575Z"
        fill="#0D1217"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.02083 2.99992C8.02083 1.35457 9.35465 0.020752 11 0.020752C12.6453 0.020752 13.9792 1.35457 13.9792 2.99992C13.9792 4.64527 12.6453 5.97909 11 5.97909C9.35465 5.97909 8.02083 4.64527 8.02083 2.99992ZM11 1.64575C10.2521 1.64575 9.64583 2.25203 9.64583 2.99992C9.64583 3.7478 10.2521 4.35409 11 4.35409C11.7479 4.35409 12.3542 3.7478 12.3542 2.99992C12.3542 2.25203 11.7479 1.64575 11 1.64575Z"
        fill="#0D1217"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.5833 0.020752C16.938 0.020752 15.6042 1.35457 15.6042 2.99992C15.6042 4.64527 16.938 5.97909 18.5833 5.97909C20.2287 5.97909 21.5625 4.64527 21.5625 2.99992C21.5625 1.35457 20.2287 0.020752 18.5833 0.020752ZM17.2292 2.99992C17.2292 2.25203 17.8354 1.64575 18.5833 1.64575C19.3312 1.64575 19.9375 2.25203 19.9375 2.99992C19.9375 3.7478 19.3312 4.35409 18.5833 4.35409C17.8354 4.35409 17.2292 3.7478 17.2292 2.99992Z"
        fill="#0D1217"
      />
    </Svg>
  );
};
