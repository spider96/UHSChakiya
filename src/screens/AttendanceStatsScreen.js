import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    Modal,
    FlatList,
    Dimensions,
} from 'react-native';
import { BarChart, PieChart, LineChart, Grid } from 'react-native-chart-kit';
import SubHeader from '../components/SubHeader';
import {
    getClasses,
    getStudentsByClass,
    getClassWiseStats,
    getMonthWiseStats,
    getStudentWiseStats,
} from '../services/attendanceService';
import AttendanceStyles from '../style/AttendanceStyles';

export default function AttendanceStatsScreen({ onNavigate }) {
    const [statType, setStatType] = useState('class'); // class, month, student
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [classes, setClasses] = useState([]);
    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);
    const [showMonthModal, setShowMonthModal] = useState(false);

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        try {
            const classList = await getClasses();
            setClasses(classList);
            setSelectedClass(classList[0]);
        } catch (error) {
            Alert.alert('Error', 'Failed to load classes');
        }
    };

    const loadStats = async () => {
        setIsLoading(true);
        try {
            let data;
            if (statType === 'class') {
                data = await getClassWiseStats(selectedMonth, selectedYear);
            } else if (statType === 'month') {
                if (!selectedClass) {
                    Alert.alert('Validation', 'Please select a class');
                    setIsLoading(false);
                    return;
                }
                data = await getMonthWiseStats(selectedClass, selectedYear);
            } else if (statType === 'student') {
                if (!selectedClass) {
                    Alert.alert('Validation', 'Please select a class');
                    setIsLoading(false);
                    return;
                }
                data = await getStudentWiseStats(selectedClass, selectedMonth, selectedYear);
            }
            setStats(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load statistics');
        } finally {
            setIsLoading(false);
        }
    };

    const getMonthName = (monthNumber) => {
        return monthNames[monthNumber - 1];
    };

    const getPercentageColor = (percentage) => {
        if (percentage >= 80) return '#27ae60';
        if (percentage >= 60) return '#f39c12';
        return '#e74c3c';
    };

    const renderClassItem = ({ item }) => (
        <TouchableOpacity
            style={AttendanceStyles.statItem}
            onPress={() => {
                setSelectedClass(item);
                setShowClassModal(false);
            }}
        >
            <Text style={AttendanceStyles.statLabel}>{item}</Text>
        </TouchableOpacity>
    );

    const renderMonthItem = ({ item }) => (
        <TouchableOpacity
            style={AttendanceStyles.statItem}
            onPress={() => {
                setSelectedMonth(item);
                setShowMonthModal(false);
            }}
        >
            <Text style={AttendanceStyles.statLabel}>{getMonthName(item)}</Text>
        </TouchableOpacity>
    );

    const renderClassWiseStats = () => {
        const screenWidth = Dimensions.get('window').width;

        // Prepare data for bar chart
        const barChartData = {
            labels: stats.map(s => s.class.replace('Class ', '')),
            datasets: [
                {
                    data: stats.map(s => s.percentage),
                    color: (opacity = 1) => `rgba(0, 74, 153, ${opacity})`,
                },
            ],
        };

        return (
            <View style={AttendanceStyles.formCard}>
                <Text style={AttendanceStyles.sectionTitle}>Class Wise Statistics</Text>
                <Text style={[AttendanceStyles.label, { marginBottom: 16 }]}>
                    Month: {getMonthName(selectedMonth)} {selectedYear}
                </Text>

                {/* Bar Chart at Top */}
                {stats.length > 0 && (
                    <View style={{ marginVertical: 16, marginLeft: -20 }}>
                        <Text style={[AttendanceStyles.label, { marginBottom: 12, marginLeft: 20 }]}>
                            Class Attendance Comparison
                        </Text>
                        <BarChart
                            data={barChartData}
                            width={screenWidth - 60}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                color: (opacity = 1) => `rgba(0, 74, 153, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                propsForLabels: {
                                    fontSize: 10,
                                },
                            }}
                            style={{ marginHorizontal: 20 }}
                        />
                    </View>
                )}

                {/* Class Details - Full Width Cards */}
                {stats.map((stat, index) => {
                    const chartData = [
                        {
                            name: 'Present',
                            population: stat.presentCount,
                            color: '#27ae60',
                            legendFontColor: '#7F8487',
                            legendFontSize: 12,
                        },
                        {
                            name: 'Absent',
                            population: stat.absentCount,
                            color: '#e74c3c',
                            legendFontColor: '#7F8487',
                            legendFontSize: 12,
                        },
                        {
                            name: 'Leave',
                            population: stat.leaveCount,
                            color: '#f39c12',
                            legendFontColor: '#7F8487',
                            legendFontSize: 12,
                        },
                    ];

                    return (
                        <View key={index} style={AttendanceStyles.statsCard}>
                            <Text style={[AttendanceStyles.statsTitle, { marginBottom: 14, fontSize: 16 }]}>
                                {stat.class}
                            </Text>

                            {/* First Row: Present and Absent */}
                            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                                <View style={[
                                    AttendanceStyles.summaryCard,
                                    AttendanceStyles.summaryCardGreen,
                                    { flex: 1 }
                                ]}>
                                    <Text style={[AttendanceStyles.summaryNumber, { fontSize: 16 }]}>
                                        {stat.presentCount}
                                    </Text>
                                    <Text style={[AttendanceStyles.summaryLabel]}>
                                        Present
                                    </Text>
                                </View>

                                <View style={[
                                    AttendanceStyles.summaryCard,
                                    AttendanceStyles.summaryCardRed,
                                    { flex: 1 }
                                ]}>
                                    <Text style={[AttendanceStyles.summaryNumber, { fontSize: 16 }]}>
                                        {stat.absentCount}
                                    </Text>
                                    <Text style={[AttendanceStyles.summaryLabel]}>
                                        Absent
                                    </Text>
                                </View>
                            </View>

                            {/* Second Row: Leave and Percentage */}
                            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                                <View style={[
                                    AttendanceStyles.summaryCard,
                                    AttendanceStyles.summaryCardOrange,
                                    { flex: 1 }
                                ]}>
                                    <Text style={[AttendanceStyles.summaryNumber, { fontSize: 16 }]}>
                                        {stat.leaveCount}
                                    </Text>
                                    <Text style={[AttendanceStyles.summaryLabel]}>
                                        Leave
                                    </Text>
                                </View>

                                <View style={[
                                    AttendanceStyles.summaryCard,
                                    { borderLeftColor: '#004a99', flex: 1 }
                                ]}>
                                    <Text
                                        style={[
                                            AttendanceStyles.summaryNumber,
                                            {
                                                fontSize: 16,
                                                color: getPercentageColor(stat.percentage)
                                            },
                                        ]}
                                    >
                                        {stat.percentage}%
                                    </Text>
                                    <Text style={[AttendanceStyles.summaryLabel]}>
                                        Overall
                                    </Text>
                                </View>
                            </View>

                            {/* Pie Chart Below */}
                            {(stat.presentCount + stat.absentCount + stat.leaveCount) > 0 && (
                                <View style={{ alignItems: 'center', marginTop: 12 }}>
                                    <PieChart
                                        data={chartData}
                                        width={screenWidth - 100}
                                        height={180}
                                        chartConfig={{
                                            backgroundColor: '#ffffff',
                                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        }}
                                        accessor="population"
                                        backgroundColor="transparent"
                                        paddingLeft={16}
                                        absolute
                                    />
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    };

    const renderMonthWiseStats = () => {
        const screenWidth = Dimensions.get('window').width;

        // Prepare data for line chart
        const lineChartData = {
            labels: stats.slice(0, 12).map(s => s.month.slice(0, 3)),
            datasets: [
                {
                    data: stats.map(s => s.percentage),
                    color: (opacity = 1) => `rgba(0, 74, 153, ${opacity})`,
                    strokeWidth: 2,
                },
            ],
        };

        return (
            <View style={AttendanceStyles.formCard}>
                <Text style={AttendanceStyles.sectionTitle}>Month Wise Statistics</Text>
                <Text style={[AttendanceStyles.label, { marginBottom: 16 }]}>
                    Class: {selectedClass} - Year: {selectedYear}
                </Text>

                {/* Line Chart */}
                {stats.length > 0 && (
                    <View style={{ marginVertical: 16, marginLeft: -20 }}>
                        <Text style={[AttendanceStyles.label, { marginBottom: 12, marginLeft: 20 }]}>
                            Attendance Trend
                        </Text>
                        <LineChart
                            data={lineChartData}
                            width={screenWidth - 60}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                color: (opacity = 1) => `rgba(0, 74, 153, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 2,
                                propsForDots: {
                                    r: '4',
                                    strokeWidth: '2',
                                    stroke: '#004a99',
                                },
                            }}
                            bezier
                            style={{ marginHorizontal: 20 }}
                        />
                    </View>
                )}

                {/* Monthly Details */}
                {stats.map((stat, index) => (
                    <View key={index} style={AttendanceStyles.statsCard}>
                        <View style={[AttendanceStyles.statItem, { borderBottomWidth: 0 }]}>
                            <Text style={AttendanceStyles.statsTitle}>{stat.month}</Text>
                        </View>
                        <View style={AttendanceStyles.summaryGrid}>
                            <View style={[AttendanceStyles.summaryCard, AttendanceStyles.summaryCardGreen]}>
                                <Text style={AttendanceStyles.summaryNumber}>{stat.presentCount}</Text>
                                <Text style={AttendanceStyles.summaryLabel}>Present</Text>
                            </View>
                            <View style={[AttendanceStyles.summaryCard, AttendanceStyles.summaryCardRed]}>
                                <Text style={AttendanceStyles.summaryNumber}>{stat.absentCount}</Text>
                                <Text style={AttendanceStyles.summaryLabel}>Absent</Text>
                            </View>
                            <View style={[AttendanceStyles.summaryCard, AttendanceStyles.summaryCardOrange]}>
                                <Text style={AttendanceStyles.summaryNumber}>{stat.leaveCount}</Text>
                                <Text style={AttendanceStyles.summaryLabel}>Leave</Text>
                            </View>
                            <View style={[AttendanceStyles.summaryCard, { borderLeftColor: '#004a99' }]}>
                                <Text
                                    style={[
                                        AttendanceStyles.summaryNumber,
                                        { color: getPercentageColor(stat.percentage) },
                                    ]}
                                >
                                    {stat.percentage}%
                                </Text>
                                <Text style={AttendanceStyles.summaryLabel}>Overall</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    const renderStudentWiseStats = () => {
        const screenWidth = Dimensions.get('window').width;

        // Prepare data for bar chart (top 10 students)
        const topStudents = stats.slice(0, 10);
        const barChartData = {
            labels: topStudents.map(s => s.rollNo),
            datasets: [
                {
                    data: topStudents.map(s => s.percentage),
                    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
                },
            ],
        };

        return (
            <View style={AttendanceStyles.formCard}>
                <Text style={AttendanceStyles.sectionTitle}>Student Wise Statistics</Text>
                <Text style={[AttendanceStyles.label, { marginBottom: 16 }]}>
                    Class: {selectedClass} - {getMonthName(selectedMonth)} {selectedYear}
                </Text>

                {/* Bar Chart */}
                {stats.length > 0 && (
                    <View style={{ marginVertical: 16, marginLeft: -20 }}>
                        <Text style={[AttendanceStyles.label, { marginBottom: 12, marginLeft: 20 }]}>
                            Top 10 Students Attendance %
                        </Text>
                        <BarChart
                            data={barChartData}
                            width={screenWidth - 60}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                propsForLabels: {
                                    fontSize: 10,
                                },
                            }}
                            style={{ marginHorizontal: 20 }}
                        />
                    </View>
                )}

                {/* Detailed Table */}
                {stats.length > 0 ? (
                    <View style={AttendanceStyles.attendanceTable}>
                        <View style={AttendanceStyles.tableHeader}>
                            <Text style={[AttendanceStyles.tableHeaderCell, { flex: 2 }]}>Student</Text>
                            <Text style={AttendanceStyles.tableHeaderCell}>Present</Text>
                            <Text style={AttendanceStyles.tableHeaderCell}>%</Text>
                        </View>
                        {stats.map((stat, index) => (
                            <View
                                key={index}
                                style={[
                                    AttendanceStyles.tableRow,
                                    index === stats.length - 1 && { borderBottomWidth: 0 },
                                ]}
                            >
                                <View style={{ flex: 2 }}>
                                    <Text
                                        style={[
                                            AttendanceStyles.tableCell,
                                            { textAlign: 'left', fontSize: 11, fontWeight: '600' },
                                        ]}
                                    >
                                        {stat.name}
                                    </Text>
                                    <Text
                                        style={[
                                            AttendanceStyles.tableCell,
                                            { textAlign: 'left', fontSize: 9, color: '#999' },
                                        ]}
                                    >
                                        {stat.rollNo}
                                    </Text>
                                </View>
                                <Text style={AttendanceStyles.tableCell}>{stat.presentCount}</Text>
                                <Text
                                    style={[
                                        AttendanceStyles.tableCell,
                                        { color: getPercentageColor(stat.percentage), fontWeight: 'bold' },
                                    ]}
                                >
                                    {stat.percentage}%
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={AttendanceStyles.emptyStateContainer}>
                        <Text style={AttendanceStyles.emptyStateText}>No attendance data available</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={AttendanceStyles.container}>
            <SubHeader title="Attendance Statistics" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={AttendanceStyles.scrollContainer}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={AttendanceStyles.scrollContentContainer}
                >
                    {/* Stat Type Selection */}
                    <View style={AttendanceStyles.formCard}>
                        <Text style={AttendanceStyles.sectionTitle}>View Type</Text>
                        <View style={[AttendanceStyles.rowContainer, { marginBottom: 10 }]}>
                            {['class', 'month', 'student'].map(type => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        { flex: 1 },
                                        AttendanceStyles.button,
                                        statType === type
                                            ? AttendanceStyles.submitButton
                                            : AttendanceStyles.cancelButton,
                                    ]}
                                    onPress={() => {
                                        setStatType(type);
                                        setStats([]);
                                    }}
                                >
                                    <Text
                                        style={
                                            statType === type
                                                ? AttendanceStyles.submitButtonText
                                                : AttendanceStyles.cancelButtonText
                                        }
                                    >
                                        {type === 'class' ? 'By Class' : type === 'month' ? 'By Month' : 'By Student'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Filters */}
                    <View style={AttendanceStyles.formCard}>
                        <Text style={AttendanceStyles.sectionTitle}>Filters</Text>

                        {/* Month Filter */}
                        <View style={AttendanceStyles.fieldGroup}>
                            <Text style={AttendanceStyles.label}>Month</Text>
                            <TouchableOpacity
                                style={AttendanceStyles.classSelector}
                                onPress={() => setShowMonthModal(true)}
                            >
                                <Text style={AttendanceStyles.classSelectorText}>
                                    {getMonthName(selectedMonth)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Year Filter */}
                        <View style={AttendanceStyles.fieldGroup}>
                            <Text style={AttendanceStyles.label}>Year</Text>
                            <View style={AttendanceStyles.rowContainer}>
                                <TouchableOpacity
                                    style={[
                                        AttendanceStyles.button,
                                        AttendanceStyles.cancelButton,
                                        { flex: 0.5 },
                                    ]}
                                    onPress={() => setSelectedYear(selectedYear - 1)}
                                >
                                    <Text style={AttendanceStyles.cancelButtonText}>−</Text>
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        AttendanceStyles.input,
                                        {
                                            flex: 1,
                                            textAlign: 'center',
                                            marginHorizontal: 8,
                                            paddingVertical: 10,
                                        },
                                    ]}
                                >
                                    {selectedYear}
                                </Text>
                                <TouchableOpacity
                                    style={[
                                        AttendanceStyles.button,
                                        AttendanceStyles.cancelButton,
                                        { flex: 0.5 },
                                    ]}
                                    onPress={() => setSelectedYear(selectedYear + 1)}
                                >
                                    <Text style={AttendanceStyles.cancelButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Class Filter for Month & Student Views */}
                        {(statType === 'month' || statType === 'student') && (
                            <View style={AttendanceStyles.fieldGroup}>
                                <Text style={AttendanceStyles.label}>Class</Text>
                                <TouchableOpacity
                                    style={AttendanceStyles.classSelector}
                                    onPress={() => setShowClassModal(true)}
                                >
                                    <Text style={AttendanceStyles.classSelectorText}>
                                        {selectedClass || 'Select a class'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity
                            style={[AttendanceStyles.button, AttendanceStyles.submitButton]}
                            onPress={loadStats}
                        >
                            <Text style={AttendanceStyles.submitButtonText}>Load Statistics</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Statistics View */}
                    {isLoading ? (
                        <View style={AttendanceStyles.loadingContainer}>
                            <ActivityIndicator size="large" color="#004a99" />
                            <Text style={AttendanceStyles.loadingText}>Loading statistics...</Text>
                        </View>
                    ) : stats.length > 0 ? (
                        statType === 'class'
                            ? renderClassWiseStats()
                            : statType === 'month'
                                ? renderMonthWiseStats()
                                : renderStudentWiseStats()
                    ) : (
                        <View style={AttendanceStyles.emptyStateContainer}>
                            <Text style={AttendanceStyles.emptyStateText}>
                                Select filters and click "Load Statistics" to view attendance data
                            </Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[AttendanceStyles.button, AttendanceStyles.cancelButton, { margin: 16 }]}
                        onPress={() => onNavigate('HOME')}
                    >
                        <Text style={AttendanceStyles.cancelButtonText}>Back</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Class Modal */}
            <Modal
                transparent
                animationType="slide"
                visible={showClassModal}
                onRequestClose={() => setShowClassModal(false)}
            >
                <View style={AttendanceStyles.modalOverlay}>
                    <View style={AttendanceStyles.modalContent}>
                        <View style={AttendanceStyles.modalHeader}>
                            <Text style={AttendanceStyles.modalTitle}>Select Class</Text>
                            <TouchableOpacity
                                style={AttendanceStyles.closeButton}
                                onPress={() => setShowClassModal(false)}
                            >
                                <Text style={{ fontSize: 24, color: '#999' }}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={classes}
                            renderItem={renderClassItem}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                            style={{ maxHeight: 400 }}
                        />
                    </View>
                </View>
            </Modal>

            {/* Month Modal */}
            <Modal
                transparent
                animationType="slide"
                visible={showMonthModal}
                onRequestClose={() => setShowMonthModal(false)}
            >
                <View style={AttendanceStyles.modalOverlay}>
                    <View style={AttendanceStyles.modalContent}>
                        <View style={AttendanceStyles.modalHeader}>
                            <Text style={AttendanceStyles.modalTitle}>Select Month</Text>
                            <TouchableOpacity
                                style={AttendanceStyles.closeButton}
                                onPress={() => setShowMonthModal(false)}
                            >
                                <Text style={{ fontSize: 24, color: '#999' }}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={Array.from({ length: 12 }, (_, i) => i + 1)}
                            renderItem={({ item }) => renderMonthItem({ item })}
                            keyExtractor={(item) => item.toString()}
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                            style={{ maxHeight: 400 }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
