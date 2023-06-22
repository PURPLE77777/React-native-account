import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import MainScreen from './screens/MainScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SectionScreen from './screens/SectionScreen'
import AddSectionScreen from './screens/AddSectionScreen'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Main'
				screenOptions={{
					// headerShown: false,
					headerTintColor: 'white',
					headerStyle: {
						backgroundColor: '#5B04AC'
					}
				}}
			>
				<Stack.Screen name='Section' component={SectionScreen} />
				<Stack.Screen
					name='Main'
					component={MainScreen}
					// options={{ headerShown: false }}
				/>
				<Stack.Screen name='AddSection' component={AddSectionScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
