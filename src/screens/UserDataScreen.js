import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { TextInput, Button, Checkbox, Switch } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const UserDataScreen = ({ navigation }) => {
    const [currentStage, setCurrentStage] = useState(1);
    const [formData, setFormData] = useState({
        lifestyle: {
            middleName: '',
            gender: '',
            maritalStatus: '',
            exerciseFrequency: '',
            dietType: '',
            alcoholConsumption: false,
            smokingStatus: false,
            caffeineConsumption: false,
            sleepHours: '',
            eatOutFrequency: '',
            stressLevel: '',
            screenTime: '',
            hydrationLevel: '',
            exerciseEnvironment: '',
            transportationMode: '',
            workHoursPerDay: '',
            workType: '',
            socialActivities: '',
            hobbies: '',
            pets: '',
            typicalDailySteps: '',
            mealTiming: '',
            fastFoodConsumptionFrequency: '',
            nationality: '',
            languagesSpoken: '',
            occupation: '',
            educationLevel: '',
            contactPreference: '',
            emergencyContact: '',
            emergencyContactRelationship: '',
         },
         medicalHistory: {
             chronicDiseases: [],
             allergies: '',
             surgeries: '',
             injuries: '',
             medications: '',
             familyHistory: '',
             vaccinations: '',
             recentHospitalVisits: '',
             surgeriesDetails: '',
             familyHistoryDiseases: '',
             mentalHealthHistory: '',
             pastTrauma: '',
             visionProblems: '',
             hearingProblems: '',
             dentalIssues: '',
             recentInjuries: '',
             previousPregnancies: '',
         },
         symptoms: {
             symptoms: [],
             otherSymptoms: '',
             symptomsStartDate: '',
             severity: 0,
             frequency: '',
             triggers: '',
             symptomLocation: '',
             symptomDuration: '',
             aggravatingFactors: '',
             relievingFactors: '',
             additionalSymptoms: '',
             symptomOccurrenceTime: '',
             recentHealthCheckups: '',
             painScale: '',
             symptomSeverityExplanation: '',
             currentMedicationsForSymptoms: '',
             
         },
         physicalAttributes: {
            height: '',
            weight: '',
            bmi: '',
            bodyFatPercentage: '',
            chest: '',
            waist: '',
            hip: '',
            bodyType: '',
            skinTone: '',
            hairColor: '',
            eyeColor: '', 
            dominantHand: '',
            preferredExerciseTime: '', 
            pastInjuries: '', 
            restingHeartRate: '',
            bloodPressure: '', 
            bodyTemperature: '',
         },
         fitnessGoals: {
            goalWeight: '',
            preferredWorkoutType: '',
            workoutFrequency: '',
            dietaryPreferences: '',
            targetCalories: '',
            additionalGoals: '',
            trainerNeeded: false,
            gymMember: false,
            flexibilityGoal: '',
            muscleGainTarget: '',
            workoutIntensityPreference: '',
            enduranceImprovement: '',
            fitnessTrackerUsed: false,
            idealWorkoutTime: '',
            outdoorWorkoutPreference: false,
            groupWorkoutInterest: false,
            supplementsUsed: '',
        },
        mentalWellbeing: {
            stressCopingMechanisms: '',
            mentalHealthSupport: '',
            sleepQuality: '',
            anxietySymptoms: false,
            depressionSymptoms: false,
            socialSupport: '',
            meditationPractice: false,
            relaxationTechniques: '',
            recentEmotionalTrauma: '',
            gratitudePractice: false,
            selfEsteemLevel: '',
            hobbiesForRelaxation: '',
            burnoutSymptoms: false,
            sleepDisruptions: '',
            preferredRelaxationActivity: '',
            moodTrackingFrequency: '',
            professionalCounseling: false,
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
                           label="Middle Name"
                           value={formData.lifestyle.middleName}
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

                       <TextInput
                           label="Diet Type"
                           value={formData.lifestyle.dietType}
                           onChangeText={(text) => handleInputChange('lifestyle', 'dietType', text)}
                           style={styles.input}
                       />

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
                           label="Daily Screen Time (hours)"
                           value={formData.lifestyle.screenTime}
                           onChangeText={(text) => handleInputChange('lifestyle', 'screenTime', text)}
                           style={styles.input}
                           keyboardType="numeric"
                       />

                       <TextInput
                           label="Hydration Level (glasses of water)"
                           value={formData.lifestyle.hydrationLevel}
                           onChangeText={(text) => handleInputChange('lifestyle', 'hydrationLevel', text)}
                           style={styles.input}
                           keyboardType="numeric"
                       />

                       <TextInput
                           label="Exercise Environment (e.g., home, gym)"
                           value={formData.lifestyle.exerciseEnvironment}
                           onChangeText={(text) =>
                               handleInputChange('lifestyle', 'exerciseEnvironment', text)
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Average Daily Steps"
                           value={formData.lifestyle.typicalDailySteps}
                           onChangeText={(text) =>
                               handleInputChange('lifestyle', 'typicalDailySteps', text)
                           }
                           style={styles.input}
                           keyboardType="numeric"
                       />

                       <Picker
                           selectedValue={formData.lifestyle.transportationMode}
                           onValueChange={(value) =>
                               handleInputChange('lifestyle', 'transportationMode', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Mode of Transportation" value="" />
                           <Picker.Item label="Walking" value="Walking" />
                           <Picker.Item label="Driving" value="Driving" />
                           <Picker.Item label="Cycling" value="Cycling" />
                           <Picker.Item label="Public Transport" value="Public Transport" />
                       </Picker>

                       <Picker
                           selectedValue={formData.lifestyle.fastFoodConsumptionFrequency}
                           onValueChange={(value) =>
                               handleInputChange('lifestyle', 'fastFoodConsumptionFrequency', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Fast Food Frequency" value="" />
                           <Picker.Item label="Never" value="Never" />
                           <Picker.Item label="Occasionally" value="Occasionally" />
                           <Picker.Item label="Weekly" value="Weekly" />
                           <Picker.Item label="Daily" value="Daily" />
                       </Picker>

                       <TextInput
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
                       />

                       <TextInput
                           label="Relationship with Emergency Contact"
                           value={formData.lifestyle.emergencyContactRelationship}
                           onChangeText={(text) =>
                               handleInputChange('lifestyle', 'emergencyContactRelationship', text)
                           }
                           style={styles.input}
                       />
                   </View>
               );

           case 2: // Medical History
               return (
                   <View style={styles.stageContainer}>
                       <Text style={styles.stageHeader}>Medical History</Text>

                       <TextInput
                           label="Chronic Diseases (comma-separated)"
                           value={formData.medicalHistory.chronicDiseases.join(', ')}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'chronicDiseases', text.split(','))
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
                           label="Medications"
                           value={formData.medicalHistory.medications}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'medications', text)
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

                       <TextInput
                           label="Details of Recent Surgeries"
                           value={formData.medicalHistory.surgeriesDetails}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'surgeriesDetails', text)
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Family History of Diseases (comma-separated)"
                           value={formData.medicalHistory.familyHistoryDiseases}
                           onChangeText={(text) =>
                               handleInputChange('medicalHistory', 'familyHistoryDiseases', text)
                           }
                           style={styles.input}
                       />

                       <Picker
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
                       />

                   </View>
               );

           case 3: // Symptoms
               return (
                   <View style={styles.stageContainer}>
                       <Text style={styles.stageHeader}>Symptoms</Text>

                       <Checkbox.Item
                           label="Fever"
                           status={formData.symptoms.symptoms.includes('Fever') ? 'checked' : 'unchecked'}
                           onPress={() =>
                               handleInputChange('symptoms', 'symptoms', [
                                   ...formData.symptoms.symptoms,
                                   'Fever',
                               ])
                           }
                           color="#2260FF"
                       />

                       <TextInput
                           label="Triggers (e.g., cold, stress)"
                           value={formData.symptoms.triggers}
                           onChangeText={(text) => handleInputChange('symptoms', 'triggers', text)}
                           style={styles.input}
                       />

                       <TextInput
                           label="Symptom Frequency (e.g., daily, weekly)"
                           value={formData.symptoms.frequency}
                           onChangeText={(text) => handleInputChange('symptoms', 'frequency', text)}
                           style={styles.input}
                       />

                       <TextInput
                           label="Location of Symptom (e.g., head, chest)"
                           value={formData.symptoms.symptomLocation}
                           onChangeText={(text) =>
                               handleInputChange('symptoms', 'symptomLocation', text)
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Duration of Symptom (e.g., 2 weeks)"
                           value={formData.symptoms.symptomDuration}
                           onChangeText={(text) =>
                               handleInputChange('symptoms', 'symptomDuration', text)
                           }
                           style={styles.input}
                       />

                       <Picker
                           selectedValue={formData.symptoms.painScale}
                           onValueChange={(value) =>
                               handleInputChange('symptoms', 'painScale', value)
                           }
                           style={styles.picker}
                       >
                           <Picker.Item label="Pain Scale (0-10)" value="" />
                           {[...Array(11).keys()].map((num) => (
                               <Picker.Item key={num} label={String(num)} value={String(num)} />
                           ))}
                       </Picker>

                       <TextInput
                           label="Aggravating Factors"
                           value={formData.symptoms.aggravatingFactors}
                           onChangeText={(text) =>
                               handleInputChange('symptoms', 'aggravatingFactors', text)
                           }
                           style={styles.input}
                       />

                       <TextInput
                           label="Current Medications for Symptoms"
                           value={formData.symptoms.currentMedicationsForSymptoms}
                           onChangeText={(text) =>
                               handleInputChange('symptoms', 'currentMedicationsForSymptoms', text)
                           }
                           style={styles.input}
                       />

                   </View>
               );
               case 4: // Physical Attributes
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
                        <TextInput
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
                            label="Dominant Hand"
                            value={formData.physicalAttributes.dominantHand}
                            onChangeText={(text) =>
                                handleInputChange('physicalAttributes', 'dominantHand', text)
                            }
                            style={styles.input}
                        />
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
                        />
                    </View>
                );

            case 5: // Fitness Goals
                return (
                    <View style={styles.stageContainer}>
                        <Text style={styles.stageHeader}>Fitness Goals</Text>

                        <TextInput
                            label="Goal Weight (kg)"
                            value={formData.fitnessGoals.goalWeight}
                            onChangeText={(text) => handleInputChange('fitnessGoals', 'goalWeight', text)}
                            style={styles.input}
                            keyboardType="numeric"
                        />

                        <Picker
                            selectedValue={formData.fitnessGoals.preferredWorkoutType}
                            onValueChange={(value) => handleInputChange('fitnessGoals', 'preferredWorkoutType', value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Preferred Workout Type" value="" />
                            <Picker.Item label="Cardio" value="Cardio" />
                            <Picker.Item label="Strength" value="Strength" />
                            <Picker.Item label="Flexibility" value="Flexibility" />
                        </Picker>

                        <TextInput
                            label="Workout Frequency (times/week)"
                            value={formData.fitnessGoals.workoutFrequency}
                            onChangeText={(text) =>
                                handleInputChange('fitnessGoals', 'workoutFrequency', text)
                            }
                            style={styles.input}
                            keyboardType="numeric"
                        />

                        <TextInput
                            label="Dietary Preferences"
                            value={formData.fitnessGoals.dietaryPreferences}
                            onChangeText={(text) =>
                                handleInputChange('fitnessGoals', 'dietaryPreferences', text)
                            }
                            style={styles.input}
                        />

                        <View style={styles.switchContainer}>
                            <Text>Do you need a personal trainer?</Text>
                            <Switch
                                value={formData.fitnessGoals.trainerNeeded}
                                onValueChange={(value) =>
                                    handleInputChange('fitnessGoals', 'trainerNeeded', value)
                                }
                                color="#2260FF"
                            />
                        </View>

                        <View style={styles.switchContainer}>
                            <Text>Are you a gym member?</Text>
                            <Switch
                                value={formData.fitnessGoals.gymMember}
                                onValueChange={(value) =>
                                    handleInputChange('fitnessGoals', 'gymMember', value)
                                }
                                color="#2260FF"
                            />
                        </View>
                        <TextInput
                            label="Flexibility Goal (e.g., splits, yoga)"
                            value={formData.fitnessGoals.flexibilityGoal}
                            onChangeText={(text) => handleInputChange('fitnessGoals', 'flexibilityGoal', text)}
                            style={styles.input}
                        />

                        <TextInput
                            label="Muscle Gain Target (kg)"
                            value={formData.fitnessGoals.muscleGainTarget}
                            onChangeText={(text) => handleInputChange('fitnessGoals', 'muscleGainTarget', text)}
                            style={styles.input}
                            keyboardType="numeric"
                        />

                        <Picker
                            selectedValue={formData.fitnessGoals.workoutIntensityPreference}
                            onValueChange={(value) =>
                                handleInputChange('fitnessGoals', 'workoutIntensityPreference', value)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Workout Intensity Preference" value="" />
                            <Picker.Item label="Low" value="Low" />
                            <Picker.Item label="Moderate" value="Moderate" />
                            <Picker.Item label="High" value="High" />
                        </Picker>

                        <View style={styles.switchContainer}>
                            <Text>Do you use a fitness tracker?</Text>
                            <Switch
                                value={formData.fitnessGoals.fitnessTrackerUsed}
                                onValueChange={(value) =>
                                    handleInputChange('fitnessGoals', 'fitnessTrackerUsed', value)
                                }
                                color="#2260FF"
                            />
                        </View>

                        <TextInput
                            label="Ideal Workout Time (e.g., morning, evening)"
                            value={formData.fitnessGoals.idealWorkoutTime}
                            onChangeText={(text) => handleInputChange('fitnessGoals', 'idealWorkoutTime', text)}
                            style={styles.input}
                        />

                        <View style={styles.switchContainer}>
                            <Text>Do you prefer outdoor workouts?</Text>
                            <Switch
                                value={formData.fitnessGoals.outdoorWorkoutPreference}
                                onValueChange={(value) =>
                                    handleInputChange('fitnessGoals', 'outdoorWorkoutPreference', value)
                                }
                                color="#2260FF"
                            />
                        </View>

                        <TextInput
                            label="Supplements Used (comma-separated)"
                            value={formData.fitnessGoals.supplementsUsed}
                            onChangeText={(text) => handleInputChange('fitnessGoals', 'supplementsUsed', text)}
                            style={styles.input}
                        />

                    </View>
                );

            case 6: // Mental Wellbeing
                return (
                    <View style={styles.stageContainer}>
                        <Text style={styles.stageHeader}>Mental Wellbeing</Text>

                        <TextInput
                            label="Stress Coping Mechanisms"
                            value={formData.mentalWellbeing.stressCopingMechanisms}
                            onChangeText={(text) =>
                                handleInputChange('mentalWellbeing', 'stressCopingMechanisms', text)
                            }
                            style={styles.input}
                        />

                        <Picker
                            selectedValue={formData.mentalWellbeing.mentalHealthSupport}
                            onValueChange={(value) =>
                                handleInputChange('mentalWellbeing', 'mentalHealthSupport', value)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Mental Health Support Type" value="" />
                            <Picker.Item label="Therapy" value="Therapy" />
                            <Picker.Item label="Self-help" value="Self-help" />
                            <Picker.Item label="Support Groups" value="Support Groups" />
                        </Picker>

                        <TextInput
                            label="Social Support (close friends/family count)"
                            value={formData.mentalWellbeing.socialSupport}
                            onChangeText={(text) =>
                                handleInputChange('mentalWellbeing', 'socialSupport', text)
                            }
                            style={styles.input}
                            keyboardType="numeric"
                        />

                        <View style={styles.switchContainer}>
                            <Text>Do you meditate?</Text>
                            <Switch
                                value={formData.mentalWellbeing.meditationPractice}
                                onValueChange={(value) =>
                                    handleInputChange('mentalWellbeing', 'meditationPractice', value)
                                }
                                color="#2260FF"
                            />
                        </View>
                        <TextInput
                            label="Relaxation Techniques (e.g., deep breathing)"
                            value={formData.mentalWellbeing.relaxationTechniques}
                            onChangeText={(text) => handleInputChange('mentalWellbeing', 'relaxationTechniques', text)}
                            style={styles.input}
                        />

                        <Picker
                            selectedValue={formData.mentalWellbeing.selfEsteemLevel}
                            onValueChange={(value) =>
                                handleInputChange('mentalWellbeing', 'selfEsteemLevel', value)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Self-Esteem Level" value="" />
                            <Picker.Item label="Low" value="Low" />
                            <Picker.Item label="Moderate" value="Moderate" />
                            <Picker.Item label="High" value="High" />
                        </Picker>

                        <View style={styles.switchContainer}>
                            <Text>Do you experience burnout symptoms?</Text>
                            <Switch
                                value={formData.mentalWellbeing.burnoutSymptoms}
                                onValueChange={(value) =>
                                    handleInputChange('mentalWellbeing', 'burnoutSymptoms', value)
                                }
                                color="#2260FF"
                            />
                        </View>

                        <TextInput
                            label="Preferred Relaxation Activity"
                            value={formData.mentalWellbeing.preferredRelaxationActivity}
                            onChangeText={(text) =>
                                handleInputChange('mentalWellbeing', 'preferredRelaxationActivity', text)
                            }
                            style={styles.input}
                        />

                        <Picker
                            selectedValue={formData.mentalWellbeing.moodTrackingFrequency}
                            onValueChange={(value) =>
                                handleInputChange('mentalWellbeing', 'moodTrackingFrequency', value)
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Mood Tracking Frequency" value="" />
                            <Picker.Item label="Daily" value="Daily" />
                            <Picker.Item label="Weekly" value="Weekly" />
                            <Picker.Item label="Occasionally" value="Occasionally" />
                        </Picker>

                        <View style={styles.switchContainer}>
                            <Text>Do you attend professional counseling?</Text>
                            <Switch
                                value={formData.mentalWellbeing.professionalCounseling}
                                onValueChange={(value) =>
                                    handleInputChange('mentalWellbeing', 'professionalCounseling', value)
                                }
                                color="#2260FF"
                            />
                        </View>

                    </View>
                );

            case 7: // Review & Submit
                return (
                    <View style={styles.stageContainer}>
                        <Text style={styles.stageHeader}>Review & Submit</Text>

                        <Text style={styles.summaryHeader}>Summary</Text>
                        <View style={styles.summaryContainer}>
                            <Text style={styles.summaryText}>â€¢ Fitness Goal: {formData.fitnessGoals.goalWeight} kg</Text>
                            <Text style={styles.summaryText}>â€¢ Preferred Workout: {formData.fitnessGoals.preferredWorkoutType}</Text>
                            <Text style={styles.summaryText}>â€¢ Stress Coping: {formData.mentalWellbeing.stressCopingMechanisms}</Text>
                            <Text style={styles.summaryText}>â€¢ Self-Esteem Level: {formData.mentalWellbeing.selfEsteemLevel}</Text>
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
                {currentStage < 7 && (
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
