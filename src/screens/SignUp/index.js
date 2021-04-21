import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Input, Layout, Text, Card, Button } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import { Firebase, withFirebase } from '../../services/Firebase';
import { LOGIN } from '../../constants/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  card: {
    flex: -1,
    padding: 15,
    justifyContent: 'space-between',
  },
  input: {
    width: 250,
  },
});

const SignUp = ({ firebase, navigation }) => {
  const [error, setError] = useState(null);
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (values) => {
    const { username, email, password } = values;
    firebase
      .doCreateUserWithEmailAndPassword(username, email, password)
      .then(() => {
        // navigation.navigate(HOME);
      })
      .catch((err) => {
        // TODO: implement flash error messages
        // console.error(err);
        setError(err);
      });
  };

  const navigateToSignIn = () => {
    navigation.navigate(LOGIN);
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h2">Sign Up!!</Text>
        <Text category="c1" status="danger">
          {error ? `${error.code}: ${error.message} (${error.a})` : null}
        </Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Username"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              status={errors.username ? 'danger' : null}
            />
          )}
          name="username"
          rules={{
            required: {
              value: true,
              message: 'Username is required',
            },
            minLength: {
              value: 3,
              message: 'Username must be at 3 characters long.',
            },
          }}
          defaultValue=""
        />
        {errors.username && (
          <Text status="danger" category="c1">
            {errors.username.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="E-mail"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              status={errors.email ? 'danger' : null}
            />
          )}
          name="email"
          rules={{
            required: {
              value: true,
              message: 'E-mail address is required.',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          defaultValue=""
        />
        {errors.email && (
          <Text status="danger" category="c1">
            {errors.email.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
          rules={{
            required: {
              value: true,
              message: 'Password is required.',
            },
            minLength: {
              value: 6,
              message: 'Password must be at 6 characters long.',
            },
          }}
          defaultValue=""
        />
        {errors.password && (
          <Text status="danger" category="c1">
            {errors.password.message}
          </Text>
        )}
        <Text>Already have an account?</Text>
        <Button onPress={navigateToSignIn} size="tiny" appearance="ghost">
          Sign In
        </Button>
        <Button title="Submit" onPress={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
      </Card>
    </Layout>
  );
};

SignUp.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignUp);
