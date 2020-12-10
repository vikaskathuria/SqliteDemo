import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, FlatList, Dimensions, ActivityIndicator, TextInput, Keyboard, ImageBackground, TouchableOpacity, Image } from 'react-native'
const { width, height } = Dimensions.get("window");

export const MinMargin = width / 40;
export const Margin = width / 20;
export default class HomeScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imgData: [],
            loading: false,
            load: 6,
            AllData: []
        }
    }
    componentDidMount() {
        this.getImageData()
    }
    getImageData() {
        this.setState({ loading: true })
        let url = 'https://jsonplaceholder.typicode.com/photos'
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                console.log('-------', res);
                this.setState({ loading: false })

                if (res && res != "") {
                    let arr = []
                    res.map((item, index) => {
                        if (index < this.state.load) {
                            arr.push(item)
                        }
                    })
                    this.setState({ AllData: res, imgData: arr })
                }
            })
            .catch((error) => {
                console.log("ERROR ", error)
                this.setState({ loading: false })

            })

    }


    renderFooter = () => {
        return (
            <View
                style={{ height: height / 15, width: width, borderTopWidth: 1 }}>
                <TouchableOpacity onPress={() => this.handleLoadMore()}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: height / 45 }}>Load More</Text></TouchableOpacity>
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        const { imgData, load } = this.state

        return (
            <View
                style={{ backgroundColor: "#fff", paddingVertical: Margin, width: width / 2, paddingLeft: index % 2 == 0 ? MinMargin / 2 : MinMargin }}>
                <Image
                    source={{ uri: item.url, cache: 'force-cache' }} style={{ width: (width - (MinMargin * 3)) / 2, height: (width - (MinMargin * 3)) / 1.5, }} resizeMode="cover"
                />

            </View>
        )
    }
    handleLoadMore = () => {
        const { AllData, load } = this.state
        this.setState({ loading: true })
        let arr = []
        let add = load + 6
        this.setState({ load: add })
        AllData.map((item, index) => {
            if (index < add) {
                arr.push(item)
            }
        })
        this.setState({ imgData: arr })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 400);
    }
    render() {
        const { AllData, imgData, load, loading } = this.state
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={"orange"} />
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 9, }}>
                    {imgData.length > 0 ?
                        <FlatList
                            keyboardShouldPersistTaps='handled'
                            data={imgData}
                            renderItem={this.renderItem}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={() => this.renderFooter()}
                            keyExtractor={(item, index) => index.toString()}
                        /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No Data Found</Text></View>
                    }

                </View>
            </View>
        )
    }
}
