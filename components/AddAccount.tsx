import {
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions
} from 'react-native'
import { useState } from 'react'
import comStyles from '../common/styles/containerStyles'

const AddAccount = () => {
	const [accountText, setAccountText] = useState<string>('')
	const [isAccountFocused, setIsAccountFocused] = useState<boolean>(false)
	const handleAccountFocus = () => setIsAccountFocused(true)
	const handleAccountBlur = () => setIsAccountFocused(false)

	const [password, setPassword] = useState<string>('')
	const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false)
	const handlePasswordFocus = () => setIsPasswordFocused(true)
	const handlePasswordBlur = () => setIsPasswordFocused(false)

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
				AddAccount
			</Text>
			<View style={[comStyles.wrapperBg, styles.inputsWrapper]}>
				<TextInput
					value={accountText}
					onChangeText={setAccountText}
					placeholder='Enter name of account'
					onFocus={handleAccountFocus}
					onBlur={handleAccountBlur}
					cursorColor='#ffffff'
					maxLength={30}
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
					value={password}
					onChangeText={setPassword}
					placeholder='Enter password of account'
					onFocus={handlePasswordFocus}
					onBlur={handlePasswordBlur}
					cursorColor='#ffffff'
					maxLength={30}
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
		</View>
	)
}

export default AddAccount

const styles = StyleSheet.create({
	container: {
		paddingStart: 20,
		paddingEnd: 20,
		justifyContent: 'center'
	},
	inputsWrapper: {
		// marginTop: 20,
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
	}
})
