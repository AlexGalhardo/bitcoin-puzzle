import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import { promises as fs } from "fs";

const ECPair = ECPairFactory(ecc);

async function checkBalance(address: string): Promise<number> {
	const url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.final_balance / 100000000;
	} catch (error) {
		console.error(`Error checking balance for address ${address}:`, error);
		return 0;
	}
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function appendToJSONFile(filename: string, data: any) {
	try {
		let fileData;
		try {
			fileData = await fs.readFile(filename, "utf8");
			fileData = JSON.parse(fileData);
		} catch (err) {
			fileData = [];
		}

		fileData.push(data);
		await fs.writeFile(filename, JSON.stringify(fileData, null, 2));
	} catch (err) {
		console.error("Error writing to JSON file:", err);
	}
}

async function findPrivateKey(startKeyHex: string, stopKeyHex: string) {
	let currentKey = BigInt(`0x${startKeyHex}`);
	const stopKey = BigInt(`0x${stopKeyHex}`);
	const filename = "bitcoin_address_tested.json";

	while (currentKey <= stopKey) {
		const currentKeyHex = currentKey.toString(16).padStart(64, "0");
		const keyPair = ECPair.fromPrivateKey(Buffer.from(currentKeyHex, "hex"));
		const privateKey = keyPair.privateKey!.toString("hex");
		const publicKey = keyPair.publicKey.toString("hex");
		const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

		const balance = await checkBalance(String(address));

		const data = { public_key: publicKey, private_key: privateKey, bitcoin_address: address, balance };
		await appendToJSONFile(filename, data);

		console.log(`...Testing address: ${address} -> balance: ${balance} BTC`);

		currentKey++;
		await delay(2000);
	}
}

const startKeyHex = "0000000000000000000000000000000000000000000000040000000000000000";
const stopKeyHex = "000000000000000000000000000000000000000000000007ffffffffffffffff";

findPrivateKey(startKeyHex, stopKeyHex)
	.then(() => console.log("Search completed"))
	.catch((error) => console.error("Error searching for private key:", error));
