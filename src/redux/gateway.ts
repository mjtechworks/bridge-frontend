import axios from "axios";
import {
  GetTransferConfigsResponse,
  MarkTransferRequest,
  GetTransferStatusRequest,
  GetTransferStatusResponse,
  TransferHistoryRequest,
  TransferHistoryResponse,
  ERC721TokenUriMetadata,
  NFTHistoryRequest,
  NFTHistoryResponse,
} from "../constants/type";

import {
  EstimateWithdrawAmtRequest,
  EstimateWithdrawAmtResponse,
  GetTokenBoundRequest,
  GetTokenBoundResponse,
  WithdrawLiquidityRequest,
  WithdrawLiquidityResponse,
} from "../proto/gateway/gateway_pb";
import { WebClient } from "../proto/gateway/GatewayServiceClientPb";

/* eslint-disable camelcase */
const preFix = { pathPrefix: process.env.REACT_APP_SERVER_URL }; // 域名
console.log("preFix", preFix);
const client = new WebClient(`${process.env.REACT_APP_GRPC_SERVER_URL}`, null, null);
export const getTransferConfigs = (): GetTransferConfigsResponse => {
  return {
    "chains": [{
      "id": 43113,
      "name": "Avalanche Fuji Testnet",
      "icon": "https://get.celer.app/cbridge-icons/chain-icon/Avalanche.png",
      "block_delay": 15,
      "gas_token_symbol": "AVAX",
      "explore_url": "https://testnet.snowtrace.io/",
      "rpc_url": "https://api.avax.network/ext/bc/C/rpc",
      "contract_addr": "0x26AFE867AdFa64E9A29C4d61CbA6d528E519739D",
    },
    {
      "id": 143,
      "name": "FoundationBlockchain",
      "icon": "https://get.celer.app/cbridge-icons/chain-icon/FLOW.png",
      "block_delay": 15,
      "gas_token_symbol": "FBC",
      "explore_url": "http://18.220.100.80:4000",
      "rpc_url": "https://18.220.100.80:8545/ext/bc/2K3dcYdbS5YQR6rFz9BZ2qvb7RJALQbMe2BLyDKorBXuHiGY8Z/rpc",
      "contract_addr": "0xD43dda8C7A07f07588C68f48e4068dDb35341cCb",
    }],
    "chain_token": {
      "43113": {
        "token": [
          {
            "token": {
              "symbol": "WFBC",
              "address": "0x8Fee8937465bB4fB5403D29d9Ee6f7BC5Cb33411",
              "decimal": 18,
              "xfer_disabled": false,
            },
            "name": "Wrapped FBC",
            "icon": "https://get.celer.app/cbridge-icons/CRA.png",
            "max_amt": "10000",
          },
        ],
      },
      "143": {
        "token": [
          {
            "token": {
              "symbol": "WFBC",
              "address": "0xdA3FF497a11E209e4Ab1eE928fb5ab6875753761",
              "decimal": 18,
              "xfer_disabled": false,
            },
            "name": "Wrapped FBC",
            "icon": "https://get.celer.app/cbridge-icons/CRA.png",
            "max_amt": "10000",
          },
        ],
      },
    },
    "farming_reward_contract_addr": "",
    "pegged_pair_configs": [    
    ]
  }
}

export const estimateWithdrawAmt = (reqParams: EstimateWithdrawAmtRequest): Promise<EstimateWithdrawAmtResponse> => {
  return client.estimateWithdrawAmt(reqParams, null);
};
export const getTokenBound = (reqParams: GetTokenBoundRequest): Promise<GetTokenBoundResponse> => {
  return client.getTokenBound(reqParams, null);
};
export const markTransfer = (params: MarkTransferRequest) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/v1/markTransfer`, {
      ...params,
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("error=>", e);
    });
};

export const getTransferStatus = (params: GetTransferStatusRequest): Promise<GetTransferStatusResponse> => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/v1/getTransferStatus`, {
      ...params,
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("error=>", e);
    });
};

export const withdrawLiquidity = (reqParams: WithdrawLiquidityRequest): Promise<WithdrawLiquidityResponse> => {
  return client.withdrawLiquidity(reqParams, null);
};

export const transferHistory = (reqParams: TransferHistoryRequest): Promise<TransferHistoryResponse> =>
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/v1/transferHistory`, {
      params: {
        ...reqParams,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("error=>", e);
    });

export const checkTransferHistory = (reqParams: TransferHistoryRequest): Promise<TransferHistoryResponse> =>
  axios
    .get(`${process.env.REACT_APP_SERVER_URL_CHECK}/v1/transferHistory`, {
      params: {
        ...reqParams,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("error=>", e);
    });

// eslint-disable-next-line
export const getNFTBridgeChainList = (): Promise<any> =>
  axios
    .get(`${process.env.REACT_APP_NFT_CONFIG_URL}`)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("error=>", e);
    });

export const getTokenUriMetaDataJson = (tokenUri: string): Promise<ERC721TokenUriMetadata | undefined> =>
  axios
    .get(tokenUri)
    .then(res => {
      return res.data as ERC721TokenUriMetadata;
    })
    .catch(e => {
      console.log("error=>", e);
      return undefined;
    });

// eslint-disable-next-line
export const getNFTList = (nftAddress: string, chainId: number, userAddress: string): Promise<any> =>
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/nftbr/own/${userAddress}/${chainId}/${nftAddress}`)
    .then(res => {
      return { addr: nftAddress, data: res.data };
    })
    .catch(e => {
      console.log("error=>", e);
    });

export const nftHistory = (address: string, reqParams: NFTHistoryRequest): Promise<NFTHistoryResponse> =>
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/nftbr/history/${address}`, {
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Content-Type": "application/json",
      // },
      params: {
        ...reqParams,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("error=>", e);
    });
