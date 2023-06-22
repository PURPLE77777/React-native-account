import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Image,
	FlatList,
	ImageBackground,
	TouchableOpacity
} from 'react-native'
import PlusAddAccount from '../assets/plus-add_account.svg'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface IProduct {
	id: number
	title: string
	price: number
	category: string
	description: string
	image: string
}

const CarouselView = ({ data }: { data: IProduct[] }) => {
	const { width: screenWidth, height: screnHeight } = useWindowDimensions()
	const navigator = useNavigation<NativeStackNavigationProp<ParamListBase>>()

	const addAccount = () => {
		navigator.navigate('AddAccount')
	}

	const carouselItemView = ({ item }: { item: IProduct }) => {
		return (
			<View
				style={[styles.carouselItem, { width: screenWidth }]}
				key={item.id.toString()}
			>
				<TouchableOpacity
					style={[styles.imageWrapper, { width: screenWidth - 100 }]}
					onPress={addAccount}
				>
					<Text style={styles.title}>{item.title}</Text>
					{/* <ImageBackground style={[styles.image]} source={{ uri: item.image }}>
					</ImageBackground> */}
				</TouchableOpacity>
			</View>
		)
	}

	return data.length ? (
		<FlatList
			style={[styles.carousel, { width: screenWidth }]}
			horizontal
			data={data}
			renderItem={carouselItemView}
			pagingEnabled
		/>
	) : (
		<View style={[styles.addAccount]}>
			<TouchableOpacity
				style={[styles.addAccountItem, { width: screenWidth - 100 }]}
				onPress={addAccount}
			>
				{/* <Image
					source={require('../assets/plus-add_accounnt.svg')}
					style={styles.addAccountImage}
				/> */}
				<PlusAddAccount
					style={styles.addAccountImage}
					width={100}
					height={100}
					fill={'orange'}
					// fillOpacity={0.5}
				/>
				<Text style={styles.title}>Add Account</Text>
				{/* <ImageBackground style={[styles.image]} source={{ uri: item.image }}>
			</ImageBackground> */}
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	carousel: {
		height: 250,
		flexGrow: 0
	},
	carouselItem: {
		backgroundColor: '#261D32',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageWrapper: {
		height: 200,
		backgroundColor: '#6aa84f',
		borderRadius: 30,
		overflow: 'hidden',
		justifyContent: 'center'
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center'
	},
	title: {
		color: 'pink',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		textShadowColor: 'black'
	},
	addAccount: {
		height: 250,
		width: '100%',
		backgroundColor: '#261D32',
		justifyContent: 'center',
		alignItems: 'center'
	},
	addAccountItem: {
		backgroundColor: '#7700FF',
		alignItems: 'center',
		borderRadius: 15
	},
	addAccountImage: {
		flex: 1,
		resizeMode: 'contain'
		// backgroundColor: 'white'
	}
})

export default CarouselView
