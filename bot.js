const abi = require("./abi.json");
const { token } = require('./config.json');
const ethers = require('ethers');

// const { Client, Intents, MessageEmbed, MessageAttachment } = require('discord.js');
require('dotenv').config();

const network = {
  name: "gnosis",  // replace this with the network your contract is on
  chainId: 100,     // replace this with the ChainID your contract is on
  _defaultProvider: (providers) => new providers.JsonRpcProvider(process.env.ALCHEMY_URL)
};

const provider = ethers.getDefaultProvider(network);
const signer = provider.getSigner();

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
  console.log('Ready!', Date.now());


  const discordChannel = client.channels.cache.get('1013609729135751190');


// replace 0x86935F11C86623deC8a25696E1C19a8659CbF95d with the smart contract address you wish to monitor
const Event = new ethers.Contract('0xE0F9109dD559194a2400e234972B9292ba8b30d1', abi, signer);


Event.on("Log", async (sender) => {
  console.log("Log", sender);

  discordChannel.send(
    `Hello ${sender}`
  );
//  const lendingInfo = await Event.test();
//  console.log("lendingInfo", lendingInfo);
});

});

client.login(token);