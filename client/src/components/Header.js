import { Box, Text } from '@chakra-ui/react';

function Header() {
	return (
		<Box
			bg='#f6bd60'
			h='80px'
			display='flex'
			justifyContent='center'
			alignItems='center'
			fontWeight='semibold'
		>
			<Text fontSize='xl'>Fiction Tracker</Text>
		</Box>
	);
}

export default Header;
