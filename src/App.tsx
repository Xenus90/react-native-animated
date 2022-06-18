import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Loader } from './components/Loader.component';
import { Interpolation } from './components/Interpolation.component';
import { AnimatedScrollView } from './components/AnimatedScrollView.component';
import { Gestures } from './components/Gestures.component';
import { AdvancedGestures } from './components/AdvancedGestures.component';
import { Toast } from './components/Toast.component';
import { BottomSheet } from './components/BottomSheet.component';

export const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <Loader /> */}
      {/* <Interpolation /> */}
      {/* <AnimatedScrollView /> */}
      {/* <Gestures /> */}
      {/* <AdvancedGestures /> */}
      {/* <Toast /> */}
      <BottomSheet />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
