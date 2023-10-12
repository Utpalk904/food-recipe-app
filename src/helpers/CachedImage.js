import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import Animated from "react-native-reanimated";

export const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            const cachedImageData = await AsyncStorage.getItem(uri);
            try {
                if (cachedImageData) setCachedSource({ uri: cachedImageData });
                else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        }
                    });
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource({ uri: base64Data });
                }
            } catch (error) {
                setCachedSource({ uri });
                console.log('Error caching images : ', error);
            }
        }

        getCachedImage();
    }, []);

    return (
        <Animated.Image source={cachedSource} {...props} />
    );
}