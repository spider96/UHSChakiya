import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },

  // Common styles
  formCard: {
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004a99',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#f38120',
  },

  fieldGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },

  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#ffe6e6',
  },

  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },

  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  flex: {
    flex: 1,
  },

  // Mark Attendance Screen
  classSelector: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },

  classSelectorText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  dateContainer: {
    marginBottom: 14,
  },

  dateDisplay: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  dateDisplayText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  studentList: {
    marginTop: 16,
  },

  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },

  studentItemSelected: {
    backgroundColor: '#e8f4f8',
    borderColor: '#004a99',
  },

  studentCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#004a99',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#004a99',
  },

  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  studentRoll: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  statusSelector: {
    flexDirection: 'row',
    gap: 8,
  },

  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },

  statusButtonActive: {
    backgroundColor: '#004a99',
    borderColor: '#004a99',
  },

  statusButtonText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
  },

  statusButtonTextActive: {
    color: 'white',
  },

  // Attendance Status Colors
  presentStatus: {
    color: '#27ae60',
    fontWeight: '600',
  },

  absentStatus: {
    color: '#e74c3c',
    fontWeight: '600',
  },

  leaveStatus: {
    color: '#f39c12',
    fontWeight: '600',
  },

  notMarkedStatus: {
    color: '#999',
    fontWeight: '500',
  },

  // Buttons
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    margin: 16,
    marginTop: 20,
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButton: {
    backgroundColor: '#004a99',
  },

  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  cancelButton: {
    backgroundColor: '#e0e0e0',
  },

  cancelButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },

  // View Attendance Screen
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
    alignItems: 'center',
  },

  filterSelect: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  filterButton: {
    backgroundColor: '#004a99',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  filterButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  attendanceTable: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#004a99',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  tableHeaderCell: {
    flex: 1,
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },

  tableCell: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },

  // Statistics Screen
  statsContainer: {
    padding: 10,
  },

  statsCard: {
    backgroundColor: 'white',
    //borderRadius: 5,
    padding: 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
   // borderWidth: 1,
    borderTopWidth: 4,
    borderTopColor: '#e0e1e2',
   // elevation: 3,
  },

  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004a99',
    marginBottom: 12,
  },

  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#004a99',
  },

  statPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },

  statBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#f0f2f5',
  },

  statBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },

  // Attendance Summary Grid
  summaryGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
 //   paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },

  summaryCard: {
    width: (width - 110) / 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#004a99',
  },

  summaryCardGreen: {
    borderLeftColor: '#27ae60',
  },

  summaryCardRed: {
    borderLeftColor: '#e74c3c',
  },

  summaryCardOrange: {
    borderLeftColor: '#f39c12',
  },

  summaryNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004a99',
    marginBottom: 4,
  },

  summaryLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004a99',
  },

  closeButton: {
    padding: 8,
  },

  // Empty State
  emptyStateContainer: {
    margin: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },

  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
  },

  // Loading
  loadingContainer: {
    margin: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontWeight: '500',
  },
});
