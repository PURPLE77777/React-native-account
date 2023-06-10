import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CarouselView from './CarouselView'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IProduct {
	id: number
	title: string
	price: number
	category: string
	description: string
	image: string
}

const MainScreen = () => {
	const [products, setProducts] = useState<IProduct[]>([])

	const loadAccount = async () => {
		try {
			const value = await AsyncStorage.getItem('@storage_Key')
			if (value !== null) {
				console.log(value)
			} else {
				console.log('data is null')
			}
		} catch (e) {
			console.log('loadAccount: failed load account\n' + e)
		}
	}

	useEffect(() => {
		fetch('https://fakestoreapi.com/productse?limit=5')
			.then(res => res.json())
			.then(json => {
				setProducts(json)
				loadAccount()
			})
			.catch(() => {
				console.log('error of getting data')
			})
	}, [])

	return (
		<View style={styles.mainContainer}>
			<CarouselView data={products} />
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 100,
		backgroundColor: '#2f2f2f'
	},
	text: {
		fontSize: 20
	},
	button: {
		width: 100,
		shadowColor: 'white',
		marginTop: 10
	},
	buttonInc: {
		backgroundColor: 'lime'
	},
	buttonDec: {
		backgroundColor: 'red'
	},
	buttonText: {
		textAlign: 'center',
		padding: 10
	},
	productContainer: {
		backgroundColor: '#ccc'
	},
	productView: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

export default MainScreen
