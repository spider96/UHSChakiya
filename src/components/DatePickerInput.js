import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar } from 'lucide-react-native';
import AddStudentStyles from '../style/AddStudentStyles'; // Reuse your existing styles

const DatePickerInput = ({
    label,
    value,
    onChange,
    error,
    placeholder = "Select Date",
    maximumDate = new Date()
}) => {
    const [isPickerVisible, setPickerVisibility] = useState(false);

    const handleConfirm = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        // const formattedDate = `${day}/${month}/${year}`;
        const formattedDate = `${year}-${month}-${day}`;

        onChange(formattedDate);
        setPickerVisibility(false);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => setPickerVisibility(true)}
                activeOpacity={0.7}
                style={[
                    AddStudentStyles.input,
                    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                    error && AddStudentStyles.inputError
                ]}
            >
                <Text style={{ color: value ? '#333' : '#999', fontSize: 14 }}>
                    {value || placeholder}
                </Text>
                <Calendar size={16} color="#2196F3" />
            </TouchableOpacity>

            {error && (
                <Text style={AddStudentStyles.errorText}>{error}</Text>
            )}

            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setPickerVisibility(false)}
                maximumDate={maximumDate}
            />
        </View>
    );
};

export default DatePickerInput;