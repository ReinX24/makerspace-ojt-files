/// Module: voting_system
/// Package_Address::Module_Name
module voting_system::dashboard;

use std::string::String;

// A struct is an object or class, has key is an interface import
public struct Proposal has key {
    id: UID,
    title: String,
    description: String,
    voted_yes_count: u64,
    voted_no_count: u64,
    expiration: u64,
    creator: address,
    // A vector is an array or a list
    voter_registry: vector<address>,
}

// This is a function
public fun create_proposal(
    title: String,
    description: String,
    expiration: u64,
    // &mut means the program can modify this variable
    ctx: &mut TxContext,
) {
    let proposal = Proposal {
        // ctx is an object containing information from the execution node
        id: object::new(ctx),
        title: title,
        description: description,
        voted_yes_count: 0,
        voted_no_count: 0,
        expiration: expiration,
        creator: ctx.sender(),
        voter_registry: vector[],
    };

    // This makes the object a shared object, which means anyone can access it
    // and modify it
    // It has been declared as a shared object because users can modify the yes
    // and no votes by voting
    transfer::share_object(proposal);
}
