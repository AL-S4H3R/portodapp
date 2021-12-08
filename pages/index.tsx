import { Center, Heading, HStack, Stack, VStack, Text } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { Select } from '@chakra-ui/select'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@chakra-ui/button'
import { BiWallet, BiWindowOpen } from 'react-icons/bi'
import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'

const polygonApiUrl = `https://api.polygonscan.com/api?module=contract&action=getsourcecode`
const hero = `The easiest way to port dapps between chains`

const apiUrl = `http://localhost:8080/api`

const Home: NextPage = () => {

	const apiKey = process.env.NEXT_PUBLIC_POLYGON_KEY
	// const { activateBrowserWallet, chainId, active } = useEthers()
	const [ currentChain, setCurrentChain ] = useState('')
	const [ contractAddress, setContractAddress ] = useState('')
	const [ currentAccount, setCurrentAccount ] = useState('')

	const [ contractData, setContractData ] = useState<any>()

	useEffect(() => {
		// @ts-expect-error
		if(window.ethereum !== 'undefined'){
			console.log(`MetaMask is installed`)
			// @ts-expect-error
			if(window.ethereum.isConnected()){
				console.log('Account is connected')
				requestAccount()
			}
		}
	}, [])

	const requestAccount = async () => {
		// @ts-expect-error
		const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
		console.log(accounts[0])
		setCurrentAccount(accounts[0])
		// @ts-expect-error
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const { chainId } = await provider.getNetwork()
		const data = await provider.getCode('0xa2de515a43a1375464a5370c4ab3fec83a1b4c71')
		console.log(`Chain Id: ${chainId}`)
		console.log(`Bytecode:`, data.toString())
	}

	const getPolygonAbi = async () => {
		// tokenAddress = '0xa2de515a43a1375464a5370c4ab3fec83a1b4c71'
		console.log('Executing function')
		try {
			const res = await axios.get(`${polygonApiUrl}&address=${contractAddress}&apiKey=${apiKey}`)
			console.log(res.data)
			setContractData(res.data.result)
			// @ts-expect-error
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const data = await provider.getCode(contractAddress)
			console.log('Bytecode: ', data)
		}
		catch(err) {
			console.log(err)
		}
	}

	const selectChain = (e: any) => {
		setCurrentChain(e.target.value)
	}

	const createSolidityFile = async (code: string) => {
		const res = await axios.post(`${apiUrl}/create`, {
			sourceCode: code
		})
	}

	return(
		<Stack h='100vh' bgGradient='linear(to-b, white, gray.100)' fontFamily='Noto Sans' overflowY='auto'>
			<Stack p={8} spacing={16}>
				<HStack align='center' justify='space-between'>
					<Heading fontFamily='Readex Pro'>portoDapp</Heading>
					{
						currentAccount === '' ?
						<Button leftIcon={<BiWallet />} onClick={requestAccount}>
							Connect Wallet
						</Button> :
						<Text>{currentAccount.substr(0,20)}</Text>
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
						{/* <Button onClick={()}>Get Balance</Button> */}
						{
							contractData &&
							<Button onClick={() => createSolidityFile(contractData[0].SourceCode)}>
								Create File
							</Button>
						}
					</VStack>
				</Center>
			</Stack>
		</Stack>
	)
}

export default Home