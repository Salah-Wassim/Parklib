import React, { useEffect, useState } from "react";
import {StyleSheet,FlatList} from 'react-native';
import { Flex,ActivityIndicator } from "@react-native-material/core";
import {getParkingSearchedText } from '../api/api'
import ParkingItem from "../components/parkingItem";
import MapCard from "../components/mapCard";

const Map = ({route}) => {
    const {text} = route.params;
    const [parkings, setParkings ] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if(text.length > 0){
            getParkingSearchedText(text).then(data => {
                setLoading(false);
                data.features.map(_feature => {
                    const feature =   {
                        geometry : {
                            coordinates : _feature.geometry.coordinates
                        },
                        properties : {
                            gid : _feature.properties.gid,
                            nom : _feature.properties.nom,
                            libres : _feature.properties.libres,
                            total : _feature.properties.total,
                            etat : _feature.properties.etat,
                            url : _feature.properties.url,
                            adresse : _feature.properties.adresse,
                            infor : _feature.properties.infor,
                            secteur : _feature.properties.secteur,
                            ta_type : _feature.properties.ta_type,
                        }
                    }
                    setParkings(parkings =>[...parkings,feature]);
                })
            })
        }
    }, [])
        
    const FeatureList = () =>{
        return (
            <FlatList
                data={parkings}
                keyExtractor={({ properties }) => properties.gid.toString()}
                renderItem={({ item }) => <ParkingItem item={item}/>}
            />
        )
    }


    return(
        <Flex fill style={styles.page}>
            {/*<Text style={styles.header}>R??sultat de votre recherche : {parkings.length} {parkings.length>1?  'Elements trouv??s':'Element trouv??' } </--Text>
            */}
            {isLoading ? <ActivityIndicator size="large"/> : <MapCard datas={parkings}/>}
        </Flex>
    ) 
    
   
}

const styles = StyleSheet.create({
    header:{
        padding:5
    },
    page:{
    }
})

export default Map;