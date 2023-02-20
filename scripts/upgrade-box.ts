import { ethers } from "hardhat"

async function main() {
    console.log("Checkpoint")
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    console.log("Checkpoint")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    console.log("Checkpoint")
    const proxyBoxV1 = await ethers.getContract("BoxV1", transparentProxy.address)
    console.log("Checkpoint")
    const versionV1 = await proxyBoxV1.version()
    console.log({ versionV1: versionV1.toString() })

    console.log("Checkpoint")
    const boxV2 = await ethers.getContract("BoxV2")
    console.log("Checkpoint")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    console.log("Checkpoint")
    const proxyBoxV2 = await ethers.getContract("BoxV2", transparentProxy.address)
    console.log("Checkpoint")
    const versionV2 = await proxyBoxV2.version()
    console.log({ versionV2: versionV2.toString() })
}

main()
    .then(async () => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
