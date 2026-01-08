import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function SubHeader({title}) {
  return (
      <View style={subHeaderStyles.subHeader}>
        <Icon name='av-timer' size={24} color="#0B4DA2" />
        <Text style={subHeaderStyles.subHeaderTitle}>{title}</Text>
      </View>
  );
}



const subHeaderStyles = StyleSheet.create({
  subHeader: { 
//     flexDirection: 'row',
//     padding: 10,
//     // paddingVertical: 20,
//     // paddingHorizontal: 20,
     backgroundColor: '#FFFFFF',
     borderBottomWidth: 1,
     borderBottomColor: '#E2E8F0',
//     marginBottom: 5,
     elevation: 2,
//     gap: 8,
//    // padding: 16,
//    backgroundColor: '#0B4DA2',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

  },
   subHeaderTitle: {
    fontSize: 24,
    fontWeight: '700',
    //color: '#1E293B',
    color:'#0B4DA2'
  },
});