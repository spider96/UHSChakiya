import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity ,Image} from 'react-native';
import { Megaphone, Info, BookOpen, Users, ImageIcon,ChevronRight } from 'lucide-react-native';
import styles from '../style/HomeStyles';



// --- UI SUB-COMPONENTS ---
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

const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false);
  
  // Array of banner images - add more images as needed
  const bannerImages = [
    require('../assets/banner.jpg'),
    require('../assets/banner.jpg'), // Replace with other image files
    require('../assets/banner.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageLoadError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageLoadError(true);
  };

  return (
    <View style={styles.slideshowContainer}>
      {isLoading && !imageLoadError && (
        <View style={styles.heroImage}>
          <Text style={styles.loadingText}>Loading Image...</Text>
        </View>
      )}
      {imageLoadError && (
        <View style={styles.heroImage}>
          <Text style={styles.errorText}>Image Not Available</Text>
        </View>
      )}
      {!imageLoadError && (
        <Image 
          source={bannerImages[currentImageIndex]} 
          style={styles.heroImage}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {bannerImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === currentImageIndex ? styles.activeDot : styles.inactiveDot,
            ]}
            onPress={() => goToImage(index)}
          />
        ))}
      </View>
    </View>
  );
};

const HomeContent = ({onNavigate}) => {
  return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        
        {/* 1. Hero Banner Slideshow */}
        <View style={styles.heroContainer}>
          <ImageSlideshow />
        </View>

        {/* 2. Notice Board */}
        <View style={styles.card}>
          <View style={styles.noticeHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Megaphone color="white" size={18} />
              <Text style={styles.noticeTitle}>Notice Board</Text>
            </View>
            <TouchableOpacity style={styles.viewAllBtnHeader} onPress={() => onNavigate('NOTICES')}>
              <Text style={styles.viewAllTextHeader}>View All</Text>
              <ChevronRight color="#0056b3" size={14} />
            </TouchableOpacity>
          </View>
          <View style={styles.noticeList}>
            <NoticeItem text="Class 12 Exam Form Submission 12 Sep 2021" />
            <NoticeItem text="Holiday Notice: Durga Puja 18 Oct 2021" />
            <TouchableOpacity style={styles.viewAllInline}>
              <Text style={styles.viewAllInlineText}>View All</Text>
              <ChevronRight color="#0056b3" size={14} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Quick Links Grid */}
        <View style={styles.gridContainer}>
          <GridItem icon={<Info color="#0056b3" size={30} />} label="About Us" />
          <GridItem icon={<BookOpen color="#0056b3" size={30} />} label="Courses" />
          <GridItem icon={<Users color="#0056b3" size={30} />} label="Faculty" />
          <GridItem icon={<ImageIcon color="#0056b3" size={30} />} label="Gallery" />
        </View>

        {/* 4. About Us Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleMain}>About Us</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.sectionPara}>
            UCHCH MADHYAMIK VIDYALAYA CHAKIYA is a reputed government institution committed to excellence.
          </Text>
          <TouchableOpacity style={styles.readMore}>
            <Text style={styles.readMoreText}>Read More</Text>
            <ChevronRight color="#0056b3" size={14} />
          </TouchableOpacity>
        </View>

        {/* 4.1 Courses Offered Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleMain}>Courses Offered</Text>
          <View style={styles.titleUnderline} />
          <View style={styles.coursesList}>
            <View style={styles.courseItem}>
              <Text style={styles.courseBullet}>•</Text>
              <Text style={styles.courseText}>Class 09-10 (Matric Board)</Text>
            </View>
            <View style={styles.courseItem}>
              <Text style={styles.courseBullet}>•</Text>
              <Text style={styles.courseText}>Class 11-12 (Science & Arts)</Text>
            </View>
          </View>
        </View>

        {/* 5. Our Faculty Section */}
        <View style={styles.facultyHeader}>
          <Text style={styles.sectionTitleMain}>Our Faculty</Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.facultyScroll}>
          <FacultyCard name="Saurabh Kumar" role="Math | 15 Years" />
          <FacultyCard name="Mrs. S. Verma" role="Maths | 12 Years" />
          <FacultyCard name="Mr. R.K. Singh" role="English | 10 Years" />
        </ScrollView>

        <View style={{height: 40}} />
      </ScrollView>
  );
};


export default HomeContent;