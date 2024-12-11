import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { TextInput, Button, Checkbox, Switch } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const UserDataScreen = ({ navigation }) => {
    const [currentStage, setCurrentStage] = useState(1);
    const [formData, setFormData] = useState({
        lifestyle: {
            userName: '',
            gender: '',
            maritalStatus: '',
            exerciseFrequency: '',
            dietType: '',
            dominantHand:'',
            dominantFoot: '',
            alcoholConsumption: false,
            smokingStatus: false,
            sleepHours: '',
            selfEsteemLevel:'',
            screenTime: '',
            notes:'',
            // workHoursPerDay: '',
            // hobbies: '',
            // pets: '',
            // nationality: '',
            // languagesSpoken: '',
            // occupation: '',
            // emergencyContact: '',
         },
         medicalHistory: {
             diseases: [],
             chronicDiseases:[],
             allergies: [],
             surgeries: [],
             bloodType:'',
             genotype:'',
             //injuries: '',
             medications: [],
             precautions:[],
             familyHistory: [],
             vaccinations: [],
             //visionProblems: '',
         },
         physicalAttributes: {
            height: '',
            weight: '',
            // bmi: '',
            // bodyType: '',
            // skinTone: '',
            // eyeColor: '', 
         },
        reviewAndSubmit: { /* No input fields, just summary */ },
    });

    const handleNext = () => setCurrentStage((prev) => prev + 1);
    const handleBack = () => setCurrentStage((prev) => prev - 1);
    const handleSkip = () => setCurrentStage((prev) => prev + 1);

    const handleSubmit = () => {
        Alert.alert('Submission Successful', 'Your details have been submitted!');
        navigation.navigate('HomeScreen'); // Adjust navigation as needed
    };

    const handleInputChange = (stage, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [stage]: {
                ...prev[stage],
                [field]: value,
            },
        }));
    };

    const renderStage = () => {
        switch (currentStage) {
            case 1: // Lifestyle
               return (
                   <View style={styles.stageContainer}>
                       <Text style={styles.stageHeader}>Lifestyle and Personal Information</Text>

                       <TextInput
                           label="username "
                           value={formData.lifestyle.userName}
                           onChangeText={(text) =>
                               handleInputChange('lifestyle', 'middleName', text)
                           }
                           style={styles.input}
                       />

                       <Picker
                           selectedValue={formData.lifestyle.gender}
                           onValueChange={(value) =>
                               handleInputChange('lifestyle', 'gender', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Select Gender" value="" />
                           <Picker.Item label="Male" value="Male" />
                           <Picker.Item label="Female" value="Female" />
                       </Picker>

                       <Picker
                           selectedValue={formData.lifestyle.maritalStatus}
                           onValueChange={(value) =>
                               handleInputChange('lifestyle', 'maritalStatus', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Select Marital Status" value="" />
                           <Picker.Item label="Single" value="Single" />
                           <Picker.Item label="Married" value="Married" />
                           <Picker.Item label="Divorced" value="Divorced" />
                           <Picker.Item label="Widowed" value="Widowed" />
                       </Picker>

                       <Picker
                           selectedValue={formData.lifestyle.exerciseFrequency}
                           onValueChange={(value) => handleInputChange('lifestyle', 'exerciseFrequency', value)}
                           style={styles.picker}
                       >
                           <Picker.Item label="Select Exercise Frequency" value="" />
                           <Picker.Item label="None" value="None" />
                           <Picker.Item label="Rarely" value="Rarely" />
                           <Picker.Item label="Weekly" value="Weekly" />
                           <Picker.Item label="Daily" value="Daily" />
                       </Picker>

                       <Picker
                           selectedValue={formData.lifestyle.dominantHand}
                           onValueChange={(value) =>
                               handleInputChange('lifestyle', 'dominantHand', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Dominant Hand" value="" />
                           <Picker.Item label="Right" value="Right" />
                           <Picker.Item label="Left" value="Left" />
                           <Picker.Item label="Both" value="Both" />
                           <Picker.Item label="None" value="None" />
                       </Picker>

                       <Picker
                           selectedValue={formData.lifestyle.dominantFoot}
                           onValueChange={(value) =>
                               handleInputChange('lifestyle', 'dominantFoot', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Dominant Foot" value="" />
                           <Picker.Item label="Right" value="Right" />
                           <Picker.Item label="Left" value="Left" />
                           <Picker.Item label="Both" value="Both" />
                           <Picker.Item label="None" value="None" />
                       </Picker>

                       <View style={styles.switchContainer}>
                           <Text>Do you consume alcohol?</Text>
                           <Switch
                               value={formData.lifestyle.alcoholConsumption}
                               onValueChange={(value) =>
                                   handleInputChange('lifestyle', 'alcoholConsumption', value)
                               }
                               color="#2260FF"
                           />
                       </View>

                       <View style={styles.switchContainer}>
                           <Text>Do you smoke?</Text>
                           <Switch
                               value={formData.lifestyle.smokingStatus}
                               onValueChange={(value) =>
                                   handleInputChange('lifestyle', 'smokingStatus', value)
                               }
                               color="#2260FF"
                           />
                       </View>

                       <TextInput
                        label="Daily Sleep Hours"
                        value={formData.lifestyle.sleepHours}
                        onChangeText={(text) => handleInputChange('lifestyle', 'sleepHours', text)}
                        style={styles.input}
                        keyboardType="numeric"
                        >
                       </TextInput>

                       <TextInput
                           label="Daily Screen Time (hours)"
                           value={formData.lifestyle.screenTime}
                           onChangeText={(text) => handleInputChange('lifestyle', 'screenTime', text)}
                           style={styles.input}
                           keyboardType="numeric"
                       />
                        <TextInput
                           label="Diet Type"
                           value={formData.lifestyle.dietType}
                           onChangeText={(text) => handleInputChange('lifestyle', 'dietType', text)}
                           style={styles.input}
                       />
                       
                       {/* <TextInput
                           label="Hobbies (comma-separated)"
                           value={formData.lifestyle.hobbies}
                           onChangeText={(text) =>
                               handleInputChange('lifestyle', 'hobbies', text)
                           }
                           style={styles.input}
                       />


                       <TextInput
                           label="Emergency Contact"
                           value={formData.lifestyle.emergencyContact}
                           onChangeText={(text) =>
                               handleInputChange('lifestyle', 'emergencyContact', text)
                           }
                           style={styles.input}
                           keyboardType="phone-pad"
                       /> */}


                        <Picker
                            selectedValue={formData.lifestyle.selfEsteemLevel}
                            onValueChange={(value) =>
                                handleInputChange('lifestyle', 'selfEsteemLevel', value)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Self-Esteem Level" value="" />
                            <Picker.Item label="Low" value="Low" />
                            <Picker.Item label="Moderate" value="Moderate" />
                            <Picker.Item label="High" value="High" />
                        </Picker>

                       <TextInput
                            label="Notes"
                            value={formData.lifestyle.notes}
                            onChangeText={(text) => 
                                handleInputChange('lifestyle', 'notes', text)
                            }
                            style={styles.input}
                       />
                   </View>
               );

           case 2: // Medical History
               return (
                   <View style={styles.stageContainer}>
                       <Text style={styles.stageHeader}>Medical History</Text>
                       <Text style={styles.summaryText}>How about we ask things like how many livers and kidneys do you have LOL!</Text>

                       <TextInput
                           label="Blood Type"
                           value={formData.medicalHistory.bloodType}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'bloodType', text)
                           }
                           style={styles.input}
                       />

                        <TextInput
                           label="Genotype"
                           value={formData.medicalHistory.genotype}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'genotype', text)
                           }
                           style={styles.input}
                       />

                        <TextInput
                           label="Allergies"
                           value={formData.medicalHistory.allergies}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'allergies', text)
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Diseases (comma-seperated)"
                           value={formData.medicalHistory.diseases.join(', ')}
                           onChangeText={(text) =>
                                handleInputChange('medicalHistory', 'diseases', text.split(','))    
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Chronic Diseases (comma-separated)"
                           value={formData.medicalHistory.chronicDiseases.join(', ')}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'chronicDiseases', text.split(','))
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Family History of Diseases (comma-separated)"
                           value={formData.medicalHistory.familyHistory}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'familyHistory', text)
                           }
                           style={styles.input}
                       />

                       <TextInput
                            label="Surgeries And Surgical History"
                            value={formData.medicalHistory.surgeries}
                            onChangeText={(text) => 
                                handleInputChange('medicalHistory', 'surgeries' , text)
                            }
                            style={styles.input}
                       />

                        <TextInput
                           label="Medications"
                           value={formData.medicalHistory.medications}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'medications', text)
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Precautions"
                           value={formData.medicalHistory.precautions}
                           onChangeText={(text) => 
                                handleInputChange('medicalHistory', 'precautions', text)
                           }
                           style={styles.input}
                        />

                       <TextInput
                           label="Vaccinations (e.g., COVID, Flu)"
                           value={formData.medicalHistory.vaccinations}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'vaccinations', text)
                           }
                           style={styles.input}
                       />

                       {/* <Picker
                           selectedValue={formData.medicalHistory.visionProblems}
                           onValueChange={(value) =>
                               handleInputChange('medicalHistory', 'visionProblems', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Vision Problems" value="" />
                           <Picker.Item label="None" value="None" />
                           <Picker.Item label="Myopia" value="Myopia" />
                           <Picker.Item label="Hyperopia" value="Hyperopia" />
                           <Picker.Item label="Astigmatism" value="Astigmatism" />
                       </Picker>

                       <TextInput
                           label="Details of Recent Injuries"
                           value={formData.medicalHistory.recentInjuries}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'recentInjuries', text)
                           }
                           style={styles.input}
                       /> */}

                   </View>
               );
            case 3: // Physical Attributes
                return (
                    <View style={styles.stageContainer}>
                        <Text style={styles.stageHeader}>Physical Attributes</Text>

                        <TextInput
                            label="Height (cm)"
                            value={formData.physicalAttributes.height}
                            onChangeText={(text) =>
                                handleInputChange('physicalAttributes', 'height', text)
                            }
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        <TextInput
                            label="Weight (kg)"
                            value={formData.physicalAttributes.weight}
                            onChangeText={(text) =>
                                handleInputChange('physicalAttributes', 'weight', text)
                            }
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        {/* <TextInput
                            label="Body Fat Percentage"
                            value={formData.physicalAttributes.bodyFatPercentage}
                            onChangeText={(text) =>
                                handleInputChange('physicalAttributes', 'bodyFatPercentage', text)
                            }
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        <Picker
                            selectedValue={formData.physicalAttributes.bodyType}
                            onValueChange={(value) =>
                                handleInputChange('physicalAttributes', 'bodyType', value)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Body Type" value="" />
                            <Picker.Item label="Ectomorph" value="Ectomorph" />
                            <Picker.Item label="Mesomorph" value="Mesomorph" />
                            <Picker.Item label="Endomorph" value="Endomorph" />
                        </Picker>

                        <TextInput
                            label="Preferred Exercise Time"
                            value={formData.physicalAttributes.preferredExerciseTime}
                            onChangeText={(text) =>
                                handleInputChange('physicalAttributes', 'preferredExerciseTime', text)
                            }
                            style={styles.input}
                        />
                        <TextInput
                            label="Past Injuries"
                            value={formData.physicalAttributes.pastInjuries}
                            onChangeText={(text) =>
                                handleInputChange('physicalAttributes', 'pastInjuries', text)
                            }
                            style={styles.input}
                        /> */}
                    </View>
                );

           case 4: // Review & Submit
                return (
                    <View style={styles.stageContainer}>
                        <Text style={styles.stageHeader}>Review & Submit</Text>

                        <Text style={styles.summaryHeader}>Summary</Text>
                        <View style={styles.summaryContainer}>
                            <Text style={styles.summaryText}>â€¢ Fitness Goal: {formData.lifestyle.dominantFoot} kg</Text>
                            <Text style={styles.summaryText}>â€¢ Preferred Workout: {formData.lifestyle.dominantHand}</Text>
                            <Text style={styles.summaryText}>â€¢ Stress Coping: {formData.lifestyle.smokingStatus}</Text>
                            <Text style={styles.summaryText}>â€¢ Self-Esteem Level: {formData.lifestyle.alcoholConsumption}</Text>
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={[styles.button, styles.submitButton]}
                            labelStyle={styles.buttonText}
                        >
                            Submit
                        </Button>


                        <Text>Your details have been captured successfully!</Text>
                        <Text>Please click "Submit" to finalize the process.</Text>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container}>
            {renderStage()}

            <View style={styles.buttonContainer}>
                {currentStage > 1 && (
                    <Button mode="outlined" onPress={handleBack} style={styles.button} labelStyle={styles.buttonText}>
                        Back
                    </Button>
                )}
                {currentStage < 4 && (
                    <>
                        <Button
                            mode="text"
                            onPress={handleSkip}
                            style={styles.button}
                            labelStyle={styles.buttonText}
                        >
                            Skip
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleNext}
                            style={styles.button}
                            labelStyle={styles.buttonText}
                        >
                            Next
                        </Button>
                    </>
                )}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    stageContainer: {
        marginBottom: 20,
    },
    stageHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2260FF',
        textAlign: 'center',
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#F5F7FA',
    },
    picker: {
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 70,
    },
    button: {
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 8,
        color: '#2260FF',
        backgroundColor: '#2260FF',
    },
    buttonText: {
        color: '#FFF',
    },
    summaryHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2260FF',
        textAlign: 'center',
        marginVertical: 10,
    },
    summaryContainer: {
        backgroundColor: '#F5F7FA',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#34C759',
        marginVertical: 20,
    },
    inputMultiLine: {
        marginBottom: 12,
        backgroundColor: '#F5F7FA',
        textAlignVertical: 'top',
        height: 100,
    },
    
    
});

export default UserDataScreen;
