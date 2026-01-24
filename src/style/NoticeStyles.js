import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5F9' },

  header: {
    backgroundColor: '#0B4DA2',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  addButton: {
    backgroundColor: '#0A5ED7',
    marginHorizontal: 12,
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },

  addButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },

  list: { padding: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B4DA2',
    flex: 1,
  },

  badge: {
    backgroundColor: '#FF3D00',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  content: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginTop: 8,
  },

  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  date: { fontSize: 12, color: '#777' },

  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0B4DA2',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  editButton: {
    backgroundColor: '#0A5ED7',
  },

  deleteButton: {
    backgroundColor: '#d32f2f',
  },

  actionButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
}); 