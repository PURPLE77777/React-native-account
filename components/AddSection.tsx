import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
	useWindowDimensions
} from 'react-native'
import comStyles from '../common/styles/containerStyles'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { randomHexColor } from '../common/utils/randomColor'
import Cross from '../assets/cross.svg'
import { SectionsWithSubs } from '../common/types'

type AddSectionsProps = {
	sections: string[]
	setSections: Dispatch<SetStateAction<string[]>>
	sectionsWithSubs: SectionsWithSubs[]
	setSectionsWithSubs: Dispatch<SetStateAction<SectionsWithSubs[]>>
}

const AddSectionScreen = ({
	sections,
	setSections,
	sectionsWithSubs,
	setSectionsWithSubs
}: AddSectionsProps) => {
	const [colors, setColors] = useState<string[]>([])

	const [section, setSection] = useState<string>('')
	const [isSubsectionFocused, setIsSubsectionFocused] = useState<boolean>(false)

	const handleSubsectionFocus = (): void => setIsSubsectionFocused(true)
	const handleSubsectionBlur = (): void => setIsSubsectionFocused(false)

	const getColor = (): string => {
		let color: string = randomHexColor()
		while (color == '#ffffff') color = randomHexColor()
		return color
	}

	const addSection = (): void => {
		if (section != '') {
			setColors([...colors, getColor()])
			setSections([...sections, section])
			setSection('')
		} else {
			Alert.alert('Warning', 'Enter section')
		}
	}

	const deleteSubsection = (ind: number): void => {
		setSections(sections.filter((_, i) => i != ind))
		setColors(colors.filter((_, i) => i != ind))
	}

	useEffect(() => {
		if (sections.length > sectionsWithSubs.length) {
			setSectionsWithSubs([
				...sectionsWithSubs,
				{ section: sections[sections.length - 1], subsections: [] }
			])
			return
		}
		const newSectionsWithSubs = sectionsWithSubs.filter(item => {
			return sections.some(sectItem => sectItem == item.section)
		})
		setSectionsWithSubs(newSectionsWithSubs)
	}, [sections])

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
				Add Sections
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
						Your account will include the next sections:
					</Text>
					{sections.map((text, ind) => (
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
						value={section}
						onChangeText={setSection}
						placeholder='Enter name of section'
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
						onPress={addSection}
					>
						<Text style={styles.subsectionBtnText}>Add section</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
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
	deleteSubsectionText: {
		fontSize: 25,
		color: '#fff'
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
