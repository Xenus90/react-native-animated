import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, NavigationProp } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

const POSTS: { id: number, image: string }[] = [
  {
    id: 0,
    image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg',
  },
];

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export const List = (props: Props) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      {POSTS.map(post => (
        <Pressable
          key={post.id}
          style={styles.imageContainer}
          onPress={() => navigation.navigate('Details', { post })}
        >
          <SharedElement id={post.id.toString()}>
            <Image style={styles.image} source={{ uri: post.image }} />
          </SharedElement>
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '50%',
  },
  image: {
    height: 180,
  },
});
