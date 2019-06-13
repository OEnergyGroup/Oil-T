const OilT = artifacts.require("./OilT.sol");

contract("OilT test", async accounts => {

	it("Check starting distribution", async () => {
		let instance = await OilT.deployed();

	    let account_one = await instance.balanceOf.call(accounts[0]);
	    assert.equal(account_one.toNumber() / Math.pow(10,8), process.env.EMISSION);
	});

	it("should send token correctly", async () => {
		// Get initial balances of first and second account.
		let account_one = accounts[0];
		let account_two = accounts[1];

		let amount = 9781001 * Math.pow(10,8);

		let instance = await OilT.deployed();

		let balance = await instance.balanceOf.call(account_one);
		let account_one_starting_balance = balance.toNumber();

		balance = await instance.balanceOf.call(account_two);
		let account_two_starting_balance = balance.toNumber();
		await instance.transfer(account_two, amount);

		balance = await instance.balanceOf.call(account_one);
		let account_one_ending_balance = balance.toNumber();

		balance = await instance.balanceOf.call(account_two);
		let account_two_ending_balance = balance.toNumber();

		assert.equal(
			account_one_ending_balance,
			account_one_starting_balance - amount,
			"Amount wasn't correctly taken from the sender"
		);
		assert.equal(
			account_two_ending_balance,
			account_two_starting_balance + amount,
			"Amount wasn't correctly sent to the receiver"
		);
	});

	it("should burn token correctly", async () => {
		// Get initial balances of first account.
		let account_one = accounts[0];

		let amount = 12400701 * Math.pow(10,8);

		let instance = await OilT.deployed();

		let balance = await instance.balanceOf.call(account_one);
		let account_one_starting_balance = balance.toNumber();

		await instance.burn(amount);

		balance = await instance.balanceOf.call(account_one);
		let account_one_ending_balance = balance.toNumber();

		assert.equal(
			account_one_ending_balance,
			account_one_starting_balance - amount,
			"Amount wasn't correctly taken after burning"
		);
	});

	it("should mint token correctly", async () => {
		// Get initial balances of third account.
		let account_three = accounts[2];

		let amount = 999012 * Math.pow(10,8);

		let instance = await OilT.deployed();

		let balance = await instance.balanceOf.call(account_three);
		let account_three_starting_balance = balance.toNumber();

		await instance.mint(account_three, amount);

		balance = await instance.balanceOf.call(account_three);
		let account_three_ending_balance = balance.toNumber();

		assert.equal(
			account_three_ending_balance,
			account_three_starting_balance + amount,
			"Amount wasn't correctly taken after minting"
		);
	});
});