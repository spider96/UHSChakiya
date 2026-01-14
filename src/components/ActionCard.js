
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Plus, Users, ClipboardList, BookOpen } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2; // Adjusts to fit 2 columns perfectly

const ActionCard = ({ title, icon: IconComponent, color, onPress }) => (
    <TouchableOpacity
        style={actionCardStyles.card}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={[actionCardStyles.iconContainer, { backgroundColor: color + '15' }]}>
            <IconComponent size={32} color={color} />
        </View>
        <Text style={actionCardStyles.cardTitle}>{title}</Text>
    </TouchableOpacity>
);


const actionCardStyles = StyleSheet.create({

    card: {
        width: CARD_SIZE,
        height: CARD_SIZE,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // Shadow for Android
        elevation: 4,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
    },

});

export default ActionCard;