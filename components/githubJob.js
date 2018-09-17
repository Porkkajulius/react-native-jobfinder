import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, TextInput, FlatList} from 'react-native';
import styles from './style'
class GithubJob extends Component {

        constructor(props) {
            super(props);
            this.state = {         
                jobList: [],
                skill: '',
                location: '',
            };
        }

        getJobs= () =>{
            const url = 'https://jobs.github.com/positions.json?description='
            +this.state.skill+'&location='+ this.state.location;
            fetch(url)
            .then((response) => response.json())
            .then((responseJson) =>  { 
                this.setState({
                    jobList: responseJson
                });
                
            }).catch((error) => { 
                    Alert.alert(error); 
            }); 
        }


        listSeparator = () => {
            return (
              <View
                style={styles.listSeparator}
              />
            );
          };
    

        render() {

            return (

            <View>
                <Text style={styles.text1}>Skill/keyword</Text>
                <TextInput style={styles.textInput}
                onChangeText={(skill) => this.setState({skill})}value={this.state.skill}/>

                <Text style={styles.text1}>Location</Text>
                <TextInput style={styles.textInput}
                onChangeText={(location) => this.setState({location})}value={this.state.location}/>

                <Button onPress={this.getJobs} onChangeText={this.inputChanged} title="Search"/>
                
                <FlatList style={{marginLeft : "5%"}}
                    keyExtractor={item => item.id} 
                    renderItem={({item}) => 
                    <Text style={{fontSize: 18}}>{item.title}, {item.company}</Text>} 
                    data={this.state.jobList} 
                    ItemSeparatorComponent={this.listSeparator} /> 
            </View>
            
            );
        }

    }

export default GithubJob;