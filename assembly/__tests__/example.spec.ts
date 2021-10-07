import * as contract from "..";

describe("contract", () => {
  it("should return 'hello world!'", () => {
    expect(contract.hello_world()).toBe("hello world!");
  })
})