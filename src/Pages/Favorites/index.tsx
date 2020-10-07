import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsynStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../conponents/PageHeader';

import styles from './styles';
import TeacherItem, { Teacher } from '../../conponents/TeacherItem';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    function loadFavorites() {
        AsynStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);

                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return (        
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited                      
                        />)
                })}
            </ScrollView>
        </View>
    );
}


export default Favorites;