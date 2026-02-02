/*
/// Module: my_nft
module my_nft::my_nft;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// TODO: consider renaming this to `example_nft`
/// A minimalist example to demonstrate how to create an NFT like object
/// on Sui.
module 0x0::devnet_nft {
    use std::string;
    use sui::event;
    use sui::url::{Self, Url};

    /// An example NFT that can be minted by anybody
    public struct DevNetNFT has key, store {
        id: UID,
        /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        url: Url,
        // TODO: allow custom attributes
    }

    public struct MintNFTEvent has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: string::String,
    }

    /// Create a new devnet_nft
    public fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext,
    ): DevNetNFT {
        let sender = tx_context::sender(ctx);

        let nft = DevNetNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
        };

        event::emit(MintNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            creator: sender,
            name: nft.name,
        });

        nft
    }

    /// Update the `description` of `nft` to `new_description`
    public fun update_description(nft: &mut DevNetNFT, new_description: vector<u8>) {
        nft.description = string::utf8(new_description)
    }

    /// Permanently delete `nft`
    public fun burn(nft: DevNetNFT) {
        let DevNetNFT { id, name: _, description: _, url: _ } = nft;
        object::delete(id)
    }

    /// Get the NFT's `name`
    public fun name(nft: &DevNetNFT): &string::String {
        &nft.name
    }

    /// Get the NFT's `description`
    public fun description(nft: &DevNetNFT): &string::String {
        &nft.description
    }

    /// Get the NFT's `url`
    public fun url(nft: &DevNetNFT): &Url {
        &nft.url
    }
}

#[test_only]
module 0x0::devnet_nftTests {
    use 0x0::devnet_nft::{Self, DevNetNFT};
    use std::string;
    use sui::test_scenario as ts;
    use sui::transfer;

    public struct Sword has key, store {
        id: UID,
        magic: u64,
        strength: u64,
    }

    public fun magic(sword: &Sword): u64 {
        sword.magic
    }

    public fun strength(sword: &Sword): u64 {
        sword.strength
    }

    #[test]
    fun test_sword_create() {
        // Remove ctx parameter
        let mut ctx = tx_context::dummy();
        let sword = Sword {
            id: object::new(&mut ctx),
            magic: 42,
            strength: 7,
        };
        assert!(sword.magic() == 42 && sword.strength() == 7, 1);

        let Sword { id, magic: _, strength: _ } = sword;
        object::delete(id);
    }

    // fun mint_transfer_update() {
    //     let addr1 = @0xA;
    //     let addr2 = @0xB;
    //     // create the NFT
    //     let scenario = ts::begin(addr1);
    //     {
    //         devnet_nft::mint(b"test", b"a test", b"https://www.sui.io", ts::ctx(&mut scenario))
    //     };
    //     // send it from A to B
    //     ts::next_tx(&mut scenario, addr1);
    //     {
    //         let nft = ts::take_from_sender<DevNetNFT>(&scenario);
    //         transfer::public_transfer(nft, addr2);
    //     };
    //     // update its description
    //     ts::next_tx(&mut scenario, addr2);
    //     {
    //         let nft = ts::take_from_sender<DevNetNFT>(&scenario);
    //         devnet_nft::update_description(&mut nft, b"a new description");
    //         assert!(*string::bytes(devnet_nft::description(&nft)) == b"a new description", 0);
    //         ts::return_to_sender(&scenario, nft);
    //     };
    //     // burn it
    //     ts::next_tx(&mut scenario, addr2);
    //     {
    //         let nft = ts::take_from_sender<DevNetNFT>(&scenario);
    //         devnet_nft::burn(nft)
    //     };
    //     ts::end(scenario);
    // }
}
