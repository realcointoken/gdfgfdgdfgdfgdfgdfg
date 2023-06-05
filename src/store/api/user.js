// import Web3 from 'web3';
import tokenAbi from 'human-standard-token-abi'

export default class User {
  static async fetchUserTokenBalance(tokenAddress, accountAddr) {
    if (tokenAddress && accountAddr) {
      const contract = new window.web3.eth.Contract(tokenAbi, tokenAddress)
      return await contract.methods
        .balanceOf(accountAddr)
        .call()
        // .then((data) => data)
    }
  }

  static fetchTokenDecimals(tokenAddress) {
    const contract = new window.web3.eth.Contract(tokenAbi, tokenAddress)

    return contract.methods
      .decimals()
      .call()
      .then((data) => data)
  }
}
