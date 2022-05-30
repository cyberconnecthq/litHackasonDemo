/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x2c7ab16ca0e9b394fac9d2c3014ad99f786ceb3185413b10ab29ee84f219a932","balance":"1000000000000000000000"},{"privateKey":"0xe21ebb14288ce2da74522a6592a14f431bddd68b546bbcc9608c9214177451a3","balance":"1000000000000000000000"},{"privateKey":"0x744fccaa014c1ef1467c1928a1d05498ba365d9d69191c19364074fdfba441e3","balance":"1000000000000000000000"},{"privateKey":"0x2fe42e6f58d457e068227641f8b13eee9accdf1aac2c480cfdad9fb1c7b4c459","balance":"1000000000000000000000"},{"privateKey":"0x0565d421d6e7219b23f1c611ce4c997ce3ffce33a6536ccb267aa0665caeb71c","balance":"1000000000000000000000"},{"privateKey":"0xf532402bab9bc1ef292d2443b309f691a0fec926abaaa12aa3f810d155e74a12","balance":"1000000000000000000000"},{"privateKey":"0x6a3013ab4b5b005a2dd4d0ad9898dc2a6e1a2ed3ebfa9a179dd62107bd7c9483","balance":"1000000000000000000000"},{"privateKey":"0xad9d9b2a63fa41804c394ab921b909c016531e1c7a9b8efb3e6482cfd69a8759","balance":"1000000000000000000000"},{"privateKey":"0x8ef7f21928864ce53f8e6142481ca54133747cb0f2ac17027afdb80883549a2f","balance":"1000000000000000000000"},{"privateKey":"0xefd0914f849e6df864694fc235b41d018db54e0148efaaf6c9e4bf2bc9a067ce","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};