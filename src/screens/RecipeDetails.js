import { View, Text, ScrollView, StatusBar, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, ClockIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { FireIcon, HeartIcon } from 'react-native-heroicons/solid';
import Loading from '../components/Loading';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';

const RecipeDetails = (props) => {
  const item = props.route.params;

  const [isFavourite, setIsFavourite] = useState(false);

  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const getRecipeDetail = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRecipeDetail(item && item.idMeal);
  }, [])

  const getIngredients = (meal) => {
    if (!meal) return [];
    
    let indexes = [];

    for (let i=1; i<=20; i++) {
      if ( meal['strIngredient'+i] && meal['strIngredient'+i] !== "") {
        indexes.push(i);
      }
    }

    return indexes;
  }

  const getVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  return (
    <ScrollView className='bg-white flex-1' >
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor='white'
        // translucent={true}
        animated={true}
      />
      <View className='flex-row justify-center pt-5 relative'>
        <Animated.Image source={{ uri: item.strMealThumb }} style={{ width: wp(95), height: hp(50), borderRadius: 40, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} sharedTransitionTag={item.strMeal} />

        <Animated.View entering={FadeIn.delay(200).duration(800)} className='absolute top-10 w-full bg-transparent flex-row justify-between items-center' >
          <Pressable onPress={() => navigation.goBack()} className='rounded-full ml-5 p-2 bg-white flex-row justify-center items-center' >
            <ChevronLeftIcon size={hp(3)} strokeWidth={4} color={'#fbbf24'} />
          </Pressable>
          <Pressable onPress={() => setIsFavourite(!isFavourite)} className='rounded-full mr-5 p-2 bg-white flex-row justify-center items-center' >
            <HeartIcon size={hp(3)} strokeWidth={4} color={isFavourite ? 'red' : 'gray'} />
          </Pressable>
        </Animated.View>
      </View>

      {isLoading ? (
        <Loading size="large" className='mt-8' />
      )
        : (
          <View className='px-4 flex justify-between space-y-6 py-7' >
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2' >
              <Text className='text-neutral-700 flex-1' style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.8) }}>
                {meal?.strMeal}
              </Text>
              <Text className='text-neutral-500 flex-1' style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2) }}>
                {meal?.strArea}
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>
              <View className='rounded-full bg-amber-300 p-2'>
                <View className='bg-white rounded-full flex justify-center items-center' style={{height: hp(6), width: hp(6)}}>
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className='flex-col justify-center items-center py-2'>
                  <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold'}} className='text-neutral-700'>
                    30
                  </Text>
                  <Text style={{fontSize: hp(1.3), fontFamily: 'Montserrat-SemiBold'}} className='text-neutral-700'>
                    Min
                  </Text>
                </View>
              </View>
              <View className='rounded-full bg-amber-300 p-2'>
                <View className='bg-white rounded-full flex justify-center items-center' style={{height: hp(6), width: hp(6)}}>
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className='flex-col justify-center items-center py-2'>
                  <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold'}} className='text-neutral-700'>
                    02
                  </Text>
                  <Text style={{fontSize: hp(1.3), fontFamily: 'Montserrat-SemiBold'}} className='text-neutral-700'>
                    Servings
                  </Text>
                </View>
              </View>
              <View className='rounded-full bg-amber-300 p-2'>
                <View className='bg-white rounded-full flex justify-center items-center' style={{height: hp(6), width: hp(6)}}>
                  <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className='flex-col justify-center items-center py-2'>
                  <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold'}} className='text-neutral-700'>
                    350
                  </Text>
                  <Text style={{fontSize: hp(1.3), fontFamily: 'Montserrat-SemiBold'}} className='text-neutral-700'>
                    Calories
                  </Text>
                </View>
              </View>
              <View className='rounded-full bg-amber-300 p-2'>
                <View className='bg-white rounded-full flex justify-center items-center' style={{height: hp(6), width: hp(6)}}>
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'}/>
                </View>
                <View className='flex-col justify-center items-center py-2'>
                  <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold'}} className='text-neutral-700'>
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-4'>
              <Text className='text-neutral-700 flex-1' style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.5) }}>
                Ingredients
              </Text>
              <View className='space-y-2 ml-3'>
                {
                  getIngredients(meal).map(index => {
                    return (
                      <View key={index} className='space-x-4 flex-row items-center'>
                        <View style={{height: hp(1.5), width: hp(1.5)}} className='bg-amber-300 rounded-full' />
                        <View className='flex-row space-x-2'>
                          <Text className='text-neutral-700' style={{fontFamily: 'Montserrat-Bold', fontSize: hp(1.7)}}>
                            {meal['strMeasure'+index]}
                          </Text>
                          <Text className='text-neutral-600' style={{fontFamily: 'Montserrat-Medium', fontSize: hp(1.7)}}>
                            {meal['strIngredient'+index]}
                          </Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='space-y-2'>
              <Text className='text-neutral-700 flex-1' style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.5) }}>
                Instructions
              </Text>
              <Text className='text-neutral-700' style={{fontFamily: 'Montserrat-Medium', fontSize: hp(1.7)}}>
                {
                  meal?.strInstructions
                }
              </Text>
            </Animated.View>

            {
              meal.strYoutube && 
              <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4'>
                <Text className='text-neutral-700 flex-1' style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.5) }}>
                  Recipe Video
                </Text>
                <View>
                  <YoutubeIframe videoId={getVideoId(meal.strYoutube)} height={hp(30)}/>
                </View>
              </Animated.View>
            }
          </View>
        )}

    </ScrollView>
  )
}

export default RecipeDetails;