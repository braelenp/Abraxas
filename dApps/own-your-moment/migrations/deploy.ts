import * as anchor from "@coral-xyz/anchor";

module.exports = async function deploy(provider: anchor.AnchorProvider) {
  anchor.setProvider(provider);
};
