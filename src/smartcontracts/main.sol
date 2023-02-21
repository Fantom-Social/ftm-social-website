// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface IERC20 { //all basic erc-20 functions
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ERC20 is IERC20 { //Token Code
    string public constant name = "FSM Dao Token";
    string public constant symbol = "FSMD";
    uint8 public constant decimals = 18;
    address[] public holders = [address(0), msg.sender]; //For easy migration
    mapping(address => bool) public isHolder;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;
    uint256 totalSupply_ = 10000 ether;
    constructor() {
        lastCall = block.timestamp / 84600; //For Dao
        balances[msg.sender] = totalSupply_; //For Token 
        isHolder[msg.sender] = true;
        isHolder[address(0)] = true;
    }
    function getHolders() public view returns (address[] memory) { //for migration purposes
        return holders;
    }
    function totalSupply() public view override returns (uint256) {
        return totalSupply_;
    }
    function balanceOf(address tokenOwner) public view override returns (uint256) {
        return balances[tokenOwner];
    }
    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        if (isHolder[receiver] == false) {
            holders.push(receiver);
        }
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }
    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public view override returns (uint256) {
        return allowed[owner][delegate];
    }
    function transferFrom(address owner,address buyer,uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] = balances[owner] - numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }

    address[] internal addresses; //Social Media
    mapping(address => Profile) public profiles;
    mapping(address => address[]) internal followers;
    mapping(address => address[]) internal following;
    mapping(address => mapping(address => Array)) internal checkfollowing;
    mapping(address => mapping(address => Array)) internal checkfollowers;
    Post[] internal posts;
    struct Array {
        bool exists;
        uint256 index;
    }
    struct Profile {
        address owner;
        string name;
        uint256 timeCreated;
        uint256 id;
    }
    struct Post {
        address author;
        string content;
        uint256 timeCreated;
        uint256 id;
        bool harmful;
    }
    modifier senderHasProfile() {
        require(
            profiles[msg.sender].owner != address(0x0),
            "ERROR: <Must create a profile to perform this action>"
        );
        _;
    }
    modifier profileExists(address _address) {
        require(
            profiles[_address].owner != address(0x0),
            "ERROR: <Profile does not exist>"
        );
        _;
    }
    modifier notSelf(address _address) {
        require(
            msg.sender != _address,
            "ERROR <You cannot follow/unfollow yourself"
        );
        _;
    }
    modifier nonEmptyInput(string calldata _input) {
        require(
            keccak256(abi.encodePacked(_input)) !=
                keccak256(abi.encodePacked("")),
            "ERROR: <Input cannot be empty>"
        );
        _;
    }
    function createProfile(string calldata _name)
        external
        nonEmptyInput(_name)
        returns (address)
    {
        if (profiles[msg.sender].owner != msg.sender) {
            profiles[msg.sender] = Profile({
                owner: msg.sender,
                name: _name,
                timeCreated: block.number,
                id: addresses.length
            });
            addresses.push(msg.sender);
            return (address(0x0));
        } else {
            require(1 == 2, "You already created a profile");
            return profiles[msg.sender].owner;
        }
    }
    function follow(address _address)
        external
        senderHasProfile
        profileExists(_address)
        notSelf(_address)
    {
        if (checkfollowing[msg.sender][_address].exists == true) {}
        require(
            checkfollowing[msg.sender][_address].exists != true,
            "ERROR: <You already follow this profile>"
        );
        checkfollowers[_address][msg.sender] = Array(
            true,
            followers[_address].length
        );
        followers[_address].push(msg.sender);
        checkfollowing[msg.sender][_address] = Array(
            true,
            following[msg.sender].length
        );
        following[msg.sender].push(_address);
    }
    function unfollow(address _address)
        external
        senderHasProfile
        profileExists(_address)
        notSelf(_address)
    {
        require(
            checkfollowing[msg.sender][_address].exists == true,
            "ERROR: <You already do not follow this profile>"
        );
        delete followers[_address][checkfollowing[_address][msg.sender].index];
        checkfollowers[_address][msg.sender].exists = false;
        delete following[msg.sender][
            checkfollowing[msg.sender][_address].index
        ];
        checkfollowing[msg.sender][_address].exists = false;
    }
    function createPost(string calldata _content)
        external
        senderHasProfile
        nonEmptyInput(_content)
    {
        Post memory newPost = Post({
            author: msg.sender,
            content: _content,
            timeCreated: block.number,
            id: posts.length,
            harmful: false
        });
        posts.push(newPost);
    }
    function getPosts() external view returns (Post[] memory) {
        return posts;
    }
    function getUserCount() external view returns (uint256) {
        return addresses.length;
    }
    function getAddresses() external view returns (address[] memory) {
        return addresses;
    }
    function getFollowing(address _address) external view profileExists(_address) returns (address[] memory) {
        return following[_address];
    }
 function getFollowers(address _address) external view returns (address[] memory) {
        return followers[_address];
    }

    mapping(uint256 => uint256[]) closedProposalsByDay; //DAO
    mapping(uint256 => address[]) payOutsByDay;
    mapping(uint256 => mapping(uint256 => bool)) closedProposalsOutcomesByDay;
    uint256 public lastCall;
    struct Proposal {
        address reporter;
        uint256 id;
        uint256 deadline;
        string desc;
        uint256 postId;
    }
    mapping(uint256 => mapping(address => bool)) votedYes;
    mapping(uint256 => address[]) voters;
    Proposal[] public proposals;
    uint256[] unfinishedProposals;
    function newProposal(string memory _desc, uint256 postId) public payable {
        require(
            msg.value == 1000000000000000000,
            "You must deposit 1 FTM to participate."
        );
        voters[proposals.length].push(msg.sender);
        votedYes[proposals.length][msg.sender] = true;
        unfinishedProposals.push(proposals.length);
        proposals.push(
            Proposal(
                msg.sender,
                proposals.length,
                (block.timestamp + 24 hours),
                _desc,
                postId
            )
        );
    }
    function vote(bool support, uint256 id) public payable {
        require(
            msg.value == 1000000000000000000,
            "You must deposit 1 FTM to particiapte."
        );
        require(
            proposals[id].deadline >= block.timestamp,
            "Proposal has already ended."
        );
        voters[id].push(msg.sender);
        votedYes[id][msg.sender] = support;
    }
    bool internal locked;
    function execute() public {
        require(!locked, "No re-entrancy");
        locked = true;
        require(
            block.timestamp / 84600 >= lastCall,
            "Rewards have already been distributed in the last 24 hours."
        );
        for (uint256 a = lastCall; a < block.timestamp / 84600; a++) {
            //for each day not called yet
            for (uint256 b = 0; b < unfinishedProposals.length; b++) {
                //for each unfinished proposal
                if (proposals[unfinishedProposals[b]].deadline / 84600 == a) {
                    //if the proposal links to the day
                    closedProposalsByDay[a].push(
                        proposals[unfinishedProposals[b]].id
                    );
                }
            }
            for (uint256 c = 0; c < closedProposalsByDay[a].length; c++) {//for each closed proposal in the particular day
                uint256 votesForYes = 0;
                uint256 votesForNo = 0;
                uint256 tokensForYes = 0;
                uint256 tokensForNo = 0;
                for (uint256 d = 0; d < voters[closedProposalsByDay[a][c]].length; d++) {//for each voter in the proposal that is closed on a specific day
                    address[] storage addressesOfProposal = voters[closedProposalsByDay[a][c]];
                    if (votedYes[closedProposalsByDay[a][c]][addressesOfProposal[d]] == true) {
                        votesForYes++;
                        tokensForYes = tokensForYes + balanceOf(addressesOfProposal[d]);
                    } else {
                        votesForNo++;
                        tokensForNo = tokensForNo + balanceOf(addressesOfProposal[d]);
                    }
                }
                uint256 totalTokens = tokensForNo + tokensForYes;
                uint256 totalVotes = votesForYes + votesForNo;
                uint256 yesWorth = (tokensForYes/totalTokens)/2;
                uint256 noWorth = (tokensForNo/totalTokens)/2;
                yesWorth = yesWorth + ((votesForYes/totalVotes)/2);
                noWorth = noWorth + ((votesForNo/totalVotes)/2);
                if (noWorth >= yesWorth) {
                    closedProposalsOutcomesByDay[a][closedProposalsByDay[a][c]] = false;
                } else {
                    posts[proposals[closedProposalsByDay[a][c]].postId].harmful = true;
                    closedProposalsOutcomesByDay[a][closedProposalsByDay[a][c]] = true;
                }
            }
            for (uint256 e = 0; e < closedProposalsByDay[a].length; e++) { //for every proposal in a day
                for (uint256 f = 0; f < voters[closedProposalsByDay[a][e]].length; f++) { //for every voter in a proposal on a certain day
                 if (votedYes[closedProposalsByDay[a][e]][voters[closedProposalsByDay[a][e]][f]] == closedProposalsOutcomesByDay[a][e]) {
                     payOutsByDay[a].push(voters[closedProposalsByDay[a][e]][f]);
                 }
                }
            }
            uint256 payoutValue = uint256(1)/uint256(payOutsByDay[a].length);
            totalSupply_ += 1;
            for (uint256 g = 0; g < payOutsByDay[a].length; g++) { //payout
            unchecked {
            balances[payOutsByDay[a][g]] += payoutValue;
            payable(payOutsByDay[a][g]).transfer(1 ether);
        }
            }
        }
        locked = false;
    }
}