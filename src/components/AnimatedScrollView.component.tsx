import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export const AnimatedScrollView = () => {
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [0, 100],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View style={[
        styles.header,
        {
          transform: [{ translateY: translation }],
        },
      ]} />
      <Animated.ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: {
              y: scrolling,
            },
          },
        }], { useNativeDriver: true })}
      >
        <View style={styles.scrollViewContainer} />
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'tomato',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    height: 1000,
  },
});
