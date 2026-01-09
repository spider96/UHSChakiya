import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#004a99',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  logoText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  schoolName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004a99',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004a99',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 13,
    color: '#666',
    marginBottom: 24,
    lineHeight: 18,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '500',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  rememberMeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#0A5ED7',
    fontWeight: '600',
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    marginTop: 24,
  },
  loginButton: {
    backgroundColor: '#0A5ED7',
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    color: '#999',
    fontSize: 12,
    marginHorizontal: 12,
    fontWeight: '500',
  },
  footerSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  footerLink: {
    fontSize: 12,
    color: '#0A5ED7',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  infoText: {
    color: '#0d47a1',
    fontSize: 11,
    lineHeight: 16,
  },
});

export default LoginStyles;
