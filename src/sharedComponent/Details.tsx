import React, { useEffect, useRef } from 'react';
import { Animated, Button, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{ 'Details': { post: { id: number, image: string } } }, 'Details'>;
};

export const Details = (props: Props) => {
  const { navigation, route } = props;
  const { post } = route.params;
  const opacity = useRef(new Animated.Value(0)).current;
  const safeInsets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay: 350,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackHandler = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.detailsContainer, {
        top: safeInsets.top,
        left: safeInsets.left,
        right: safeInsets.right,
      }]}
      >
        <SharedElement id={post.id.toString()}>
          <Image style={styles.image} source={{ uri: post.image }} />
        </SharedElement>
        <Animated.View style={{ opacity }}>
          <Text style={styles.text}>Some dummy text</Text>
          <View style={styles.buttonContainer}>
            <Button color="white" title="Go back" onPress={onBackHandler} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  text: {
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
    width: 120,
    borderRadius: 20,
    backgroundColor: 'lightgreen',
  },
});
