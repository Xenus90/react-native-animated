import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Loader } from './components/Loader.component';
import { Interpolation } from './components/Interpolation.component';
import { AnimatedScrollView } from './components/AnimatedScrollView.component';
import { Gestures } from './components/Gestures.component';
import { AdvancedGestures } from './components/AdvancedGestures.component';
import { Toast } from './components/Toast.component';

export const App = () => {
  return (
    <View style={styles.container}>
      {/* <Loader /> */}
      {/* <Interpolation /> */}
      {/* <AnimatedScrollView /> */}
      {/* <Gestures /> */}
      {/* <AdvancedGestures /> */}
      {/* <Toast /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
