import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Image,
	FlatList,
	ImageBackground
} from 'react-native'
import PlusAddAccount from '../assets/plus-add_account.svg'

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
	console.log(data, Boolean(data.length))
	const carouselItemView = ({ item }: { item: IProduct }) => {
		return (
			<View
				style={[styles.carouselItem, { width: screenWidth }]}
				key={item.id.toString()}
			>
				<View style={[styles.imageWrapper, { width: screenWidth - 100 }]}>
					<Text style={styles.title}>{item.title}</Text>
					{/* <ImageBackground style={[styles.image]} source={{ uri: item.image }}>
					</ImageBackground> */}
				</View>
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
		<View style={[styles.addAccount, { width: screenWidth }]}>
			<View style={[styles.addAccountItem, { width: screenWidth - 100 }]}>
				{/* <Image
					source={require('../assets/plus-add_accounnt.svg')}
					style={styles.addAccountImage}
				/> */}
				<PlusAddAccount
					style={styles.addAccountImage}
					width={200}
					height={200}
				/>
				<Text style={styles.title}>Add Account</Text>
				{/* <ImageBackground style={[styles.image]} source={{ uri: item.image }}>
			</ImageBackground> */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	carousel: {
		backgroundColor: 'black',
		height: 250,
		flexGrow: 0
	},
	carouselItem: {
		backgroundColor: '#4c4c4c',
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
		backgroundColor: '#4c4c4c',
		justifyContent: 'center',
		alignItems: 'center'
	},
	addAccountItem: {
		backgroundColor: 'blue',
		alignItems: 'center'
		// height: 200
		// justifyContent: 'center'
	},
	addAccountImage: {
		flex: 1,
		resizeMode: 'contain',
		backgroundColor: 'white'
	}
})

export default CarouselView
