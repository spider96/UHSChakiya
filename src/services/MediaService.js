import apiClient from '../api/apiClient';


export async function uploadImage(image) {
  const formData = new FormData();

  formData.append('file', {
    uri: image.uri,
    type: image.type || 'image/jpeg',
    name: image.fileName || `image_${Date.now()}.jpg`,
  });

  const response = await apiClient.post(
    '/upload/image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: () => formData, // VERY IMPORTANT for RN
    }
  );

  return response.data;
}

export async function getImage(imageUrl) {
  const response = await apiClient.get(`upload/signed-url/${imageUrl}`);
  return response.data.url;
}