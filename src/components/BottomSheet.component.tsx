import React from 'react';
import { Button, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Context = {
  startTop: number;
};

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

export const BottomSheet = () => {
  const dimensions = useWindowDimensions();
  const top = useSharedValue(dimensions.height);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: Context) => {
      context.startTop = top.value;
    },
    onActive: (event, context: Context) => {
      top.value = context.startTop + event.translationY;
    },
    onEnd: () => {
      top.value > dimensions.height / 2 + 200
        ? top.value = dimensions.height
        : top.value = dimensions.height / 2;
    },
  });

  const style = useAnimatedStyle(() => ({ top: withSpring(top.value, SPRING_CONFIG) }));

  const presentBottomSheet = () => {
    top.value = dimensions.height / 2;
  };

  return (
    <>
      <View style={styles.container}>
        <Button title="Open sheet" onPress={presentBottomSheet} />
      </View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheetContainer, style]}>
          <Text>Bottom Sheet</Text>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
