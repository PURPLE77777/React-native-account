import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	useWindowDimensions,
	Dimensions
} from 'react-native'
import comStyles from '../common/styles/containerStyles'
import { useEffect, useState } from 'react'
import AddAccount from '../components/AddAccount'
import AddSection from '../components/AddSection'
import AddSubsections from '../components/AddSubsections'

const AddAccountScreen = () => {
	const [step, setStep] = useState<number>(1)
	const [scrollView, setScrollView] = useState<ScrollView | null>(null)

	const {
		width: screenWidth,
		height: screenHeight
	}: { width: number; height: number } = useWindowDimensions()

	const goNext = (): void => {
		setStep(step + 1)
	}

	const goPrev = (): void => {
		setStep(step - 1)
	}

	useEffect(() => {
		console.log(`step: ${step}`)
		scrollView?.scrollTo({ x: screenWidth * (step - 1), animated: true })
	}, [step])

	const addAccount = (): void => {
		console.log(`step: ${step}`)
	}

	return (
		<View style={[comStyles.contBg, styles.container]}>
			<ScrollView
				style={styles.scrollWrap}
				horizontal
				pagingEnabled
				scrollEnabled={false}
				ref={ref => {
					setScrollView(ref)
				}}
			>
				<AddAccount />
				<AddSection />
				<AddSubsections />
			</ScrollView>

			{step == 1 ? (
				<TouchableHighlight
					underlayColor={'#43A188A6'}
					style={styles.btnScrollGo}
					onPress={goNext}
				>
					<Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}>
						Next
					</Text>
				</TouchableHighlight>
			) : (
				<View style={styles.wrapBtns}>
					<TouchableHighlight
						underlayColor={'#BC0C0D'}
						style={[styles.btnScrollGo, { flex: 1 }]}
						onPress={goPrev}
					>
						<Text
							style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
						>
							Back
						</Text>
					</TouchableHighlight>
					{step == 2 ? (
						<TouchableHighlight
							underlayColor={'#43A188A6'}
							style={[styles.btnScrollGo, { flex: 1 }]}
							onPress={goNext}
						>
							<Text
								style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
							>
								Next
							</Text>
						</TouchableHighlight>
					) : (
						<TouchableHighlight
							underlayColor={'#03DAC6'}
							style={[styles.btnAddAccount, { flex: 1 }]}
							onPress={addAccount}
						>
							<Text
								style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
							>
								Add Account
							</Text>
						</TouchableHighlight>
					)}
				</View>
			)}
		</View>
	)
}

export default AddAccountScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	scrollWrap: {
		// height: Dimensions.get('window').height - 150
	},
	wrapBtns: {
		flexDirection: 'row'
	},
	btnScrollGo: {
		// height: 250,
		backgroundColor: '#3700B3',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnAddAccount: {
		backgroundColor: '#03DAC6',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
