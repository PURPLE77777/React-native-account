import { StyleSheet, View, Text, useWindowDimensions } from 'react-native'
import { SectionsWithSubs } from '../common/types'
import comStyles from '../common/styles/containerStyles'
import { randomHexColor } from '../common/utils/randomColor'

type RegisterAccountProps = {
	account: string
	password: string
	sectionsWithSubs: SectionsWithSubs[]
}

const RegisterAccount = ({
	account,
	password,
	sectionsWithSubs
}: RegisterAccountProps) => {
	const { width: screenWidth } = useWindowDimensions()

	const getColor = (): string => {
		let color: string = randomHexColor()
		while (color == '#ffffff') color = randomHexColor()
		return color
	}

	return (
		<View style={[styles.container, { width: screenWidth }]}>
			<Text style={[styles.text, { textAlign: 'center' }]}>
				Register Account
			</Text>
			<View style={[comStyles.wrapperBg]}>
				<Text style={styles.text}>Account: {account}</Text>
				<Text style={styles.text}>Password: {password}</Text>
			</View>
			<View style={[comStyles.wrapperBg, styles.tableContainer]}>
				{sectionsWithSubs.map((section, ind) => {
					return (
						<View style={styles.rowSection} key={`section-${ind}`}>
							<Text style={[styles.text, styles.sectionsColumn]}>
								{section.section}
							</Text>
							<View style={styles.subsectionsColumn}>
								{section.subsections.map((subsection, i) => (
									<Text
										style={[
											styles.text,
											styles.subsectionsText,
											{ backgroundColor: getColor() }
										]}
										key={`subsection-${i}`}
									>
										{subsection}
									</Text>
								))}
							</View>
						</View>
					)
				})}
			</View>
		</View>
	)
}
const borderTableColor = randomHexColor()
const styles = StyleSheet.create({
	container: {},
	tableContainer: {
		// flexDirection: 'row'
		borderBottomColor: borderTableColor,
		borderBottomWidth: 3
	},
	rowSection: {
		flexDirection: 'row',
		paddingStart: 10,
		paddingEnd: 10
	},
	sectionsColumn: {
		width: 110,
		borderTopColor: borderTableColor,
		borderLeftColor: borderTableColor,
		borderRightColor: borderTableColor,
		borderTopWidth: 3,
		borderLeftWidth: 3,
		borderRightWidth: 3
	},
	subsectionsColumn: {
		flex: 1,
		paddingStart: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderTopColor: borderTableColor,
		borderRightColor: borderTableColor,
		// borderBottomColor: borderTableColor,
		borderTopWidth: 3,
		borderRightWidth: 3,
		// borderBottomWidth: 3,
		borderLeftColor: 'none'
	},
	subsectionsText: {
		padding: 5,
		margin: 5,
		borderRadius: 10
	},
	text: {
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold'
	}
})

export default RegisterAccount
