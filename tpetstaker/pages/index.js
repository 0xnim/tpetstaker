import Head from 'next/head'
import stakingContract from '../blockchain/staking'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import styles from '../styles/staking.module.css'

const staking = () => {
  const [totalstaked, setTotalstaked] = useState('')
 
  //loading users network ID and name
  const networkId = await web3.eth.net.getId();
  const networkType = await web3.eth.net.getNetworkType();
  setNetwork({ ...network, id: networkId, name: networkType });

  //connecting to metamask
  let web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  setAccount(accounts[0]);

  useEffect(() => {
   totalstakedHandler()
  })

  const totalstakedHandler = async () => {
    const totalstaked = await stakingContract.methods.totalStaked().call()
    setTotalstaked(totalstaked)
  }

  const connectWalletHandler = () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }]})
      web3 = new Web3(window.ethereum)
    }

    else{
      //alert('Install Metamask!')
      console.log('error')
    }

  }
  return (
    <div>
      <Head>
        <title>$TPET Staking</title>
        <meta name="description" content="A staking dApp for a token on the polygon chain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1> Staking </h1>



      <button onClick={connectWalletHandler}>Connect Wallet</button>
      <h2> Total Staked: {totalstakedHandler}</h2>
      <button onClick={''}>Approve Token</button>

    </div>
  )

}
export default staking;
