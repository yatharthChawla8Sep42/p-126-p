import React from "react"
import {Button,Image,View,Platform} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import { StyleSheet, Text } from "react-native";

export default class ExpoCamera extends React.Component{
    state={
        image: null,
    }
    getPermission = async()=>{
        if(Platform.OS !== "web"){
            const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
            if(status !== "granted"){
                alert("Grant permission or exit the app.")
            }
            if(Platform.OS == "windows"){
                const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
                if(status !== "granted"){
                    alert("Grant permission or exit the app.")
                }
        }
    }

    }
    componentDidMount(){
        this.getPermission()
    }
    _pickImage = async()=>{
        try{
        //launching camera library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect: [4,3],
            quality: 1
        })
        if(!result.cancelled){
            this.setState({
                image: result.data
            })
            console.log(result.uri)
        }
    }catch(e){
        console.log(e)
    }
}
uploadImage= async(uri)=>{
    //inside form data, we are storing the image
    const data = new FormData()
    let fileName = uri.split("/")[uri.split("/").length-1]
    console.log(fileName)
    let type = `image/${uri.split(".") [uri.split(".").length-1]}`
    const filetoupload= {uri:uri, name: fileName, type: type}
    data.append("digit", filetoupload)
    fetch ( "httos://f292a3137990.ngrok.i0/predict-digit", {method: "POST", body:data, header: {"content-type": "multipart/form-data"} })
    .then(
        (response)=>response.json()
    )
    .then(
        (result)=> {
          console.log("SUCCESS", result)
        }
    ).catch((err)=>{
        console.log(err)
    })
}
    render(){
        let image= this.state.image
        return(
            <View>
                <Button 
                title="Select a file."
                onPress={this._pickImage}
                style= {styles.button}
                >
                
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    button: {
      width: 200,
      marginTop: 20,
      backgroundColor: "green",
      padding: 15,
      borderRadius: 50,
    },
    btnText: {
      color: "white",
      fontSize: 20,
      justifyContent: "center",
      textAlign: "center",
    },
  });