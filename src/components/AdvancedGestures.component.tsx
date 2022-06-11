import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, useWindowDimensions } from 'react-native';

const URI = 'https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg';

const pointsDistance = ([Ax, Ay]: number[], [Bx, By]: number[]) => Math.sqrt(Math.pow(Ax - Bx, 2) + Math.pow(Ay - By, 2));

export const AdvancedGestures = () => {
  const dimenstions = useWindowDimensions();
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const activeTouches = event.nativeEvent.changedTouches.length;

        if (activeTouches === 1) {
          pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        } else {
          const touches = event.nativeEvent.changedTouches;
          const touchA = touches[0];
          const touchB = touches[1];
          const distance = pointsDistance([touchA.pageX, touchA.pageY], [touchB.pageX, touchB.pageY]);
          const screenMovedPercents = distance / dimenstions.width;
          scale.setValue(1 + screenMovedPercents * 3);
        }
      },
      onPanResponderRelease: () => {
        Animated.parallel([
          Animated.spring(pan, {
            useNativeDriver: true,
            toValue: { x: 0, y: 0 },
          }),
          Animated.spring(scale, {
            useNativeDriver: true,
            toValue: 1,
          }),
        ]).start();
      },
    })
  ).current;

  return (
    <Animated.Image
      {...panResponder.panHandlers}
      source={{ uri: URI }}
      style={[styles.image, { transform: [
        { translateX: pan.x },
        { translateY: pan.y },
        { scale },
      ] }]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '90%',
    borderRadius: 10,
  },
});
