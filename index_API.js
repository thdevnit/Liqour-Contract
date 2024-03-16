const {Web3} = require('web3');
require('dotenv').config();
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/GQ5JHbx4AryJFMElt3_WB1wJXI_fqAZx');
const privateKey = "0x35822f8c8d863c74679a7c8665510bc350d5d1ae4a45b81e73a33d506c344fe7";
const signer = web3.eth.accounts.privateKeyToAccount(privateKey);
const jwt = require('jsonwebtoken');


const express = require('express');
const app = express();
app.use(express.json());

const contractAddress = "0xFcb4806D6717eB8Dc0519bc9e1D74336eFb8fd12";
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_alcoholPerc",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "_rawMaterialUids",
				"type": "string[]"
			}
		],
		"name": "addBottle",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_uid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_purchaseDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_quality",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_supplier",
				"type": "address"
			}
		],
		"name": "addRawMaterial",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "uId",
				"type": "bytes32"
			}
		],
		"name": "BottleAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "supplier",
				"type": "address"
			}
		],
		"name": "RawmaterialPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_uid",
				"type": "bytes32"
			}
		],
		"name": "getBottleDetailsByUid",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "uid",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "purchaseDate",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "qualityParam",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "supplier",
						"type": "address"
					}
				],
				"internalType": "struct Liquor.Raw_material[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "s_materials",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "purchaseDate",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "qualityParam",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "supplier",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const contractInstance = new web3.eth.Contract(abi, contractAddress);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}



app.post('/rawMaterial', authenticateToken, async(req, res) => {
    try {

        const {name, price, uid, quantity, purchaseDate, quality, supplier} = req.body;
        const encodedFunctionCall = contractInstance.methods.addRawMaterial(name,price,uid,quantity,purchaseDate,quality,supplier).encodeABI();
		const tx ={
			from: signer.address,
			to: contractAddress,
			gas: web3.utils.toHex(903081),
            gasPrice: await web3.eth.getGasPrice(),
            data: encodedFunctionCall,
			chainId: 11155111
		}

		const signedTx =  await web3.eth.accounts.signTransaction(tx,signer.privateKey);

		const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        // const receipt = await txHash.wait(); 
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/bottle', authenticateToken,async (req, res)=>{
try {
	const {name,price,alcoholPer,rawMaterialUids} = req.body;

const encodedFunctionCall = contractInstance.methods.addBottle(name,price,alcoholPer,rawMaterialUids).encodeABI();

const tx = {
	from: signer.address,
	to: contractAddress,
	gas: web3.utils.toHex(903081),
	gasPrice: await web3.eth.getGasPrice(),
	data: encodedFunctionCall,
	chainId: 11155111
}

const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);

const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

res.json({success: true});
} catch (error) {
	res.status(500).send(error.message);
}


})



app.get('/bottleDetails/:uid', authenticateToken,async(req,res)=>{
try {
	const uid = req.params.uid;
	const bottleDetails = await contractInstance.methods.getBottleDetailsByUid(uid).call();
 
	let bottle = [];
bottle[0] = bottleDetails[0];
bottle[1] = bottleDetails[1].toString();
bottle[2] = bottleDetails[2];
bottle[3] = bottleDetails[3].toString();
bottle[4] = bottleDetails[4].toString();
 // Serialize each element of bottleDetails[5]
 let serializedElements = [];
        bottleDetails[5].forEach(element => {
            let serializedElement = {};
            for (const [key, value] of Object.entries(element)) {
                serializedElement[key] = typeof value === 'bigint' ? value.toString() : value;
            }
            serializedElements.push(serializedElement);
        });

 bottle[5] = serializedElements;
bottle[6] = bottleDetails[6];

res.send(bottle);
} catch (error) {
	res.status(500).send(error.message);
}
	

})


app.post('/login', (req, res) => {
    // Authenticate user
    const {username} = req.body;
    const user = { username: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});



const port = 3000;
app.listen(port, () => {
    console.log("API server is listening on port 3000")
});




