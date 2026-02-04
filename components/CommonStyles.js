import { StyleSheet } from 'react-native';

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: '#4b7bec',
  },
  buttonSuccess: {
    backgroundColor: '#20bf6b',
  },
  buttonDanger: {
    backgroundColor: '#ff6348',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff6348',
    fontSize: 12,
    marginTop: 4,
  },
  successText: {
    color: '#20bf6b',
    fontSize: 12,
    marginTop: 4,
  },
});
