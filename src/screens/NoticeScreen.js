import React, { useEffect, useState, memo, useRef } from 'react';
import styles from '../style/NoticeStyles';
import SubHeader from '../components/SubHeader';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    LayoutAnimation,
    Animated,
    Platform,
    UIManager,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getNotices } from '../api/noticeService';
//import { STORAGE_KEYS } from '../utils/storageKeys';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const STORAGE_KEYS = {
    NOTICES: 'CACHED_NOTICES',
};


const NOTICE_DATA = [
    {
        id: '1',
        title: 'Upcoming Parent-Teacher Meeting',
        short:
            'Scheduled on May 25, 2024. Please ensure your timely participation.',
        full:
            'We will be holding a parent-teacher meeting on May 25, 2024, at 10:00 AM in the school auditorium. All parents are encouraged to attend to discuss their child’s progress and address any concerns.',
        createdAt: '2026-01-08',
    },
    {
        id: '2',
        title: 'Exam Schedule for Term 2',
        short: 'The Term 2 exams will begin from June 5, 2024.',
        full:
            'Term 2 examinations will begin from June 5, 2024. Detailed subject-wise timetable will be shared shortly. Students are advised to prepare accordingly.',
        createdAt: '2025-05-20',
    },
    {
        id: '3',
        title: 'Holiday Announcement',
        short: 'School will be closed on June 14, 2024.',
        full:
            'The school will remain closed on June 14, 2024, on account of Eid celebrations. Regular classes will resume from the next working day.',
        createdAt: '2025-05-20',
    },
];



/* ---------- Helpers ---------- */
// const isNewNotice = (createdAt) => {
//     const now = new Date();
//     const createdDate = new Date(createdAt);
//     const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
//     return diffDays <= 3;
// };

const isNewNotice = (createdAt) => {
    if (!createdAt) return false; // Safety check
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 3;
};

/* ---------- Notice Card ---------- */
// const NoticeCard = ({ item }) => {
//     const [expanded, setExpanded] = useState(false);

//     const toggle = () => {
//         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         setExpanded(!expanded);
//     };

//     return (
//         <View style={styles.card}>
//             <View style={styles.titleRow}>
//                 <Icon name="campaign" size={22} color="#0B4DA2" />
//                 <Text style={styles.title}>{item.title}</Text>

//                 {isNewNotice(item.createdAt) && (
//                     <View style={styles.badge}>
//                         <Text style={styles.badgeText}>NEW</Text>
//                     </View>
//                 )}
//             </View>

//             <Text style={styles.content}>
//                 {expanded ? item.full : item.short}
//             </Text>

//             <View style={styles.footer}>
//                 <View style={styles.dateRow}>
//                     <Icon name="event" size={16} color="#777" />
//                     <Text style={styles.date}>
//                         {new Date(item.createdAt).toDateString()}
//                     </Text>
//                 </View>

//                 <TouchableOpacity onPress={toggle} style={styles.readMoreRow}>
//                     <Text style={styles.readMore}>
//                         {expanded ? 'Read Less' : 'Read More'}
//                     </Text>
//                     <Icon
//                         name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
//                         size={22}
//                         color="#0B4DA2"
//                     />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };


// const NoticeCard = memo(({ item }) => {
//     const [expanded, setExpanded] = useState(false);

//     const toggle = () => {
//         // Use a simpler animation config to reduce flickering on Android
//         LayoutAnimation.configureNext({
//             duration: 300,
//             create: { type: 'easeInEaseOut', property: 'opacity' },
//             update: { type: 'easeInEaseOut' },
//         });
//         setExpanded(!expanded);
//     };

