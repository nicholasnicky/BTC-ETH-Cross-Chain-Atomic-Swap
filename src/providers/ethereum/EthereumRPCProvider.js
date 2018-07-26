import axios from 'axios'

import { prepareRequest, praseResponse } from '../JsonRpcHelper'

export default class EthereumRPCProvider {
  constructor (uri) {
    this.axios = axios.create({
      baseURL: uri,
      transformRequest: [({ data }, headers) => prepareRequest(data)],
      transformResponse: [(data, headers) => praseResponse(data, headers)],
      validateStatus: (status) => status === 200
    })
  }

  _rpc (method, ...params) {
    return this.axios.post('/', {
      data: { method, params }
    }).then(({ data }) => data)
  }

  async generateBlock (numberOfBlocks) {
    // Q: throw or silently pass?
    throw new Error('This method isn\'t supported by Ethereum')
  }

  async getBlockByNumber (blockNumber, includeTx) {
    return this._rpc('eth_getBlockByNumber', blockNumber, includeTx)
  }

  async getTransactionByHash (txHash) {
    return this._rpc('eth_getTransactionByHash', txHash)
  }
}
