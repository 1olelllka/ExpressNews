import { View, Text, Image } from 'react-native'
import React, {useState, useRef} from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';

function getFormattedDate(date) {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const dayOfMonth = date.getDate();
  
    return `${day}, ${month} ${dayOfMonth}`;
}

const data = [
  {id: 1,
     title: 'Cillum minim sint anim consequat laborum proident Lorem.',
      image: require('../../../assets/news.jpg'), link: 'asasfl;gas.com', date: '3h ago'},
  {id: 2,
     title: 'Incididunt proident irure in fugiat esse quis.',
      image: require('../../../assets/splash.png'), link: 'asgansdvsa.com', date: '3h ago'},
  {id: 3,
     title: 'Occaecat minim officia consequat cupidatat voluptate culpa reprehenderit nisi cillum anim velit.',
      image: require('../../../assets/favicon.png'), link: 'asgadxzvz.com', date: '3h ago'},
]



export default function Body() {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const _carousel = useRef();

  return (
    <View className = "ml-4 mt-5 mr-4">
        <View>
            <Text className = "text-neutral-500 font-medium" style={{fontSize: hp(1.8)}}>{getFormattedDate(new Date())}</Text>
        </View>
        <View className = "mt-5">
          <View className = "flex-row justify-between items-center">
            <Text className = "font-bold" style = {{fontSize: hp(3)}}>Top Stories</Text>
            <Text className = "font-semibold" style = {{color: '#EE6D33', fontSize: hp(2)}}>See all</Text>
          </View>
          <View className = "mt-4 mr-4 justify-center">
            <Carousel
                ref={_carousel}
                data={data}
                loop
                autoplay = {true}
                autoplayInterval={5000}
                sliderWidth={wp(93)}
                itemWidth={wp(93)}
                onSnapToItem={(index) => setActiveDotIndex(index)}
                renderItem={({ item, index }) => {
                  return(
                    <View className = "">
                      <Image source={item.image} style={{width: wp(92), height: wp(50)}} />
                      <Text className = "text-neutral-500 font-medium mt-4">{item.link}</Text>
                      <Text className = "mt-3 font-medium" style = {{fontSize: hp(2)}}>{item.title}</Text>
                      <Text className = "text-neutral-500 font-medium mt-3">{item.date}</Text>
                    </View>
                  )}}
            />
            <View>
              <Pagination 
                carouselRef={_carousel}
                activeDotIndex={activeDotIndex}
                dotsLength={data.length}
                dotStyle = {{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,                  
                  backgroundColor: '#EE6D33'
                }}
                inactiveDotStyle = {{              
                  backgroundColor: 'gray'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
          </View>
        </View>
    </View>
  )
}