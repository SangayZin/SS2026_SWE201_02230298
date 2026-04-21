// This file lists the names of screens used in navigation.
// Each key is a screen name; `undefined` means the screen does not need extra information.
// This file lists the names of screens used in navigation.
// Each key is a screen name; the value is the shape of parameters passed to that screen.
export type RootStackParamList = {
  // Main screen showing summary information (no params)
  Dashboard: undefined;
  // Details screen receives a `category` parameter indicating which animal group to show
  Details: { category: 'Carnivore' | 'Herbivore' | 'Omnivore' };
};
