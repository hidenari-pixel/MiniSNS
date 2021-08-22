import { NavigationRoute, NavigationScreenProp } from "react-navigation";

export type NavigationProps = {
  prop: number;
  navigation: NavigationScreenProp<NavigationRoute>;
};
