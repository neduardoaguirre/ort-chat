import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const askForPermission = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
};

/**
 * pickImage
 *
 * This method capture image from camera
 *
 * @returns imageB64 String
 */
export const pickImage = async () => {
  const permission = await askForPermission();
  if (permission === ImagePicker.PermissionStatus.GRANTED) {
    try {
      const imageResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });

      if (imageResult.base64) {
        const imageB64 = `data:image/jpg;base64,${imageResult.base64}`;

        return imageB64;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("pickImage - ERROR: ", error);
      Alert.alert("Error", "Error al capturar su foto, intente nuevamente");
    }
  } else {
    Alert.alert(
      "Error",
      "Para poder actualizar su foto de perfil debe conceder permisos a la camara"
    );
  }
};
