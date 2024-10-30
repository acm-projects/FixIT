import React, { useContext } from 'react';
import { Text, Divider, useTheme } from '@rneui/themed';
import { ScrollView, StyleSheet, View } from 'react-native';

type DividerViewTypes = {
  width ?: number,
};

const DividerView: React.FunctionComponent<DividerViewTypes> = ({width}) => {
const { theme } = useTheme();
return (
  <>
    <Divider
      width={width} />
  </>
);
};