import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootTabParamList = {
  Home: undefined;
  Categories: NavigatorScreenParams<CategoriesStackParamList>;
  Animations: undefined;
  Profile: undefined;
};

export type CategoriesStackParamList = {
  CategoriesList: undefined;
  CategoryDetail: { id: string; name: string };
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
  RootTabParamList,
  T
>;

export type CategoriesStackScreenProps<T extends keyof CategoriesStackParamList> =
  NativeStackScreenProps<CategoriesStackParamList, T>;
