import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, {useState, useRef} from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import Modal from "react-native-modal";

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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);
  const show2 = () => setModalVisible2(true);
  const hide2 = () => setModalVisible2(false);
  const ModalSwitch = () => {
    hide();
    setTimeout(() => {
      show2();
    }, 400)
  }
  return (
    <View className = "ml-4 mt-5 mr-4">
        <View>
            <Text className = "text-neutral-500 font-medium" style={{fontSize: hp(1.8)}}>{getFormattedDate(new Date())}</Text>
        </View>
        <View className = "mt-5">
          <View className = "flex-row justify-between items-center">
            <Text className = "font-bold" style = {{fontSize: hp(3)}}>Top Stories</Text>
              <Text className = "font-semibold" style = {{color: '#EE6D33', fontSize: hp(2)}} onPress={show2} >See all</Text>
          </View>
          <View className = "mt-4 mr-4 justify-center flex-col">
            <Carousel
                ref={_carousel}
                data={data}
                loop
                autoplay = {true}
                autoplayInterval={5000}
                sliderWidth={wp(93)}
                itemWidth={wp(93)}
                onSnapToItem={(index) => setActiveDotIndex(index)}
                renderItem={({ item }) => {
                  return(
                    <View className = "">
                      <Modal isVisible = {modalVisible} onBackdropPress={hide} backdropOpacity={0.2} style= {{marginLeft: wp(20)}} animationIn={'fadeIn'} animationOut={'fadeOut'}>
                        <View className = "">
                          <View className = "flex self-center justify-center rounded-lg" style = {{backgroundColor: 'white', width: wp(60), height: hp(25)}}>
                            <View className = "self-center" style = {{width: wp(50)}}>
                              <View className = "border-b-2 pb-2 border-neutral-300">
                                <View className = "flex-row items-center justify-between">
                                  <Text className= 'text-lg text-neutral-600 font-semibold'>Save article</Text>
                                  <FontAwesome6 name="bookmark" size={24} color="gray" />
                                </View>
                                <View className = "flex-row items-center justify-between" style = {{marginTop: hp(1.5)}}>
                                  <Text className= 'text-lg text-neutral-600 font-semibold'>Share article</Text>
                                  <FontAwesome6 name="share-nodes" size={24} color="gray" />                                  
                                </View>
                                <View className = "flex-row items-center justify-between" style = {{marginTop: hp(1.5)}}>
                                  <Text className= 'text-lg text-neutral-600 font-semibold'>Copy link</Text>
                                  <FontAwesome6 name="copy" size={24} color="gray" />
                                </View>
                              </View>
                              <View className = "">
                                <View className = "flex-row items-center justify-between" style = {{marginTop: hp(0.5)}}> 
                                  <Text className= 'text-lg text-neutral-600 font-semibold'>Go to {item.link}</Text>
                                  <FontAwesome6 name="arrow-right" size={24} color="gray" />
                                </View>
                                <TouchableOpacity onPress = {ModalSwitch}>          
                                  <View className = "flex-row items-center justify-between" style = {{marginTop: hp(1.5)}}>
                                      <Text className= 'text-lg text-neutral-600 font-semibold'>Send a feedback</Text>
                                      <FontAwesome6 name="paper-plane" size={24} color="gray" />
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </Modal>                  
                      <Image source={item.image} style={{width: wp(92), height: wp(50)}} />
                      <Text className = "text-neutral-500 font-medium mt-4">{item.link}</Text>
                      <Text className = "mt-3 font-medium" style = {{fontSize: hp(2)}}>{item.title}</Text>
                      <View className = 'flex-row items-center justify-between mt-3 mr-2'>
                        <Text className = "text-neutral-500 font-medium">{item.date}</Text>
                        <Entypo name="dots-three-horizontal" size={24} color="gray" onPress={show} />
                      </View>
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
        <Modal isVisible = {modalVisible2} onBackdropPress={hide2} backdropOpacity={0.2} style = {{margin: 0}}  >
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.select({ios: -hp(1), android: hp(5)})} >
          <View className = "bg-white rounded-xl" style= {{width: wp(100), height: hp(30), marginTop: hp(70)}}>
            <View className = "border-b-2 pb-3 border-neutral-200">
              <View className = "mx-5 mt-5 flex-row items-center justify-between">
                <FontAwesome6 name="xmark" size={30} color="black" onPress = {hide2} />
                <Text className = "font-semibold text-lg">Send feedback</Text>
                <FontAwesome6 name="paper-plane" size={24} color="black" />
              </View>
            </View>
            <View className = "mx-5 mt-5" style= {{margin: 'auto'}}>
              <Text className = "font-bold text-sm">Describe the issue</Text>
              <TextInput style = {{borderWidth: 1, height: hp(15), padding: hp(1)}} placeholder='Describe the issue' multiline = {true} textAlignVertical='top'  />
            </View>
            <View className = 'border-b-2 border-neutral-200 mt-5' />
          </View>
          </KeyboardAvoidingView>
        </Modal>
    </View>
    
  )
}