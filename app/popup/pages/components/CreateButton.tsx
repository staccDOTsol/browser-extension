import React, {useState} from "react";
import { useStrataSdks } from "@strata-foundation/react";
import { SplTokenCollective } from "@strata-foundation/spl-token-collective";
import { SplTokenBonding } from "@strata-foundation/spl-token-bonding";
import { PublicKey } from "@solana/web3.js";
import { AlertTitle, Button } from "@chakra-ui/react";
import { ExponentialCurveConfig } from "@strata-foundation/spl-token-bonding";
import mitt from "next/dist/shared/lib/mitt";

export interface ITokenState {
  tokenRef?: PublicKey;
  tokenBonding?: PublicKey;
}

async function create(setMRef: any,name: string, tick: string, tokenCollectiveSdk: SplTokenCollective, tokenBondingSdk: SplTokenBonding): Promise<ITokenState> {
 var collective = new PublicKey("B5pFg6U4PRqosNNShoP5j6qB2gbocuk8H6izKq3zk7mr");
 var curve = new PublicKey("DoSQAYPx3DCS79xDBLHFk5iSZT47TeemSQj71V3sYvDe");
 var { ownerTokenRef, tokenBonding } = await tokenCollectiveSdk.createSocialToken({
  isPrimary: true, // Creates a social token explicitly associated with the collective by pda, instead of the wallet alone.
 collective,
  metadata: {
    name: name,
    symbol: tick,
    uri: "https://raw.githubusercontent.com/luvfreedom/strata-marketplace/master/json.json",
  },
  ignoreIfExists: true, // If a Social Token already exists for this wallet, ignore.
  tokenBondingParams: {
    curve,
    buyBaseRoyaltyPercentage: 5,
    buyTargetRoyaltyPercentage: 5,
    sellBaseRoyaltyPercentage: 5,
    sellTargetRoyaltyPercentage: 5
  }
});
if (ownerTokenRef){
setMRef("Yuor token is " + ownerTokenRef.toBase58() + " and 2nd key is " + tokenBonding?.toBase58() + " - share this with others to let them trade your tokens. Or not")
}
//var tokenBondingAcct = await tokenBondingSdk.getTokenBonding(tokenBonding);
//var ownerTokenRefAcct = await SplTokenCollective.getTokenRef(ownerTokenRef);

return {
    tokenRef:  ownerTokenRef,
    tokenBonding: tokenBonding!
  }
}


export function CreateButton({ setTokenState }: { setTokenState: (state: ITokenState) => void }) {
  const { tokenCollectiveSdk, tokenBondingSdk  } = useStrataSdks();
  const [ name, setName ] = useState("<3 Freedom");;
  const [ tick, setTick ] = useState("FREE");
  const [ mRef, setMRef ] = useState("");
  const [ first, setFirst ] = useState(true);
  function change(event: any) {    setName(event.target.value);  }
  function change2(event: any) {    setTick(event.target.value);  }

  return (<div><Button
    onClick={async () => {
      if (SplTokenCollective) {
        setTokenState(await create(setMRef, name, tick, tokenCollectiveSdk as SplTokenCollective, tokenBondingSdk as SplTokenBonding))
      }
    }}
  >
   (Click here to reload your token, if you have one already :) )
  </Button><h1>{mRef}</h1>No deplatforming, no censorship, no cancelling. No demonetization. This token is yours to control.<br /><br /><label>Hi there! I am an incredibly angry developer buried somewhere in the mountains plains or some other teeny tiny corner of the great white nonrth. <br /> <br />I want to help. <br /> <br /> You&apos;re creating an I Love Freedom token - of your very own. Once it&apos;s created, it can be minted by anyone - whenever anyone buys, sells, mints or otherwise transfers your tokens in the future you will keep a 10% royalty on those transactions.<br />
  <br /> The name and symbol can be edited.<br /> <br /> Symbols are meant to be short, easy-to-remember letters for your longer name - like stock tickers (FB for Facebook, GOOGL for Google, MSFT for Microsoft.. etc)<br /></label><label>All of ths is happening on the Solana blockchain - you&apos;ll need a Solana wallet and some $SOL in order to pay the (minimal - dollar or two) fees for the transaction.</label><label>
  <br /> <br />
  Ideally the system would become a series of microeconomies where services and goods are priced by the vendor or provider, and we no longer need $Canadian or any fiat ever again.
    <br /> <br />This code originates from Strata Foundation and Team Wumbo, but this implementation has a few key characterstics that make it maybe more advantageous for some:
    <br /> <br /> 1. it is very censorship-resistent - especially in the sense that you cannot be deplatformed, and will become moreso over time. The one drawback of Team  Wumbo&apos;s pioneering work is that they built the interface on top of and depending on Twitter - and the publishers (platforms?) tend to interfere with certain accounts.
    <br /> <br /> 2. the other (people)-in-the-middle have a much harder time levering that point of failure in #1 to censor you.
    <br /><br /> 3. we&apos;ve basically already said this twice now, but it&apos;s worth emphasizing: there is no cancelling on this platform. Moreover, if someone were to trigger the response of Twitter and they had some $ in Wumbo, those Wumbo users can seamlesly transfer into the FREE collective. Yay blockchain!
    <br /> <br /> 4. Perhaps a better way to say &apos;no demonetization&apos; is &apos;far better monetization.&apos; Every transaction using your tokens pays you a royalty - indefinitely, in perpetuity, forever.
     <br /><br /> Hey remember when every b- or c-grade website had a little maintenance sign and a warning &apos;this site is under construction?&apos; yeah I do not understand how to do proper user interfaces - so this place is functional yet ugly, and stuff like a little short link to share your token&apos;s trade page with - I literally through this together in a few hours cuz I learned my family member hospitalzed, may not get out, and if I get my shot Tuesday it&apos;s something like 2-4 weeks before I can visit and they may not be around then.  
     <br /><br /> Now, I&apos;ve since learned that most all y&apos;all probably only need this website you&apos;re seeing now once. If you don&apos;t ever have a problem with censorship, and you go link this wallet to wumbo extension on twitter (https://wum.bo) the shit just works - displays on your profile, buy n sell tokens.. but we&apos;re different cuz we&apos;re FREE. 
 
          <br /> <br /> Name:
         <br />
          <input type="text" value={name} onChange={change} />        </label>
         <br />
         <br />
          <label>
          Symbol:
         <br />
          <input type="text" value={tick} onChange={change2} />        </label>
         <br /> 
          <Button
    onClick={async () => {
      if (SplTokenCollective && !name.includes('<3')) {
        setTokenState(await create(setMRef, name, tick, tokenCollectiveSdk as SplTokenCollective, tokenBondingSdk as SplTokenBonding))
      }
      else if (SplTokenCollective){
        alert ('please rename your token before publishing it :)')
      }
    }}
  >
    Tokenize!
  </Button>
 <img src="/wumbojare.PNG" /> 
  <br />
  <br />
  <br />
  <br />
  <br />
  </div>)
}
