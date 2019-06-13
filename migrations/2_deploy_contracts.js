const SafeMath = artifacts.require("./common/SafeMath.sol");
const OilT = artifacts.require("./OilT.sol");

module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {

        let math = await deployer.deploy(SafeMath, {overwrite: false});

        await deployer.link(SafeMath, [OilT]);

        let token = await deployer.deploy(OilT,
            process.env.NAME,
            process.env.SYMBOL,
            process.env.EMISSION);

        //await token.transferOwnership(process.env.OWNER);
    });
};