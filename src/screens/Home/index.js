import React from 'react';
import { Text, Divider, Layout, StyleService, useStyleSheet } from '@ui-kitten/components';
import { HOME } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background-basic-color-4',
  },
});

const Home = () => {
  const styles = useStyleSheet(themedStyles);
  return (
    <>
      <Header isMenuVisible title={capitalize(HOME)} />
      <Divider />
      <Layout style={styles.container}>
        <Text category="h1">Home Stuff</Text>
      </Layout>
    </>
  );
};

export default Home;
