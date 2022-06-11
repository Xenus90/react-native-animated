import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

export const Loader = () => {
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.stagger(200, [
        Animated.timing(opacity1, { useNativeDriver: true, toValue: 1 }),
        Animated.timing(opacity2, { useNativeDriver: true, toValue: 1 }),
        Animated.timing(opacity3, { useNativeDriver: true, toValue: 1 }),
        Animated.timing(opacity1, { useNativeDriver: true, toValue: 0 }),
        Animated.timing(opacity2, { useNativeDriver: true, toValue: 0 }),
        Animated.timing(opacity3, { useNativeDriver: true, toValue: 0 }),
      ])).start();
  }, [opacity1, opacity2, opacity3]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.square, { opacity: opacity1 }]} />
      <Animated.View style={[styles.square, { opacity: opacity2 }]} />
      <Animated.View style={[styles.square, { opacity: opacity3 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  square: {
    marginHorizontal: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
});
