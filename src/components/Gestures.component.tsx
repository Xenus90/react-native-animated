import React, { useRef } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

export const Gestures = () => {
  const dimensions = useWindowDimensions();
  const touch = useRef(new Animated.ValueXY({
    x: dimensions.width / 2 + CURSOR_HALF_SIDE_SIZE,
    y: dimensions.height / 2 + CURSOR_HALF_SIDE_SIZE,
  })).current;

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderMove={event => {
        touch.setValue({ x: event.nativeEvent.locationX, y: event.nativeEvent.locationY });
      }}
      onResponderRelease={() => {
        Animated.spring(touch, {
          useNativeDriver: false,
          toValue: {
            x: dimensions.width / 2 + CURSOR_HALF_SIDE_SIZE,
            y: dimensions.height / 2 + CURSOR_HALF_SIDE_SIZE,
          },
        }).start();
      }}
    >
      <Animated.View style={[styles.circle, {
        top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
        left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    position: 'absolute',
    height: CURSOR_SIDE_SIZE,
    width: CURSOR_SIDE_SIZE,
    borderRadius: CURSOR_HALF_SIDE_SIZE,
    backgroundColor: 'orange',
  },
});
