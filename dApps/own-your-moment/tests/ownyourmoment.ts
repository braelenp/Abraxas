import * as anchor from "@coral-xyz/anchor";
import { assert } from "chai";

describe("ownyourmoment", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  it("connects to the provider and prepares the workspace", async () => {
    assert.isOk(provider.publicKey);
  });
});