import {
	View,
	Text,
	TextInput,
	SectionList,
	StyleSheet,
	Button,
	TouchableOpacity,
	Alert,
	ScrollView,
	GestureResponderEvent,
	TouchableHighlight,
	useWindowDimensions
} from 'react-native'
import comStyles from '../common/styles/containerStyles'
import { useEffect, useState } from 'react'
import { randomHexColor } from '../common/utils/randomColor'
import Cross from '../assets/cross.svg'

const AddSectionScreen = () => {
	const [subsections, setSubSections] = useState<string[]>(['fafa', 'vzcvzvzc'])
	const [colors, setColors] = useState<string[]>([])

	const [subsectionText, setSubsectionText] = useState<string>('')
	const [isSubsectionFocused, setIsSubsectionFocused] = useState<boolean>(false)

	const handleSubsectionFocus = (): void => setIsSubsectionFocused(true)
	const handleSubsectionBlur = (): void => setIsSubsectionFocused(false)
	// need to delete in future
	const createColors = () => {
		subsections.forEach(() => {
			setColors(prev => [...prev, getColor()])
		})
	}
	// console.log(colors)
	useEffect(createColors, [])
	///////////////////

	const getColor = (): string => {
		let color: string = randomHexColor()
		while (color == '#ffffff') color = randomHexColor()
		return color
	}

	const addSubSection = (): void => {
		if (subsectionText != '') {
			setColors(prev => [...prev, getColor()])
			setSubSections(prev => [...prev, subsectionText])
			setSubsectionText('')
		} else {
			Alert.alert('Warning', 'Enter subsection')
		}
	}

	const deleteSubsection = (ind: number): void => {
		setSubSections(subsections.filter((_, i) => i != ind))
		setColors(colors.filter((_, i) => i != ind))
	}

	const {
		width: screenWidth,
		height: screenHeight
	}: { width: number; height: number } = useWindowDimensions()

	return (
		<View style={[styles.container, { width: screenWidth }]}>
			<Text
				style={{
					fontSize: 20,
					fontWeight: 'bold',
					textAlign: 'center',
					color: 'white'
				}}
			>
				AddSection
			</Text>
			<ScrollView style={comStyles.contPad}>
				<View
					style={[
						comStyles.wrapperBg,
						styles.inputsWrapper,
						{ marginBottom: 20 }
					]}
				>
					<Text style={{ fontSize: 15, fontWeight: 'bold', color: '#ffffff' }}>
						Your section will be include:
					</Text>
					{subsections.map((text, ind) => (
						<View
							key={`text-${ind}`}
							style={[
								styles.subsectionCont,
								{
									backgroundColor: colors[ind]
								}
							]}
						>
							<Text style={[comStyles.wrapperBg, styles.textSubsection]}>
								{text}
							</Text>
							<TouchableOpacity
								style={styles.deleteSubSectionBtn}
								onPress={() => deleteSubsection(ind)}
							>
								<View
									style={{
										flex: 0.6,
										borderStartWidth: 2,
										borderStartColor: '#fff',
										justifyContent: 'center'
									}}
								>
									<Cross
										// style={styles.addAccountImage}
										width={25}
										height={25}
										fill={'white'}
									/>
								</View>
							</TouchableOpacity>
						</View>
					))}
					<TextInput
						value={subsectionText}
						onChangeText={setSubsectionText}
						placeholder='Enter name of subsection'
						onFocus={handleSubsectionFocus}
						onBlur={handleSubsectionBlur}
						cursorColor='#ffffff'
						placeholderTextColor='white'
						maxLength={175}
						multiline
						style={[
							comStyles.wrapperBg,
							styles.inputSection,
							{
								borderColor: isSubsectionFocused ? 'yellow' : '#7700FF',
								marginTop: 15
							}
						]}
					/>
					<TouchableOpacity
						style={[comStyles.elementBg, styles.addSubSectionBtn]}
						onPress={addSubSection}
					>
						<Text style={styles.subSectionBtnText}>Add subsection</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}

export default AddSectionScreen

const styles = StyleSheet.create({
	container: {
		// flex: 1
	},
	inputsWrapper: {
		marginTop: 20,
		padding: 20,
		borderRadius: 10
	},
	inputSection: {
		height: 50,
		paddingStart: 20,
		paddingEnd: 20,
		marginBottom: 15,
		color: '#fff',
		borderWidth: 2
	},
	subsectionCont: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textSubsection: {
		flex: 0.9,
		color: '#fff',
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		backgroundColor: 'transparent',
		fontSize: 15,
		padding: 10
	},
	deleteSubSectionBtn: {
		flex: 0.1,
		backgroundColor: 'transparent',
		justifyContent: 'center'
	},
	deleteSubSectionText: {
		fontSize: 25,
		color: '#fff'
	},
	addSubSectionBtn: {
		height: 40
	},
	subSectionBtnText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		verticalAlign: 'middle',
		flex: 1
	}
})
