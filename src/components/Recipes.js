import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { CachedImage } from '../helpers/CachedImage';
import { useNavigation } from '@react-navigation/native';

const Recipes = ({ recipes, categories }) => {
    const navigation = useNavigation();
    return (
        <View>
            {categories.length > 0 && <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(3) }} className='text-neutral-600' >Recipes</Text>}
            {categories.length > 0 && recipes.length > 0 ? <View className='mt-4'>
                <MasonryList
                    data={recipes}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    // refreshing={isLoadingNext}
                    // onRefresh={() => refetch({ first: ITEM_CNT })}
                    onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
                />
            </View> : <Loading size="large" className='mt-32' />}
        </View>
    )
}

export default Recipes;


const RecipeCard = ({ item, index, navigation }) => {
    const isEven = index % 2 === 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)} className={`${isEven ? 'pr-2' : 'pl-2'} my-1.5`}>
            <Pressable className='w-full flex' onPress={()=> navigation.navigate('RecipeDetails', {...item})} >
                {/* <Image source={{ uri: item.strMealThumb }} style={{ height: index % 3 === 0 ? hp(23) : hp(33) }} className='w-full rounded-3xl' /> */}
                <CachedImage style={{ height: index % 3 === 0 ? hp(23) : hp(33) }} className='w-full rounded-3xl' uri={item.strMealThumb} />
                <Text className='text-neutral-600 ml-3 mt-1' style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.8) }}>
                    {item.strMeal.length > 18 ? item.strMeal.slice(0, 18) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    )
}