import { Swap } from '@strata-foundation/react';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PublicKey } from '@solana/web3.js'
import React, {useState} from 'react';
import { Toaster } from 'react-hot-toast';
import { CreateButton, ITokenState } from './components/CreateButton';
import { TokenDisplay } from './components/TokenDisplay';
import styles from './styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      foo: "bar"
    } 
  }
}

const Home: NextPage = ({ foo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [tokenState, setTokenState] = React.useState<ITokenState>({});

  const [ a1, seta1 ] = useState("");
  const [ a2, seta2 ] = useState("");
  function lala(){
    try{
      setTokenState({tokenRef: new PublicKey(a1), tokenBonding: new PublicKey(a2)})
    }
    catch(err){

    }
  }
  function do1(event: any) {    seta1(event.target.value);  }
  function do2(event: any) {    seta2(event.target.value);  }
  return (
    <div className={styles.container}>
      <Head>
        <title>I Heart Freedom</title>
        <meta name="description" content="Your money, your way, without the dollar." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
<div><label>Enter a friend&apos;s token key (enter AXrredJXXo8jNFPxSsZ2kZa348PK3serkLt8qATZyEvb and 2wPbrA53ZDv4rFU48qNTN5i3Ds6H4V2gCZjJMYA5Ed1t to see mine :) ):<br />
1st token id: <br />
<input type="text" placeholder="{token ID}" onChange={do1}></input></label>
<br /><label>2nd token id: <br />
<input type="text" placeholder="{2nd token ID}" onChange={do2}></input></label> <br />

<input type="submit" onClick={lala} /></div>        
          <TokenDisplay  {...tokenState} />
          <div style={{ width: "400px" }}>
            {tokenState.tokenBonding && <Swap tokenBondingKey={tokenState.tokenBonding} />}
          </div>
          <Toaster
            position="bottom-center"
            containerStyle={{
              margin: "auto",
              width: "420px",
            }}
          />
                    <CreateButton setTokenState={setTokenState} />

      </main>
    </div>
  );
};

export default Home;
