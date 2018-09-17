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

       /*  
       ** onClick will launch getJobs 
       ** It will search repositories from github with given 2 parameters "location" and "skill"
       ** jobList gets response from json
       */
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

        // this function use styling from style.js file to make FlatList printing more prettier
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

                {/* Input field text is placed to: this.state.skill*/}
                <Text style={styles.text1}>Skill/keyword</Text>
                <TextInput style={styles.textInput}
                onChangeText={(skill) => this.setState({skill})}value={this.state.skill}/>

                {/* Input field text is placed to: this.state.location*/}
                <Text style={styles.text1}>Location</Text>
                <TextInput style={styles.textInput}
                onChangeText={(location) => this.setState({location})}value={this.state.location}/>

                {/* uses this.getJobs function*/}
                <Button onPress={this.getJobs} title="Search"/>
                
                {/* FlatList contains value fetched from githubApi*/}
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