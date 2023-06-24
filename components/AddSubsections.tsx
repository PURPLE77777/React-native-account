import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	useWindowDimensions
} from 'react-native'
import comStyles from '../common/styles/containerStyles'
import { randomHexColor } from '../common/utils/randomColor'
import Cross from '../assets/cross.svg'
import { SectionsWithSubs } from '../common/types'

type IaddSubsections = {
	sections: string[]
	sectionsWithSubs: SectionsWithSubs[]
	setSectionsWithSubs: Dispatch<SetStateAction<SectionsWithSubs[]>>
	// subsections: string[]
	// setSubsections: Dispatch<SetStateAction<string[]>>
}

const addSubsectionsScreen = ({
	sections,
	sectionsWithSubs,
	setSectionsWithSubs
}: IaddSubsections) => {
	const [subsections, setSubsections] = useState<string[]>([])
	const [subsection, setSubsection] = useState<string>('')
	const [isSubsectionFocused, setIsSubsectionFocused] = useState<boolean>(false)
	const [colors, setColors] = useState<string[]>([])

	const handleSubsectionFocus = (): void => setIsSubsectionFocused(true)
	const handleSubsectionBlur = (): void => setIsSubsectionFocused(false)

	const getColor = (): string => {
		let color: string = randomHexColor()
		while (color == '#ffffff') color = randomHexColor()
		return color
	}

	const addSubsection = (): void => {
		if (subsection != '') {
			setColors([...colors, getColor()])
			setSubsections([...subsections, subsection])
			setSubsection('')
		} else {
			Alert.alert('Warning', 'Enter subsection')
		}
	}

	const deleteSubsection = (ind: number): void => {
		setSubsections(subsections.filter((_, i) => i != ind))
		setColors(colors.filter((_, i) => i != ind))
	}

	// if selected section hasn't in sections then set subsections to []
	// useEffect(() => {
	// 	if (!sections.includes())
	// 	setSubsections([])
	// }, [sections])

	useEffect(() => {
		const newSectionsWithSubs = sectionsWithSubs.map(item => {
			// enter selected section
			if (item.section == sections[1]) {
				return { ...item, subsections: subsections }
			}
			return item
		})
		setSectionsWithSubs(newSectionsWithSubs)
	}, [subsections])

	const { width: screenWidth } = useWindowDimensions()

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
				Add Subsections
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
								style={styles.deleteSubsectionBtn}
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
						value={subsection}
						onChangeText={setSubsection}
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
						style={[comStyles.elementBg, styles.addSubsectionBtn]}
						onPress={addSubsection}
					>
						<Text style={styles.subsectionBtnText}>Add subsection</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}

export default addSubsectionsScreen

const styles = StyleSheet.create({
	container: {
		// flex: 1
	},
	subsectionCont: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	deleteSubsectionBtn: {
		flex: 0.1,
		backgroundColor: 'transparent',
		justifyContent: 'center'
	},
	inputSection: {
		height: 50,
		paddingStart: 20,
		paddingEnd: 20,
		marginBottom: 15,
		color: '#fff',
		borderWidth: 2
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
	deletesubsection: {
		fontSize: 25,
		color: '#fff'
	},
	inputsWrapper: {
		marginTop: 20,
		padding: 20,
		borderRadius: 10
	},
	addSubsectionBtn: {
		height: 40
	},
	subsectionBtnText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
		verticalAlign: 'middle',
		flex: 1
	}
})
