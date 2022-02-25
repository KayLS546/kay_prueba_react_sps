import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers, getUserById} from '../module/action';

function Home(props){

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [idUser, setIdUser] = useState(0);
    const [user, setUser] = useState([]);
    const [isShowUSer, setIsShowUSer] = useState(false);

    /*useEffect(() => {
        props.getUsers();
    }, []);

    useEffect(() => {
        if(isLoading){
            console.log(props.users);
            if(props.users){
                setUsers(props.users);
                setIsLoading(false);
            }
        }
    }, [isLoading]);*/

    useEffect(() => {
        if(isLoading){
            axios.get('https://reqres.in/api/users')
            .then((response) => {
                const data = response.data.data;
                setUsers(data);
                setIsLoading(false);
            }).catch((error) => {
                console.error("Error",error);
            });
        }
    }, [isLoading]);

    useEffect(() => {
        if(isShowUSer){
            axios.get('https://reqres.in/api/users/'+idUser)
            .then((response) => {
                setUser(response.data.data);
                setIsLoading(false);
            }).catch((error) => {
                console.error("Error",error);
            });
        }
    }, [isShowUSer]);

    const getUSerById = function(id) {
        setUsers([]);
        setIsShowUSer(true);
        setIdUser(id);
    };

    const goBack = function() {
        setUser([]);
        setIsShowUSer(false);
        setIsLoading(true);
    };

    return (
        isLoading ? 
        <View style={styles.wrapper}>
            <View style={styles.box}>
                <Text>Cargando...</Text>
                <StatusBar style="auto" />
            </View>
        </View>
        :
        isShowUSer ?
        <View style={styles.wrapper}>
            <View style={styles.box}>
                <Image style={styles.stretch} source={user.avatar} />
                <Text style={styles.space}>{user.first_name}</Text>
                <Text style={styles.space}>{user.last_name}</Text>
                <Text style={styles.space}>{user.email}</Text>
                <TouchableOpacity style={styles.button} onPress={() => { goBack() }}>
                    <Text>Regresar</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
        :
        <View>
            {
                users.map((user, index) => 
                    <View key={index}>
                        <View style={styles.container}>
                            <View style={styles.box_user}>
                                <Image style={styles.stretch} source={user.avatar} />
                                <Text style={styles.space_container}>{user.first_name}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => { getUSerById(user.id) }}>
                                    <Text style={styles.space}>Ver</Text>
                                </TouchableOpacity>
                            </View>        
                        </View>
                    </View>
                )
            }
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        justifyContent:'center',
        alignItems:'center',
        position:'flex',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        paddingTop: 10,
    },
    stretch: {
        width: 100,
        height: 150,
        resizeMode: 'stretch',
    },
    button: {
        width: "20%",
        height: "20%",
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#33cccc",
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#282c34',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
    },
    box: {
        paddingVertical:25,
        paddingHorizontal:35,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(240,250,220,0.5)',
        borderRadius:6
    },
    box_user:{
        paddingVertical:15,
        paddingHorizontal:25,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(240,250,220,0.5)',
        borderRadius:6
    },
    space: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    space_container: {
        paddingLeft: 25,
        paddingRight: 25,
    },
});

 const mapStateToProps = (store) => ({
    users: store.users,
    user: store.user
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getUsers,
            getUserById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Home)