import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AddStudentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#004a99',
    padding: 16,
    paddingTop: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 4,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  scrollContentContainer: {
    paddingBottom: 30,
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  inputFocused: {
    borderColor: '#004a99',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#0A5ED7',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  infoText: {
    color: '#0d47a1',
    fontSize: 12,
    lineHeight: 18,
  },
  /* Image Upload Styles */
  uploadButton: {
    borderWidth: 2,
    borderColor: '#0A5ED7',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A5ED7',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePreview: {
    width: 120,
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  removeImageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#d32f2f',
    borderRadius: 6,
  },
  removeImageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AddStudentStyles;
