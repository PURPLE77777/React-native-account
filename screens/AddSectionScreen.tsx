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
	GestureResponderEvent
} from 'react-native'
import comStyles from '../common/styles/containerStyles'
import { useEffect, useState } from 'react'
import { randomHexColor } from '../common/utils/randomColor'
import Cross from '../assets/cross.svg'

const AddSectionScreen = () => {
	const [accountText, setAccountText] = useState<string>('')
	const [isAccountFocused, setIsAccountFocused] = useState<boolean>(false)
	const handleAccountFocus = () => setIsAccountFocused(true)
	const handleAccountBlur = () => setIsAccountFocused(false)

	const [sectionText, setSectionText] = useState<string>('')
	const [isSectionFocused, setIsSectionFocused] = useState<boolean>(false)
	const handleSectionFocus = () => setIsSectionFocused(true)
	const handleSectionBlur = () => setIsSectionFocused(false)

	const [subsectionText, setSubsectionText] = useState<string>('')
	const [isSubsectionFocused, setIsSubsectionFocused] = useState<boolean>(false)
	const handleSubsectionFocus = () => setIsSubsectionFocused(true)
	const handleSubsectionBlur = () => setIsSubsectionFocused(false)

	const [password, setPassword] = useState<string>('')
	const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false)
	const handlePasswordFocus = () => setIsPasswordFocused(true)
	const handlePasswordBlur = () => setIsPasswordFocused(false)

	const [subsections, setSubSections] = useState<string[]>(['fafa', 'vzcvzvzc'])

	const [colors, setColors] = useState<string[]>([])
	// need to delete in future
	const createColors = () => {
		subsections.forEach(() => {
			setColors(prev => [...prev, getColor()])
		})
	}
	// console.log(colors)
	useEffect(createColors, [])
	///////////////////

	const getColor = () => {
		let color: string = randomHexColor()
		while (color == '#ffffff') color = randomHexColor()
		return color
	}

	const addSubSection = () => {
		if (subsectionText != '') {
			setColors(prev => [...prev, getColor()])
			setSubSections(prev => [...prev, subsectionText])
			setSubsectionText('')
		} else {
			Alert.alert('Warning', 'Enter subsection')
		}
	}

	const deleteSubsection = (ind: number) => {
		setSubSections(subsections.filter((_, i) => i != ind))
		setColors(colors.filter((_, i) => i != ind))
	}

	return (
		<ScrollView style={[comStyles.contBg, comStyles.contPad, styles.container]}>
			<View style={[comStyles.wrapperBg, styles.inputsWrapper]}>
				<TextInput
					value={accountText}
					onChangeText={setAccountText}
					placeholder='Enter name of account'
					onFocus={handleAccountFocus}
					onBlur={handleAccountBlur}
					placeholderTextColor='white'
					style={[
						comStyles.wrapperBg,
						styles.inputSection,
						{
							borderColor: isAccountFocused ? 'yellow' : '#7700FF'
						}
					]}
				/>
				<TextInput
					value={sectionText}
					onChangeText={setSectionText}
					placeholder='Enter name of section'
					onFocus={handleSectionFocus}
					onBlur={handleSectionBlur}
					placeholderTextColor='white'
					style={[
						comStyles.wrapperBg,
						styles.inputSection,
						{
							borderColor: isSectionFocused ? 'yellow' : '#7700FF'
						}
					]}
				/>
				<TextInput
					value={password}
					onChangeText={setPassword}
					placeholder='Enter password of account'
					onFocus={handlePasswordFocus}
					onBlur={handlePasswordBlur}
					placeholderTextColor='white'
					style={[
						comStyles.wrapperBg,
						styles.inputSection,
						{
							borderColor: isPasswordFocused ? 'yellow' : '#7700FF'
						}
					]}
				/>
			</View>

			<View style={[comStyles.wrapperBg, styles.inputsWrapper]}>
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
						<Text style={[comStyles.wrapperBg, styles.textBox]}>{text}</Text>
						<TouchableOpacity
							style={styles.deleteSubSectionBtn}
							onPress={() => deleteSubsection(ind)}
						>
							<View
								style={{
									height: 30,
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
			</View>
			<TextInput
				value={subsectionText}
				onChangeText={setSubsectionText}
				placeholder='Enter name of subsection'
				onFocus={handleSubsectionFocus}
				onBlur={handleSubsectionBlur}
				placeholderTextColor='white'
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
				<Text style={styles.subSectionBtnText}>Add subsectio</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}

export default AddSectionScreen

const styles = StyleSheet.create({
	container: {},
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
		// alignItems: 'baseline'
		// alignItems: 'center'
	},
	textBox: {
		color: '#fff',
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		backgroundColor: 'transparent',
		fontSize: 15,
		padding: 10
	},
	deleteSubSectionBtn: {
		backgroundColor: 'transparent',
		justifyContent: 'center'
	},
	deleteSubSectionText: {
		fontSize: 25,
		color: '#fff'
		// verticalAlign: 'top'
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
