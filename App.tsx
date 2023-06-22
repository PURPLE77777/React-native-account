import { StyleSheet, Text, View } from 'react-native'
import MainScreen from './screens/MainScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SectionScreen from './screens/SectionScreen'
import AddAccountScreen from './screens/AddAccountScreen'

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

				<Stack.Screen name='AddAccount' component={AddAccountScreen} />
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
