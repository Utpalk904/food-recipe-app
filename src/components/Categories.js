import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/CachedImage';

const Categories = ({categories, activeCategory, setActiveCategory}) => {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                className='space-x-4 py-2'
                showsHorizontalScrollIndicator={false}
            >
                {
                    categories.map((item, index) => (
                        <Pressable
                            onPress={() => setActiveCategory(item.strCategory)}
                            key={index}
                            className='flex items-center space-y-1'
                        >
                            <View className={`rounded-full p-1 ${activeCategory === item.strCategory ? 'bg-amber-400' : 'bg-white'}`}>
                                {/* <Image source={{ uri: item.strCategoryThumb }} className='rounded-full' style={{width: hp(7.2), height: hp(7.2)}} /> */}
                                <CachedImage uri={item.strCategoryThumb} className='rounded-full' style={{width: hp(7.2), height: hp(7.2)}} />
                            </View>
                            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.8)}} className={`${activeCategory === item.strCategory ? 'text-black' : 'text-neutral-600'}`} >
                                {item.strCategory}
                            </Text>
                        </Pressable>
                    ))
                }
            </ScrollView>
        </Animated.View>
    )
}

export default Categories;