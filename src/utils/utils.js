import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';
import { uploadImage } from '../services/MediaService';

const imagePickerOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1024,
    maxHeight: 1024,
};

/**
 * Opens alert and uploads image
 * @param {Function} onSuccess callback(imageUrl)
 */
export const handleImageUpload = (onSuccess) => {
    Alert.alert(
        'Upload Photo',
        'Choose an option',
        [
            { text: 'Camera', onPress: () => openImagePicker(true, onSuccess) },
            { text: 'Gallery', onPress: () => openImagePicker(false, onSuccess) },
            { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
    );
};

const openImagePicker = async (useCamera, onSuccess) => {
    try {
        const result = useCamera
          ? await pickImage(true)
          : await pickImage(false);
        // const result = useCamera
        //     ? await launchCamera(imagePickerOptions)
        //     : await launchImageLibrary(imagePickerOptions);

        if (result.didCancel) return;

        if (result.errorCode) {
            Alert.alert('Error', result.errorMessage || 'Image picker failed');
            return;
        }

        console.log('Selected Image:', result);
       //  const image = result.assets[0];
        const image = result;

        // 🔥 Upload to backend
        const response = await uploadImage(image);

        if (response?.imageUrl) {
            onSuccess(response.imageUrl);
        } else {
            Alert.alert('Error', 'Image upload failed');
        }

    } catch (err) {
        console.error('Image upload error:', err);
        Alert.alert('Error', 'Something went wrong while uploading image');
    }
};



const pickImage = async (useCamera = false) => {
    try {
        const image = useCamera
            ? await ImagePicker.openCamera({
                width: 800,
                height: 800,
                cropping: true,
                compressImageQuality: 1,
                cropperCircleOverlay: true,
            })
            : await ImagePicker.openPicker({
                width: 800,
                height: 800,
                cropping: true,
                compressImageQuality: 1,
                cropperCircleOverlay: true,
            });

        return {
            uri: image.path,
            type: image.mime,
            //  name: `photo_${Date.now()}.jpg`,
            name: `photo_${Date.now()}.${image.mime.includes('png') ? 'png' : 'jpg'}`
        };
    } catch (error) {
        if (error.code !== 'E_PICKER_CANCELLED') {
            throw error;
        }
        return null;
    }
};
