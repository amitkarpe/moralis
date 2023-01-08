# Invest into portfolio

### Original Code: [SimpleSwap](https://github.com/MoralisWeb3/youtube-tutorials/tree/main/SimpleSwap)
- This code is using Moralis Auth, 1inch as DEX, wagmi for web3/ether framework
- It just exchange Matic with either wEth or USDC
- Video: [Create a Token Swap Dapp | Moralis, 1inch and WAGMI | Web3 Tutorial](https://youtu.be/FoQPUQIsxNo)
- 1inch API: [Swap](https://docs.1inch.io/docs/aggregation-protocol/api/swagger/)
- Old documents for [1inch Plugin by Moralis](https://v1docs.moralis.io/moralis-dapp/plugins) and [How to Program Token Swaps with 1inch Plugin](https://moralis.io/how-to-program-token-swaps-with-1inch-plugin/)
- Old code with 1inch plugin and portfolio buy option: [FOAN Portfolio](https://github.com/mytestlab123/foan-mutual-fund)

### Future plans:
- Current code: Swaping Matic into USDC or weth token using 1inch (Liquidity aggregation from multiple DEXes to ensure the best swap rates).
- Work in progress:
- Ability to buy multiple tokens (Portfolio) using restricted coins (USDC/USDT/DIA - stable coins or Maitc/Eth)
- Abiltiy to buy multiple tokens (Portfolio) by just one click. As of now multiple approvals are required.
- Ability to setup SIP or timebased feature, where user will setup time to invest into portfolio
- Ability to use smart contract to reduce GAS fees. Where one transaction will allow invest into portfolio.