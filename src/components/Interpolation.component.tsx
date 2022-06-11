import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const Interpolation = () => {
  const translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translate, {
      useNativeDriver: false,
      duration: 2000,
      toValue: 100,
    }).start();
  }, [translate]);

  return (
    <Animated.View style={[
      styles.square,
      {
        transform: [
          { translateX: translate },
          {
            rotate: translate.interpolate({
              inputRange: [0, 100],
              outputRange: ['0deg', '360deg'],
            }),
          }],
        opacity: translate.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
        }),
        backgroundColor: translate.interpolate({
          inputRange: [0, 100],
          outputRange: ['blue', 'orange'],
        }),
      },
    ]} />
  );
};

const styles = StyleSheet.create({
  square: {
    width: 50,
    height: 50,
  },
});
