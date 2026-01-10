import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const UpdateTeacherStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  scrollContentContainer: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#004a99',
    fontWeight: '600',
    marginTop: 16,
  },
  imageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#004a99',
  },
  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#f38120',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004a99',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f38120',
    paddingBottom: 8,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004a99',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  multilineInput: {
    minHeight: 100,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#d32f2f',
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#004a99',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  searchButtonContainer: {
    marginTop: 12,
  },
  searchButton: {
    backgroundColor: '#004a99',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#f38120',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  foundContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  foundText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
    flex: 1,
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default UpdateTeacherStyles;
