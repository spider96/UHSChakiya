import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Dr. A.K. Sharma',
    role: 'Administrator',
    email: 'admin@uhschakiya.edu.in',
    mobile: '9876543210',
    dob: '15 Aug 1985',
    qualification: 'M.Sc Physics, B.Ed',
    avatar: 'https://i.pravatar.cc/300', // replace with real image
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View> */}

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>

        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Details Card */}
      <View style={styles.detailCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>{user.mobile}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>{user.dob}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Qualification</Text>
          <Text style={styles.value}>{user.qualification}</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f9',
  },

  header: {
    backgroundColor: '#0b4fa3',
    paddingVertical: 18,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  profileCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 24,
    elevation: 4,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#0b4fa3',
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  role: {
    color: '#ff7a18',
    fontWeight: '600',
    marginVertical: 4,
  },

  email: {
    color: '#555',
    fontSize: 13,
  },

  detailCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },

  row: {
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginTop: 2,
  },

  editBtn: {
    backgroundColor: '#0b4fa3',
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  logoutBtn: {
    borderColor: '#d32f2f',
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  logoutText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
