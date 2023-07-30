import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	useWindowDimensions
} from 'react-native'
import comStyles from '../common/styles/containerStyles'
import { useEffect, useState } from 'react'
import AddAccount from '../components/AddAccount'
import AddSection from '../components/AddSection'
import AddSubsections from '../components/AddSubsections'
import { SectionsWithSubs } from '../common/types'
import RegisterAccount from '../components/RegisterAccount'

const AddAccountScreen = () => {
	const [step, setStep] = useState<number>(1)
	const [scrollView, setScrollView] = useState<ScrollView | null>(null)

	const [account, setAccount] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [sections, setSections] = useState<string[]>([])
	const [sectionsWithSubs, setSectionsWithSubs] = useState<SectionsWithSubs[]>(
		[]
	)

	const { width: screenWidth } = useWindowDimensions()

	const goNext = (): void => {
		setStep(step + 1)
	}

	const goPrev = (): void => {
		setStep(step - 1)
	}

	useEffect(() => {
		scrollView?.scrollTo({ x: screenWidth * (step - 1), animated: true })
	}, [step])

	useEffect(() => console.log(sectionsWithSubs), [sectionsWithSubs])

	const checkInfo = (): void => {
		console.log(sectionsWithSubs)
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
				<AddAccount
					account={account}
					setAccount={setAccount}
					password={password}
					setPassword={setPassword}
				/>
				<AddSection
					sections={sections}
					setSections={setSections}
					sectionsWithSubs={sectionsWithSubs}
					setSectionsWithSubs={setSectionsWithSubs}
				/>
				<AddSubsections
					sections={sections}
					sectionsWithSubs={sectionsWithSubs}
					setSectionsWithSubs={setSectionsWithSubs}
				/>
				<RegisterAccount
					account={account}
					password={password}
					sectionsWithSubs={sectionsWithSubs}
				/>
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
					{step != 4 ? (
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
							onPress={checkInfo}
						>
							<Text
								style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
							>
								create Account
							</Text>
						</TouchableHighlight>
					)}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	scrollWrap: {},
	wrapBtns: {
		flexDirection: 'row'
	},
	btnScrollGo: {
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

export default AddAccountScreen
