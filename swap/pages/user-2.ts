import { getSession, signOut } from "next-auth/react";
import Moralis from "moralis";
import { useState } from "react";
import axios from "axios";
import { useSendTransaction } from "wagmi";

let MATIC = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
let USDC  = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
let USDT  = '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'
let DAI   = '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'
let buyToken;
const fund = new Map([
    // ['FTM','0xb85517b87bf64942adf3a0b9e4c71e4bc5caa4e5']
    ['ONE','0x80c0cbdb8d0b190238795d376f0bd57fd40525f2']
    // ['ATOM','0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b'],
    // ['NEAR','0x72bd80445b0db58ebe3e8db056529d4c5faf6f2f'],
  ]);
  


function User({ user, balance }) {
  const [fromToken] = useState("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
  const [toToken, setToToken] = useState(
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  ); //USDC ERC20 Contract
  const [value, setValue] = useState("1000000000000000000");
  const [valueExchanged, setValueExchanged] = useState("");
  const [valueExchangedDecimals, setValueExchangedDecimals] = useState(1e18);
  const [to, setTo] = useState("");
  const [txData, setTxData] = useState("");

  // async function get1inchSwap(toToken,tokenValue){
  //   const tx = await axios.get(`https://api.1inch.io/v4.0/137/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${tokenValue}&fromAddress=${user.address}&slippage=5`);    
  //   console.log(tx.data)
  //   setTo(tx.data.tx.to);
  //   setTxData(tx.data.tx.data);
  //   setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
  //   setValueExchanged(tx.data.toTokenAmount);
  //   }

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
      request: {
          from: user.address,
          to: String(to),
          data: String(txData),
          value: String(value),
      },
  })
 
  async function processBuy(toToken,tokenValue){
    // let toToken = buyToken;
    console.log("value==>",tokenValue);
    // fund.forEach {
    //     console.log(key + ' = ' + tokenAddress);
    //     // console.log(parseFloat(value)/fund.size);
    //     // get1inchSwap(tokenAddress,parseFloat(value)/fund.size);
    //     var receipt = await processBuy(tokenAddress, parseFloat(value) / fund.size);
    //   })
      let processOne = new Promise((resolve, reject) => {
      const tx = await axios.get(`https://api.1inch.io/v4.0/137/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${tokenValue}&fromAddress=${user.address}&slippage=5`);    
      console.log(tx.data)
      setTo(tx.data.tx.to);
      setTxData(tx.data.tx.data);
      setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
      setValueExchanged(tx.data.toTokenAmount);
      
      sendTransaction();
      console.log(data);
      if (!isSuccess) {
        setTimeout(() => resolve(toToken, 2000));
      }
    });
    let result = await processOne;
    console.log(result);
  }

    

  async function invest(){
    // alert("Please confirm " + fund.size + " transactions using your metamask wallet.");
    // fund.forEach (async function (tokenAddress, key) {
    //     console.log(key + ' = ' + tokenAddress);
    //     // console.log(parseFloat(value)/fund.size);
    //     // get1inchSwap(tokenAddress,parseFloat(value)/fund.size);
    //     var receipt = await processBuy(tokenAddress, parseFloat(value) / fund.size);
    //   })

        // var receipt = await doSwap1(trade, address, amount/fund.size, value);
        // token += key + ' = ' + value + "<br />";
    // document.getElementById("result").innerHTML = token
    // alert("Investment / transaction started verify using Polygon Scan: https://polygonscan.com/tokentxns?a=" + address );
  }
 

  function changeToToken(e){
    setToToken(e.target.value);
    setValueExchanged("");
  }

  function changeValue(e){
    setValue(e.target.value * 1E18);
    setValueExchanged("");
  }


  return (
    <div>
      <div>User: {user.address}</div>
      <div>Your Matic Balance: {(balance.balance / 1e18).toFixed(3)}</div>
      <select>
        <option value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">
          MATIC
        </option>
      </select>
      <input
        onChange={(e) => changeValue(e)}
        value={value / 1e18}
        type="number"
        min={0}
        max={balance.balance / 1e18}
      ></input>
      <br />
      <br />
      <select name="toToken" value={toToken} onChange={(e) => changeToToken(e)}>
        <option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">WETH</option>
        <option value="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174">USDC</option>
      </select>
      <input
        value={
          !valueExchanged
            ? ""
            : (valueExchanged / valueExchangedDecimals).toFixed(5)
        }
        disabled={true}
      ></input>
      <br />
      <br />
      <button onClick={invest}>invest</button>
      {/* <button onClick={get1inchSwap}>Get Conversion</button>
      <button disabled={!valueExchanged} onClick={sendTransaction}>Swap Tokens</button> */}
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      <br />
      <br />
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const response = await Moralis.EvmApi.account.getNativeBalance({
    address: session.user.address,
    chain: 0x89,
  });

  return {
    props: { user: session.user, balance: response.raw },
  };
}

export default User;
