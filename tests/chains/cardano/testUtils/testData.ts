class testData {
    static tx = {
        "tx_hash": "cf32ad374daefdce563e3391effc4fc42eb0e74bbec8afe16a46eeea69e3b2aa",
        "inputs": [
            {
                "payment_addr": {
                    "bech32": "addr_test1vzg07d2qp3xje0w77f982zkhqey50gjxrsdqh89yx8r7nasu97hr0",
                    "cred": "90ff35400c4d2cbddef24a750ad7064947a2461c1a0b9ca431c7e9f6"
                },
                "stake_addr": null,
                "tx_hash": "9f00d372e930d685c3b410a10f2bd035cd9a927c4fd8ef8e419c79b210af7ba6",
                "tx_index": 1,
                "value": "979445417",
                "asset_list": [
                    {
                        "policy_id": "ace7bcc2ce705679149746620de3a84660ce57573df54b5a096e39a2",
                        "asset_name": "646f6765",
                        "quantity": "10000000"
                    },
                    {
                        "policy_id": "ace7bcc2ce705679149746620de3a84660ce57573df54b5a096e39a2",
                        "asset_name": "7369676d61",
                        "quantity": "9999978"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "payment_addr": {
                    "bech32": "addr_test1vze7yqqlg8cjlyhz7jzvsg0f3fhxpuu6m3llxrajfzqecggw704re",
                    "cred": "b3e2001f41f12f92e2f484c821e98a6e60f39adc7ff30fb248819c21"
                },
                "stake_addr": null,
                "tx_hash": "cf32ad374daefdce563e3391effc4fc42eb0e74bbec8afe16a46eeea69e3b2aa",
                "tx_index": 0,
                "value": "10000000",
                "asset_list": [
                    {
                        "policy_id": "ace7bcc2ce705679149746620de3a84660ce57573df54b5a096e39a2",
                        "asset_name": "7369676d61",
                        "quantity": "10"
                    }
                ]
            },
            {
                "payment_addr": {
                    "bech32": "addr_test1vzg07d2qp3xje0w77f982zkhqey50gjxrsdqh89yx8r7nasu97hr0",
                    "cred": "90ff35400c4d2cbddef24a750ad7064947a2461c1a0b9ca431c7e9f6"
                },
                "stake_addr": null,
                "tx_hash": "cf32ad374daefdce563e3391effc4fc42eb0e74bbec8afe16a46eeea69e3b2aa",
                "tx_index": 1,
                "value": "969261084",
                "asset_list": [
                    {
                        "policy_id": "ace7bcc2ce705679149746620de3a84660ce57573df54b5a096e39a2",
                        "asset_name": "646f6765",
                        "quantity": "10000000"
                    },
                    {
                        "policy_id": "ace7bcc2ce705679149746620de3a84660ce57573df54b5a096e39a2",
                        "asset_name": "7369676d61",
                        "quantity": "9999968"
                    }
                ]
            }
        ]
    }

    static txMetaData = {
        "tx_hash": "cf32ad374daefdce563e3391effc4fc42eb0e74bbec8afe16a46eeea69e3b2aa",
        "metadata": {
            "0": {
                "to": "ergo",
                "bridgeFee": "10000",
                "networkFee": "10000",
                "toAddress": "ergoAddress",
                "targetChainTokenId": "cardanoTokenId"
            }
        }
    }
}

export { testData }
