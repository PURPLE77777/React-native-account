import {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState
} from 'react'
import {
	Alert,
	FlatList,
	Modal,
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
import ArrowDown from '../assets/arrow_down.svg'
import { SectionsWithSubs } from '../common/types'

type AddSubsectionsProps = {
	sections: string[]
	sectionsWithSubs: SectionsWithSubs[]
	setSectionsWithSubs: Dispatch<SetStateAction<SectionsWithSubs[]>>
}

const addSubsectionsScreen = ({
	sections,
	sectionsWithSubs,
	setSectionsWithSubs
}: AddSubsectionsProps) => {
	const { width: screenWidth } = useWindowDimensions()
	const [subsections, setSubsections] = useState<string[]>([])
	const [subsection, setSubsection] = useState<string>('')
	const [isSubsectionFocused, setIsSubsectionFocused] = useState<boolean>(false)
	const [colors, setColors] = useState<string[]>([])
	const [selectedSection, setSelectedSection] = useState<string>('')

	const handleSubsectionFocus = (): void => setIsSubsectionFocused(true)
	const handleSubsectionBlur = (): void => setIsSubsectionFocused(false)

	const getColor = (): string => {
		let color: string = randomHexColor()
		while (color == '#ffffff') color = randomHexColor()
		return color
	}

	const addSubsection = (): void => {
		if (selectedSection == '') {
			Alert.alert('Warning', 'Select a section')
		} else if (subsection != '') {
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

	const [visible, setVisible] = useState<boolean>(false)
	const comboboxHandler = (): void => {
		if (sections.length) setVisible(!visible)
		else Alert.alert('Warning', 'Please, create sections')
	}

	const onSelectedComboboxItem = (item: string): void => {
		setVisible(!visible)
		setSelectedSection(item)
	}

	const comboboxItem = ({ item }) => (
		<TouchableOpacity
			style={styles.comboboxItem}
			onPress={() => onSelectedComboboxItem(item)}
		>
			<Text style={styles.comboboxText}>{item}</Text>
		</TouchableOpacity>
	)

	const enteringSubsectionsView = (): ReactElement => {
		if (selectedSection) {
			return (
				<>
					<Text style={{ fontSize: 15, fontWeight: 'bold', color: '#ffffff' }}>
						{selectedSection} section will be include:
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
				</>
			)
		} else {
			return (
				<Text style={{ fontSize: 15, fontWeight: 'bold', color: '#ffffff' }}>
					Please, select section
				</Text>
			)
		}
	}

	useEffect(() => {
		if (!sections.includes(selectedSection)) {
			setSubsections([])
			setSelectedSection('')
		}
	}, [sections])

	useEffect(() => {
		if (selectedSection != '') {
			const newSectionsWithSubs = sectionsWithSubs.map(item => {
				if (item.section == selectedSection) {
					return { ...item, subsections: subsections }
				}
				return item
			})
			setSectionsWithSubs(newSectionsWithSubs)
		}
	}, [subsections])

	useEffect(() => {
		if (selectedSection != '') {
			const section = sectionsWithSubs.filter(
				sect => sect.section == selectedSection
			)[0]
			setSubsections(section.subsections)
			setColors([])
			section.subsections.forEach(() =>
				setColors(prev => [...prev, getColor()])
			)
		}
	}, [selectedSection])

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
					<View style={{ marginBottom: 50, position: 'relative' }}>
						<TouchableOpacity
							style={[comStyles.wrapperBg, styles.comboboxBtn]}
							onPress={comboboxHandler}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: 'bold',
									color: '#ffffff'
								}}
							>
								{selectedSection ? selectedSection : 'Select section'}
							</Text>
							<ArrowDown width={20} height={20} />
						</TouchableOpacity>
						<Modal
							visible={visible}
							transparent
							animationType='none'
							onRequestClose={() => setVisible(!visible)}
						>
							<View style={[styles.comboList]}>
								<FlatList
									data={sections}
									renderItem={comboboxItem}
									keyExtractor={(item, index) => index.toString()}
								/>
							</View>
						</Modal>
					</View>
					{enteringSubsectionsView()}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
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
		borderWidth: 2,
		backgroundColor: '#32003AC2'
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
	},
	comboboxBtn: {
		height: 50,
		paddingStart: 20,
		paddingEnd: 20,
		marginBottom: 15,
		// color: '#fff',
		borderColor: '#7700FF',
		borderWidth: 2,
		backgroundColor: '#32003AC2',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
	},
	comboList: {
		backgroundColor: '#fff',
		top: 173,
		left: 0,
		marginStart: 40,
		marginEnd: 40,
		maxHeight: 300,
		borderStartColor: '#7700FF',
		borderEndColor: '#7700FF',
		borderStartWidth: 2,
		borderEndWidth: 2
	},
	comboboxItem: {
		padding: 10,
		backgroundColor: '#32003AC2',
		borderBottomColor: 'yellow',
		borderBottomWidth: 2
	},
	comboboxText: {
		color: '#fff'
	}
})

export default addSubsectionsScreen
