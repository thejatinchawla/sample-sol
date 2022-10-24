require("dotenv").config()
const ethers = require("ethers")
const fs = require("fs-extra")

async function main() {
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    let wallet = new ethers.Wallet(process.env.PVT_KEY,provider)
    
    const abi = fs.readFileSync("./Sample_sol_Land.abi", "utf8")
    const binary = fs.readFileSync(
        "./Sample_sol_Land.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)
    await contract.store("7")
    const favNumber = await contract.favNumber()
    console.log(`favourite number is : ${favNumber.toString()}`)
    
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})