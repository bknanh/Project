import React, { Component,useState  } from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView,useWindowDimensions, AsyncStorage, RefreshControl   } from "react-native";
import { AntDesign,Feather,MaterialIcons  ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SearchBar } from 'react-native-elements';
import styles from '../Style/ListTicketStyle';
import axios from "axios";
//giao diện vé đã thanh toán
function ItemPayScreen() {
    return (
        <View style={styles.item}>
        <View style={styles.itemimage}>
            <View style={{flex:6, marginTop:2}}>
                <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#33CC66'}}>Đã thanh toán</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={{position:'absolute', right:15, fontSize:20}}>10$</Text>
            </View>
        </View>
        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.namecar}>Bãi đỗ xe Duy Tân</Text>
            </View>

            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:8}}  />
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>14:30</Text>
                </View>
                <View style={{flex:1}}>
                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                </View>
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>16:30</Text>
                </View>
            </View>
        </View>
    </View>
    );
  }
//   giao diện vé chưa thanh toán
  function ItemNoPayScreen() {

    return (
        <View style={styles.item}>
        <View style={styles.itemimage}>
            <View style={{flex:6, marginTop:2}}>
                <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#FFCC66'}}>Chưa thanh toán</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={{position:'absolute', right:15, fontSize:20}}>$</Text>
            </View>
        </View>
        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
            </View>

            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:8}}  />
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>14:30</Text>
                </View>
                <View style={{flex:1}}>
                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                </View>
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>16:30</Text>
                </View>
            </View>
        </View>
    </View>
    );
  }

  function PayScreen() {
    // state = {
    //     search: '',
    //   };

    //   updateSearch = (search) => {
    //     this.setState({ search });
    //   };
    // giao diện trang đã thanh toán
    let data = new Array();
    const [user, setUser] = React.useState('');
    const [list, setList] = useState(new Array);
    const [refreshPage, setRefreshPage] = useState(true);
    React.useEffect( () => {
         getTicketPay();
         getUser();
    }, []);
    const refresh = () =>{
        setRefreshPage(true);
        getTicketPay();
    }
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const getTicketPay = async () => {
        await axios
        .get('https://project3na.herokuapp.com/api/customer/transaction/2')
        .then(async function (response) {
            var trans = response.data.data;
            setRefreshPage(false);
            data = new Array();

            trans.forEach((element,index) => {
                data.push(
                        <View key={index} style={styles.item}>
                        <View style={styles.itemimage}>
                            <View style={{flex:6, marginTop:2}}>
                                <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#33CC66'}}>Đã thanh toán</Text>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                              { element.priceticket!=null && <Text style={{position:'absolute', right:15, fontSize:20}}>{element.priceticket}</Text>}
                            </View>
                        </View>
                        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={styles.namecar}>Bãi đỗ xe {element.parkingname}</Text>
                            </View>

                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                                <Text style={styles.textcar}>{element.addressparking}</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:8}}  />
                                <View style={{flex:1}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>{element.Timein}</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>{element.Timeout}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            });
            setList(data);
        })
        .catch(function (error) {
                alert(error);
        })
        .finally(function () {
        });
    }
    return (
        <View style={styles.profile}>
            <View style={styles.find}>
                <SearchBar
                    round
                    placeholder="Tìm kiếm..."

                />
            </View>

            <ScrollView style={{height:height-150, borderBottomColor:"#CCCCCC"}} refreshControl={
                <RefreshControl
                  refreshing={refreshPage}
                  onRefresh={()=>refresh()}
                />}>
                {list}
            </ScrollView>
        </View>
    );
  }
  //tham khảo thanh tìm kiếm
