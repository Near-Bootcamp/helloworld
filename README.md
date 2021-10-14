# How To Write Smart Contract With Typescript, Part 1 - Hello World

## Introduction 

In this tutorial, we are going to create, test and deploy an AssemblyScript smart contract on testnet of NEAR protocol.

If you're asking yourself what is AssemblyScript, let me explain. AssemblyScript is a a variant of TypeScript that compiles to WebAssembly (Wasm). If you read technology news you may have read about Wasm. According to MDN, WebAssembly is a new type of code that can be run in modern web browsers. You can read more about WebAssembly in [this article](https://developer.mozilla.org/en-US/docs/WebAssembly) by MDN.

WebAssembly is used by many next generation blockchain protocols like NEAR, Solana, Polkadot, etc. as runtime environment for their smart contract.

Now lets talk about NEAR protocol. What is NEAR protocol? NEAR is a decentralized application (dApp) platform designed to provide the ideal environment for dapps by overcoming some of the limitations of competing systems—such as low throughput, low speeds, and poor cross-compatibility. 

Why are we using NEAR protocol for this tutorial? Becuase NEAR give us option to write smart contract in AssemblyScript. As I explained it previously it's a variant of TypeScript so if you're familiar with TypeScript you are good to go.

## Prerequisites

To follow along with this tutorial, you need to know basic TypeScript or JavaScript. You also need NodeJS installed on your machine.

If you don't have NodeJS, click [here](https://nodejs.org/en/download/) and install LTS version on your machine.

## Setting Up The Project

Now, We are going to create a project from scratch.

To get started, create `helloworld` directory. Start your code editor and open the directory we created just now in it.

Open the terminal. Here we will initialize a new node module:

```bash
yarn init -y
```

Now install `near-sdk-as` as a dev dependency using `yarn`:
```bash
yarn add -D near-sdk-as
```

`near-sdk-as` is required for creating `.wasm` binary file which is compatible with NEAR protocol.

Before going any further, we should add scripts inside package.json. We will use these in future.
```json
"scripts": {
    "build": "asb",
    "test": "asp --nologo"
}
```

Lets create the configuration file for our AssemblyScript compiler.

```bash
touch asconfig.json
```

We are not going to write a custom configuration for our project. Instead we are going to use configuration provided in the SDK. Paste the following snippet in `asconfig.json`:
```json
{
    "extends": "near-sdk-as/asconfig.json"
}
```

Now we have to create `assembly` directory. `assembly` holds the AssemblyScript sources being compiled to WebAssembly.
```bash
mkdir assembly
```

AssemblyScript compiler expects an `index.ts` in `assembly` directory which will be the entry file.

```bash
touch assembly/index.ts
```

We also have to add a `tsconfig.json` inside assembly directory. We are going inherit configuration file from `assemblyscript` package which is installed when we installed `near-sdk-as`.

```bash
touch assembly/tsconfig.json
```

Add following code snippet in the `tsconfig.json`;

```json
{
    "extends": "assemblyscript/std/assembly.json"
}
```

Now we have set up the project, let's write our smart contract. 

## Writing Our First Smart Contract

We are going to write our smart contract in `index.ts` which is entry file for the AssemblyScript project. Now add the following code snippet in the `assembly/index.ts`:

```js
export function hello_world(): string {
    return "hello world!"
}
```
That's it. This is our hello world smart contract.

When you export in function it becomes public function of the smart contract. If you don't use `export` then it becomes private function.

While writing the function, you have to give the return type otherwise it will throw in while compiling.

## Writing Our First Test

Before writing tests, we have to set up a few things. Run following command in terminal:

```bash
yarn test --init
```

We are using `as-pect` package to do the unit tests for our AssemblyScript smart contract. This will autogenerate some files for us.

We have to modify `as-pect.config.js` to our requirements. Remove all content of the file and add following snippet:
```js
module.exports = require("near-sdk-as/imports");
```

We are just using predefined configuration. This connects our unit tests to dummy VM which acts as the protocol while testing.

We will write unit tests for our smart contract. Remove all the content in `assmebly/__test__/example.spec.ts` and add the following tests:

```js
import * as contract from "..";

describe("contract", () => {
  it("should return 'hello world!'", () => {
    expect(contract.hello_world()).toBe("hello world!");
  })
})
```
We are importing `index.ts` as contract and checking if it returns string "hello world!". To test the function, we are passing actual value as a parameter to `expect` function and comparing it with acutal value using `.toBe()` assertion.

You can read more about `as-pect` in [its documentation](https://tenner-joshua.gitbook.io/as-pect/).

## Deploying The Contract

Now that we have written the smart contract, we have to deploy it. To do that we have to build the `wasm` binary. Run following command in the terminal:

```bash
yarn build
```

This will create `build` directory and our binary is in `release`. We will be deploy this binary on NEAR testnet.

You need to have NEAR testnet account for this. You can create it by going to [testnet wallet](https://wallet.testnet.near.org/).

To deploy smart contract, we will be using `near-cli`. We need to install:

```bash
yarn global add near-cli
```

To deploy smart contract from CLI, we need to store keys for your account locally. To do that run following command in terminal:
```bash
near login
```
This will redirect you to NEAR Wallet requesting full access to your account. From here, select which account you would like an access key to. Then click allow, you will be asked to confirm this authorization by entering the account name. Once complete, you will now have your Access Key stored locally.

Next step, deploy the smart contract (replace YOUR_ACCOUNT_ID with your testnet account, ex. arwin.testnet):
```bash
near deploy --accountId YOUR_ACCOUNT_ID --wasmFile ./build/release/helloworld.wasm
```
We have deployed smart contract on NEAR testnet. This command deploys smart contract on given accountId. Every account can have one smart contract assosiated with it. Here we have deplyed smart contract to your account.

## Interacting With Smart Contract From Command Line

Now that we have deployed our contract on testnet. Let's learn how to interact with any smart contract from the command line.

To call `hello_world` function of a smart contract, type following command in the terminal:

```bash
near view YUR_ACCOUNT_ID hello_world '{}' 
```
output
```bash
View call: <YOUR_ACCOUNT_ID>.hello_world({})
'hello world!'
```

# Conclusion

In this tutorial, we have looked at basics of smart contract development with Assmeblyscript. We have used testnet of NEAR protocol to deploy that contract and learned some new things.

This is first tutorial in a series. Please stay tuned for the next one.

If you have any doubt about NEAR protocol or smart contract development, you can ask it in the [official discord server](https://discord.gg/wpa49JhC). If you're interested in learning more can go to bootcamp conducted by [NEAR foundation](https://learnnear.club/?mref=0xnik.near%40learnnear.club).

Also, any feedback or improvment in this article is appreciated. If you have any go in this repo and create an issue.
