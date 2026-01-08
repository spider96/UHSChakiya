import React, { useState, useRef, useEffect } from 'react';
import styles from '../style/UserProfileStyles';
import SubHeader from '../components/SubHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';

const AnimatedDivider = ({ active }) => {
  const colorAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: active ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [active]);

  const dividerColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#1976D2'],
  });

  return <Animated.View style={[styles.divider, { backgroundColor: dividerColor }]} />;
};

const Field = ({ label, value, editable, onChangeText }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>

    {editable ? (
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}

    <AnimatedDivider active={editable} />
  </View>
);

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Dr. A.K. Sharma',
    role: 'Administrator',
    email: 'admin@uhschakiya.edu.in',
    mobile: '9876543210',
    qualification: 'M.Sc Physics, B.Ed',
    avatar: 'https://i.pravatar.cc/300',
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    // 🔜 API call here
  };

  const handleChange = (key, value) => {
    setTempProfile({ ...tempProfile, [key]: value });
  };

  const data = isEditing ? tempProfile : profile;

  return (
    <View style={styles.container}>
      <SubHeader title="My Profile" />
      <ScrollView >
        {/* Header */}

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: data.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.role}</Text>
        </View>

        {/* Sections */}
        <Section title="Personal Information">
          <Field
            label="Full Name"
            value={data.name}
            editable={isEditing}
            onChangeText={(v) => handleChange('name', v)}
          />

          <Field
            label="Qualification"
            value={data.qualification}
            editable={isEditing}
            onChangeText={(v) => handleChange('qualification', v)}
          />
        </Section>

        <Section title="Contact Information">
          <Field
            label="Email"
            value={data.email}
            editable={isEditing}
            onChangeText={(v) => handleChange('email', v)}
          />

          <Field
            label="Mobile"
            value={data.mobile}
            editable={isEditing}
            onChangeText={(v) => handleChange('mobile', v)}
          />
        </Section>

        {/* Action Buttons */}
        {isEditing ? (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginTop: 5, alignItems: 'center' }}>
            <TouchableOpacity style={styles.editProfileBtn} onPress={handleEdit}>
              <Text style={styles.btnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
