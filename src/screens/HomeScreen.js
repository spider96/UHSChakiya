import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
// Ensure npx expo install lucide-react-native react-native-svg is run
import { 
  Menu, 
  Megaphone, 
  ChevronRight, 
  Info, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  CheckCircle2 
} from 'lucide-react-native';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#004a99" />

      {/* FIXED HEADER (Not Scrollable) */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <View style={styles.logoPlaceholder}>
                <Text style={{fontSize: 8, color: '#004a99', fontWeight: 'bold'}}>LOGO</Text>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.schoolName}>UCHCH MADHYAMIK</Text>
                <Text style={styles.schoolName}>VIDYALAYA CHAKIYA</Text>
                <Text style={styles.subHeader}>Affiliated to BSEB | Excellence in Education</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Menu color="white" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* SCROLLABLE BODY */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        
        {/* 1. Hero Banner */}
        <View style={styles.heroContainer}>
          <View style={styles.heroPlaceholder}>
             {/* Replace with <Image source={...} /> in production */}
            <Text style={{color: '#fff'}}>Hero Image (Students Saluting)</Text>
            <View style={styles.pagination}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* 2. Notice Board */}
        <View style={styles.card}>
          <View style={styles.noticeHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Megaphone color="white" size={18} />
              <Text style={styles.noticeTitle}>Notice Board</Text>
            </View>
            <TouchableOpacity style={styles.viewAllBtnHeader}>
              <Text style={styles.viewAllTextHeader}>View All</Text>
              <ChevronRight color="#0056b3" size={14} />
            </TouchableOpacity>
          </View>
          <View style={styles.noticeList}>
            <NoticeItem text="Class 12 Exam Form Submission 12 Sep 2021" />
            <NoticeItem text="Holiday Notice: Durga Puja 18 Oct 2021" />
            <NoticeItem text="Scholarship Application Update 05 Oct 2021" />
            <TouchableOpacity style={styles.viewAllInline}>
              <Text style={styles.viewAllInlineText}>View All</Text>
              <ChevronRight color="#0056b3" size={14} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. QUICK LINKS GRID (The section you requested) */}
        <View style={styles.gridContainer}>
          <GridItem icon={<Info color="#0056b3" size={30} />} label="About Us" />
          <GridItem icon={<BookOpen color="#0056b3" size={30} />} label="Courses Offered" />
          <GridItem icon={<Users color="#0056b3" size={30} />} label="Our Faculty" />
          <GridItem icon={<ImageIcon color="#0056b3" size={30} />} label="Gallery" />
        </View>

        {/* 4. About Us Detailed Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleMain}>About Us</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.sectionPara}>
            UCHCH MADHYAMIK VIDYALAYA CHAKIYA is a reputed government institution committed to providing quality education and holistic development of students.
          </Text>
          <TouchableOpacity style={styles.readMore}>
            <Text style={styles.readMoreText}>Read More</Text>
            <ChevronRight color="#0056b3" size={14} />
          </TouchableOpacity>
        </View>

        {/* 5. Courses Offered Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleMain}>Courses Offered</Text>
          <View style={styles.titleUnderline} />
          <View style={styles.courseRow}>
            <CheckCircle2 color="green" size={18} />
            <Text style={styles.courseText}>Class 9 - 10 (Matric)</Text>
          </View>
          <View style={styles.courseRow}>
            <CheckCircle2 color="green" size={18} />
            <Text style={styles.courseText}>Class 11 - 12 (Science, Arts)</Text>
          </View>
        </View>

        {/* 6. Our Faculty Section */}
        <View style={styles.facultyHeader}>
          <Text style={styles.sectionTitleMain}>Our Faculty</Text>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.viewAllInlineText}>View All</Text>
            <ChevronRight color="#0056b3" size={14} />
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.facultyScroll}>
          <FacultyCard name="Dr. A.K. Sharma" role="Physics | 15 Years" />
          <FacultyCard name="Mrs. S. Verma" role="Mathematics | 12 Years" />
          <FacultyCard name="Mr. R.K. Singh" role="English | 10 Years" />
        </ScrollView>

        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

// Sub-Components
const NoticeItem = ({ text }) => (
  <View style={styles.noticeItem}>
    <View style={styles.bullet} />
    <Text style={styles.noticeText}>{text}</Text>
  </View>
);

const GridItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.gridBox}>
    <View style={styles.iconWrapper}>{icon}</View>
    <Text style={styles.gridLabel}>{label}</Text>
  </TouchableOpacity>
);

const FacultyCard = ({ name, role }) => (
  <View style={styles.fCard}>
    <View style={styles.fImagePlaceholder} />
    <View style={styles.fInfo}>
      <Text style={styles.fName}>{name}</Text>
      <Text style={styles.fRole}>{role}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f0f2f5' },
  headerSafeArea: { 
    backgroundColor: '#004a99', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { backgroundColor: '#004a99', padding: 15 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoPlaceholder: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  headerTextContainer: { marginLeft: 10 },
  schoolName: { color: 'white', fontWeight: 'bold', fontSize: 14, lineHeight: 18 },
  subHeader: { color: 'white', fontSize: 10, marginTop: 2 },
  
  scrollContainer: { flex: 1 },
  heroContainer: { height: 220, width: '100%' },
  heroPlaceholder: { flex: 1, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' },
  pagination: { position: 'absolute', bottom: 10, flexDirection: 'row' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 4 },
  activeDot: { backgroundColor: 'white' },

  card: { margin: 12, backgroundColor: 'white', borderRadius: 8, elevation: 3, overflow: 'hidden' },
  noticeHeader: { backgroundColor: '#f38120', padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  noticeTitle: { color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  viewAllBtnHeader: { backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, flexDirection: 'row', alignItems: 'center' },
  viewAllTextHeader: { color: '#0056b3', fontWeight: 'bold', fontSize: 12, marginRight: 2 },
  noticeList: { padding: 15 },
  noticeItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bullet: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#f38120', marginRight: 10 },
  noticeText: { fontSize: 13, color: '#444' },
  viewAllInline: { alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' },
  viewAllInlineText: { color: '#0056b3', fontWeight: 'bold', fontSize: 14, marginRight: 4 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 12 },
  gridBox: { width: '23%', backgroundColor: 'white', borderRadius: 8, padding: 10, alignItems: 'center', elevation: 2, marginBottom: 10 },
  iconWrapper: { marginBottom: 5 },
  gridLabel: { fontSize: 10, textAlign: 'center', color: '#333', fontWeight: '600' },

  sectionCard: { margin: 12, backgroundColor: 'white', padding: 15, borderRadius: 8, elevation: 2 },
  sectionTitleMain: { fontSize: 18, fontWeight: 'bold', color: '#004a99' },
  titleUnderline: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  sectionPara: { fontSize: 14, color: '#555', lineHeight: 22 },
  readMore: { alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  readMoreText: { color: '#0056b3', fontWeight: 'bold', marginRight: 4 },

  courseRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  courseText: { marginLeft: 10, fontSize: 15, color: '#333' },

  facultyHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 10, alignItems: 'center' },
  facultyScroll: { paddingLeft: 12, marginTop: 10 },
  fCard: { width: 150, marginRight: 15, borderRadius: 8, overflow: 'hidden', backgroundColor: 'white', elevation: 3, marginBottom: 10 },
  fImagePlaceholder: { height: 130, backgroundColor: '#ddd' },
  fInfo: { backgroundColor: '#004a99', padding: 10 },
  fName: { color: 'white', fontSize: 13, fontWeight: 'bold' },
  fRole: { color: '#ddd', fontSize: 11, marginTop: 2 }
});

export default App;