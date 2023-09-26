import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import Food from '../../assets/welcome.png';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const amber500 = '#F59E0B';

  const navigation = useNavigation();

  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 100);
    setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(5.5)), 300);

    setTimeout(() => navigation.navigate('Home'), 3000);
  },[]);

  return (
    <View className="bg-amber-500 flex h-full justify-center items-center">
      <StatusBar
        hidden={true}
        animated={true}
      />
      <Animated.View className='bg-white/20 rounded-full' style={{padding: ring2Padding}}>
        <Animated.View className='bg-white/20 rounded-full' style={{padding: ring1Padding}}>
            <Image source={Food} className='justify-center flex items-center' style={{width: wp(50), height: hp(25)}} />
        </Animated.View>
      </Animated.View>

      <View className='mt-6'>
        <Text className='text-center tracking-wide text-white' style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(5.3)}} >
            RecipeMix
        </Text>
        <Text className='text-center text-white mt-1' style={{fontFamily: 'Montserrat-Medium', fontSize: hp(2.4)}} >
            Discover, Cook, Savor – RecipeMix
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
