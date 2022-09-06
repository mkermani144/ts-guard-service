import axios from "axios";
import { BlockHeaders, ErgoStateContext, PreHeader } from "ergo-lib-wasm-nodejs";
import { ErgoBlockHeader } from "../models/Interfaces";
import ErgoConfigs from "../helpers/ErgoConfigs";


class NodeApi {

    static nodeClient = axios.create({
        baseURL: ErgoConfigs.node.url,
        timeout: ErgoConfigs.node.timeout * 1000,
        headers: {"Content-Type": "application/json"}
    });

    /**
     * gets blockchain height
     */
    static getHeight = async (): Promise<number> => {
        return this.nodeClient.get<{ fullHeight: number }>("/info")
            .then(info => info.data.fullHeight)
            .catch(e => {
                console.warn(`An error occurred while getting blockchain height: ${e}`)
                throw e
            })
    }

    /**
     * gets 10 last blocks of blockchain
     */
    static getLastBlockHeader = (): Promise<ErgoBlockHeader[]> => {
        return this.nodeClient.get<ErgoBlockHeader[]>("/blocks/lastHeaders/10")
            .then(res => res.data)
            .catch(e => {
                console.warn(`An error occurred while getting last block header: ${e}`)
                throw e
            })
    }

    /**
     * returns state context object of blockchain using 10 last blocks
     */
    static getErgoStateContext = async (): Promise<ErgoStateContext> => {
        const blockHeaderJson = await this.getLastBlockHeader();
        const blockHeaders = BlockHeaders.from_json(blockHeaderJson);
        const preHeader = PreHeader.from_block_header(blockHeaders.get(0));
        return new ErgoStateContext(preHeader, blockHeaders);
    }

    /**
     * sending a transaction(json) to the network
     */
    static sendTx = (txJson: string): Promise<string | void> => {
        return this.nodeClient.post<string>("/transactions", txJson)
            .then(response => response.data)
            .catch(e => {
                console.warn(`An error occurred while submitting transaction to Node: ${e}`)
            })
    }


}

export default NodeApi
