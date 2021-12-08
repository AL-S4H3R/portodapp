import { Center, Heading, HStack, Stack, VStack, Text } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { Select } from '@chakra-ui/select'
import type { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios'
import { Button } from '@chakra-ui/button'
import { BiWallet } from 'react-icons/bi'
import { useEthers } from '@usedapp/core'

const polygonApiUrl = `https://api.polygonscan.com/api?module=contract&action=getsourcecode`
const hero = `The easiest way to port dapps between chains`

const Home: NextPage = () => {

	const apiKey = process.env.NEXT_PUBLIC_POLYGON_KEY
	const [ currentChain, setCurrentChain ] = useState('')
	const [ contractAddress, setContractAddress ] = useState('')
	const { activateBrowserWallet, account, active } = useEthers()
	
	const getPolygonAbi = async () => {
		// tokenAddress = '0xa2de515a43a1375464a5370c4ab3fec83a1b4c71'
		console.log('Executing function')
		try {
			const res = await axios.get(`${polygonApiUrl}&address=${contractAddress}&apiKey=${apiKey}`)
			console.log(res.data)
		}
		catch(err) {
			console.log(err)
		}
	}

	const selectChain = (e: any) => {
		setCurrentChain(e.target.value)
	}

	return(
		<Stack h='100vh' bgGradient='linear(to-b, white, gray.100)' fontFamily='Noto Sans'>
			<Stack p={8} spacing={16}>
				<HStack align='center' justify='space-between'>
					<Heading fontFamily='Readex Pro'>portoDapp</Heading>
					{
						!active ? 
						<Button leftIcon={<BiWallet />} onClick={() => activateBrowserWallet()}>
							Connect Wallet
						</Button> :
						<Text>
							{account?.substr(0,20)}
						</Text>
					}
				</HStack>
				<Center justify='center'>
					<VStack>
						<Text as='h2' fontSize='3xl'>{hero}</Text>
						<Select placeholder='Select Chain'>
							<option value='polygon' onClick={selectChain}>Polygon (Matic)</option>
							<option value='eth' onClick={selectChain}>Ethereum</option>
							<option value='bsc' onClick={selectChain}>Binance Smart Chain</option>
						</Select>
						<Input 
							placeholder='0xa2de515a43a1375464a5370c4ab3fec83a1b4c71'
							value={contractAddress}
							onChange={(e) => setContractAddress(e.target.value)}
						/>
						<Button onClick={getPolygonAbi}>Verify Contract</Button>
					</VStack>
				</Center>
			</Stack>
		</Stack>
	)
}

export default Home