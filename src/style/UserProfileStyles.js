import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    padding: 16,
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  editIcon: {
    fontSize: 20,
    color: '#fff',
  },

  profileCard: {
    backgroundColor: '#fff',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    alignItems: 'center',
    padding: 20,
    elevation: 2,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
  },

  role: {
    fontSize: 14,
    color: '#666',
  },

  section: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 5,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingTop: 12,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 6,
  },

  field: {
    paddingVertical: 12,
  },

  label: {
    fontSize: 12,
    color: '#666',
  },

  value: {
    fontSize: 16,
    color: '#222',
    marginTop: 4,
  },

  input: {
    fontSize: 16,
    color: '#222',
    marginTop: 4,
    paddingVertical: 4,
  },

  divider: {
    height: 1,
    marginTop: 10,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    //margin: 16,
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: '#1976D2',
    flex: 1,
    marginRight: 8,
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
  },

  cancelBtn: {
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginLeft: 8,
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
  },

  cancelText: {
    color: '#333',
    fontWeight: '600',
  },

editProfileBtn: {
  backgroundColor: '#1976D2', // Blue color, you can change it
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 3, // for shadow on Android
  shadowColor: '#000', // for shadow on iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
},
// btnText: {
//   color: '#fff',
//   fontSize: 16,
//   fontWeight: 'bold',
// },


});
