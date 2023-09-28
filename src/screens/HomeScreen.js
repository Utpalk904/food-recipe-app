import { View, Text, StatusBar, ScrollView, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Food from '../../assets/welcome.png';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';

const HomeScreen = () => {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');

      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getRecipes = async (category) => {
    try {
      setRecipes([]);
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);

      if (response && response.data) {
        setRecipes(response.data.meals);
      }
    } catch (error) {
      setRecipes([]);
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getRecipes(activeCategory);
  }, [activeCategory])

  return (
    <View className='flex-1 bg-white' >
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor='white'
        // translucent={true}
        animated={true}
      />
      <ScrollView className='pt-3 px-5' showsVerticalScrollIndicator={false}>
        <View className='flex-row items-center mb-3 justify-between'>
          <Image source={Food} style={{ width: hp(7), height: hp(7) }} />
          <BellIcon size={hp(4)} color='gray' />
        </View>
        <View className='mb-5'>
          <Text className='text-neutral-600' style={{ fontSize: hp(2), fontFamily: 'Montserrat-Medium' }}>
            Hello, user!
          </Text>
          <View>
            <Text className='text-neutral-600' style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(3.5) }} >
              Make your own food,
            </Text>
            <Text className='text-neutral-600' style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(3.5) }} >
              Stay at <Text className='text-amber-400'>home</Text>
            </Text>
          </View>
        </View>
        <View className='bg-black/5 p-1 flex-row rounded-full items-center justify-between mb-5'>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor='gray'
            className='pl-4 flex-1 text-base tracking-wider'
            style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(2) }}
          />
          <View className='bg-white rounded-full p-3'>
            <MagnifyingGlassIcon size={hp(2.6)} strokeWidth={3} color='gray' />
          </View>
        </View>
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
        </View>
        <View className='mt-5 mb-20'>
          <Recipes recipes={recipes} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen;