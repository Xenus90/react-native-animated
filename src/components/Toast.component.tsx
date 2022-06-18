import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Button, StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
  onHide: () => void;
};

const Message = (props: Props) => {
  const { message, onHide } = props;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, [opacity, onHide]);

  return (
    <Animated.View style={[styles.messageContainer, {
      opacity,
      transform: [
        {
          translateY: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
        },
      ],
    }]}
    >
      <Text>{message}</Text>
    </Animated.View>
  );
};

export const Toast = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = () => {
    setMessages(prevState => ([...prevState, `Message ${Math.random().toFixed(4)}`]));
  };

  const onHide = useCallback((message: string) => {
    setMessages(prevState => prevState.filter(item => item !== message));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map(item => (
          <Message key={Math.random()} message={item} onHide={() => onHide(item)} />
        ))}
      </View>
      <View>
        <Text>{`Messages in the stack: ${messages.length}`}</Text>
      </View>
      <Button title="Add message" onPress={addMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
  },
  messageContainer: {
    padding: 10,
    margin: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
});
