const anchor = require("@anchor-lang/core");

describe("rhythmforge", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.rhythmforge;
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