const NoticeCard = memo(({ item }) => {
    const [expanded, setExpanded] = useState(false);
    // 0 = collapsed, 1 = expanded
    const animationValue = useRef(new Animated.Value(0)).current;

    const toggle = () => {
        const toValue = expanded ? 0 : 1;
        setExpanded(!expanded);

        Animated.timing(animationValue, {
            toValue,
            duration: 300,
            useNativeDriver: false, // Height doesn't support native driver
        }).start();
    };

    // Interpolate the animation value to show/hide the full text
    const contentOpacity = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    // Use createdAt if available, otherwise fallback to date
    const displayDate = item.createdAt || item.date;

    // return (
    //     <View style={styles.card}>
    //         <View style={styles.titleRow}>
    //             <Icon name="campaign" size={22} color="#0B4DA2" />
    //             <Text style={styles.title}>{item.title}</Text>
    //             {isNewNotice(displayDate) && (
    //                 <View style={styles.badge}>
    //                     <Text style={styles.badgeText}>NEW</Text>
    //                 </View>
    //             )}
    //         </View>

    //         <Text style={styles.content}>
    //             {expanded ? item.full : item.short}
    //         </Text>

    //         <View style={styles.footer}>
    //             <View style={styles.dateRow}>
    //                 <Icon name="event" size={16} color="#777" />
    //                 <Text style={styles.date}>
    //                     {displayDate ? new Date(displayDate).toDateString() : 'No Date'}
    //                 </Text>
    //             </View>

    //             <TouchableOpacity onPress={toggle} style={styles.readMoreRow}>
    //                 <Text style={styles.readMore}>
    //                     {expanded ? 'Read Less' : 'Read More'}
    //                 </Text>
    //                 <Icon
    //                     name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
    //                     size={22}
    //                     color="#0B4DA2"
    //                 />
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );


    return (
        <View style={styles.card}>
            <View style={styles.titleRow}>
                <Icon name="campaign" size={22} color="#0B4DA2" />
                <Text style={styles.title}>{item.title}</Text>
                {isNewNotice(displayDate) && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>NEW</Text>
                    </View>
                )}
            </View>

            {/* Always show short text, or swap to full text smoothly */}
            <Text style={styles.content}>
                {expanded ? item.full : item.short}
            </Text>

            <View style={styles.footer}>
                <View style={styles.dateRow}>
                    <Icon name="event" size={16} color="#777" />
                    <Text style={styles.date}>
                        {displayDate ? new Date(displayDate).toDateString() : 'No Date'}
                    </Text>
                </View>

                <TouchableOpacity onPress={toggle} style={styles.readMoreRow}>
                    <Text style={styles.readMore}>
                        {expanded ? 'Read Less' : 'Read More'}
                    </Text>
                    <Icon
                        name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={22}
                        color="#0B4DA2"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

/* ---------- Screen ---------- */
const NoticeBoardScreen = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadNotices();
    }, []);

    /* ---------- Load Notices ---------- */
    const loadNotices = async () => {
        try {
            //  const data = await getNotices();
            const data = NOTICE_DATA;
            setNotices(data);

            // Save to offline cache
            await AsyncStorage.setItem(
                STORAGE_KEYS.NOTICES,
                JSON.stringify(data)
            );
        } catch (error) {
            console.log('API failed, loading cached data');

            // Load cached data
            const cached = await AsyncStorage.getItem(STORAGE_KEYS.NOTICES);
            if (cached) {
                setNotices(JSON.parse(cached));
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    /* ---------- Pull To Refresh ---------- */
    const onRefresh = () => {
        setRefreshing(true);
        loadNotices();
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0B4DA2" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Icon name='av-timer' size={24} color="#fff" />
                <Text style={styles.headerTitle}>Notice Board</Text>
            </View> */}

            <SubHeader title="Notice Board" />

            {/* <FlatList
                data={notices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NoticeCard item={item} />}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#0B4DA2']}
                    />
                }
            /> */}

            <FlatList
                data={notices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NoticeCard item={item} />}
                contentContainerStyle={styles.list}
                // Optimization props:
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#0B4DA2']}
                    />
                }
            />

        </View>
    );
};

export default NoticeBoardScreen;