//   https://snack.expo.io/embedded/@aboutreact/example-of-search-bar-in-react-native?iframeId=2k48h7eupo&preview=true&platform=ios&theme=dark
  function NoPayScreen() {
    //   giao diện trang chưa thanh toán
    const [visible, setVisible] = React.useState(false);
    const showModal = (element) => {
        setVisible(true);
        setticketcurrent(element);
    }
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    let data = new Array();
    const [user, setUser] = React.useState('');
    const [ticketcurrent, setticketcurrent] = React.useState({});
    const [list, setList] = useState(new Array);
    const [refreshPage, setRefreshPage] = useState(true);
    React.useEffect( () => {
         getTicketPay();
         getUser();
    }, []);
    const refresh = () =>{
        setRefreshPage(true);
        getTicketPay();
    }
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const getTicketPay = async () => {
        await axios
        .get('https://project3na.herokuapp.com/api/customer/transaction/2')
        .then(async function (response) {
            var trans = response.data.data;
            setRefreshPage(false);
            data = new Array();

            trans.forEach((element,index) => {
                data.push(
                    <TouchableWithoutFeedback
                    onPress={() =>showModal(element)}
                >
                        <View key={index} style={styles.item}>
                        <View style={styles.itemimage}>
                            <View style={{flex:6, marginTop:2}}>
                                <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#33CC66'}}>Đã thanh toán</Text>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                              { element.priceticket!=null && <Text style={{position:'absolute', right:15, fontSize:20}}>{element.priceticket}</Text>}
                            </View>
                        </View>
                        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={styles.namecar}>Bãi đỗ xe {element.parkingname}</Text>
                            </View>

                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                                <Text style={styles.textcar}>{element.addressparking}</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:8}}  />
                                <View style={{flex:1}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>{element.Timein}</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>{element.Timeout}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                );
            });
            setList(data);
        })
        .catch(function (error) {
                alert(error);
        })
        .finally(function () {
        });
    }
    return (
        <View style={styles.profile}>
            <View style={styles.find}>
                <SearchBar
                    round
                    placeholder="Tìm kiếm..."
                />
            </View>
            <Modal
                isVisible={visible} onDismiss={hideModal}
                useNativeDriver
                style={styles.modalContainer}
                backdropColor={"gray"}
                onBackButtonPress={hideModal}
                onBackdropPress={hideModal}
                onSwipeComplete={hideModal}
            >
                <View style={styles.modal}>
                    <View style={{margin:10, flexDirection:'row'}}>
                        <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#FFCC66'}}>Chưa thanh toán</Text>
                        </View>
                        <View style={{position:'absolute', right:10}}>
                            <Feather name="map-pin" size={20} color="#00CCFF" style={{ marginLeft:8}}/>
                        </View>
                    </View>
                    <ScrollView style={{height:height*0.5, borderBottomColor:"#CCCCCC"}}>
                        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={styles.namecar}>Bãi đỗ {ticketcurrent.parkingname}</Text>
                            </View>

                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                                <Text style={styles.textcar}> {ticketcurrent.addressparking}</Text>
                            </View>
                            <View style={{marginTop:10, marginLeft:-15,width:width, alignItems:'center'}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>VÉ GỬI XE</Text>
                            </View>
                            <View style={{marginTop:10, marginLeft:5,width:width}}>
                                <Text style={{marginTop:5}}>Biển số: {ticketcurrent.code}</Text>
                                { ticketcurrent.type=='motobike' && <Text style={{marginTop:5}}>Loại xe: xe máy</Text> }
                                { ticketcurrent.type=='car' && <Text style={{marginTop:5}}>Loại xe: ô tô</Text> }
                                { ticketcurrent.type=='bike' && <Text style={{marginTop:5}}>Loại xe: xe đạp</Text> }
                                <Text style={{marginTop:5}}>Màu xe: {ticketcurrent.color}</Text>
                                <Text style={{marginTop:5}}>Mô tả: {ticketcurrent.description}</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:5}}  />
                                <View style={{flex:2}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>Giờ vào</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>14:30</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                                </View>
                                <View style={{flex:2}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>Giờ ra</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>16:30</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <MaterialCommunityIcons name="qrcode-scan" size={20} color="gray" style={{marginRight:10, marginTop:10}} />
                                <Text style={{fontSize:16, fontWeight:'bold',  marginTop:10,fontFamily:'sans-serif-light'}}>Mã QR</Text>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', marginBottom:20, marginTop:10}}>
                                <Image
                                source={require('../assets/images/QRcode.jpg')}
                                resizeMode="cover"
                                style={styles.image}
                                ></Image>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <ScrollView style={{height:height-150, borderBottomColor:"#CCCCCC"}} refreshControl={
                <RefreshControl
                  refreshing={refreshPage}
                  onRefresh={()=>refresh()}
                />}>
            {list}
            </ScrollView>
        </View>
    );
  }
const Tab = createBottomTabNavigator();


function ListTicket({ navigation: { navigate } }) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Chưa thanh toán' },
        { key: 'second', title: 'Đã thanh toán' },
    ]);
    const renderScene = SceneMap({
        first: NoPayScreen,
        second: PayScreen,
      });
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />

      <View style={{height: height-50}}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: width, height:height-50}}
            />
      </View>

        {/* <View style={{height:50, backgroundColor:"gray"}}></View> */}
    </SafeAreaView>
  );
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default ListTicket;
