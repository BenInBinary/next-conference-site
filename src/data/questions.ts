export interface Question {
    id: string;
    category: string;
    question: string;
    answer: string;
    snippet?: string;
}

export const interviewQuestions: Question[] = [
    // --- ENCRYPTION & SECURITY (AES-256, ECDH, JWT) ---
    {
        id: "sec-1",
        category: "Encryption & Security",
        question: "Explain how AES-256 symmetric encryption works.",
        answer: "AES-256 (Advanced Encryption Standard) is a symmetric encryption algorithm that uses a 256-bit key to encrypt and decrypt data in 128-bit blocks. 'Symmetric' means the same key is used for both encryption and decryption. It relies on a substitution-permutation network comprising 14 rounds of transformations.",
        snippet: "const crypto = require('crypto');\nconst algorithm = 'aes-256-cbc';\nconst key = crypto.randomBytes(32);\nconst iv = crypto.randomBytes(16);\n\nfunction encrypt(text) {\n  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);\n  let encrypted = cipher.update(text);\n  encrypted = Buffer.concat([encrypted, cipher.final()]);\n  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };\n}\n\nfunction decrypt(encryptedText, ivHex) {\n  let iv = Buffer.from(ivHex, 'hex');\n  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);\n  let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));\n  decrypted = Buffer.concat([decrypted, decipher.final()]);\n  return decrypted.toString();\n}"
    },
    {
        id: "sec-2",
        category: "Encryption & Security",
        question: "What is ECDH and how is it used for End-to-End Encryption (E2EE)?",
        answer: "ECDH (Elliptic Curve Diffie-Hellman) is an anonymous key agreement protocol. It allows two parties, each having an elliptic-curve public-private key pair, to establish a shared secret over an insecure channel. This shared secret is then typically used to derive a symmetric key (like AES-256) for encrypting the actual data.",
        snippet: "const crypto = require('crypto');\nconst alice = crypto.createECDH('secp256k1');\nalice.generateKeys();\nconst bob = crypto.createECDH('secp256k1');\nbob.generateKeys();\n\nconst aliceShared = alice.computeSecret(bob.getPublicKey());\nconst bobShared = bob.computeSecret(alice.getPublicKey());\n// aliceShared.toString('hex') === bobShared.toString('hex')"
    },
    {
        id: "sec-3",
        category: "Encryption & Security",
        question: "How do you securely store passwords in a Node.js backend?",
        answer: "Never store plaintext passwords. Use a strong, salted cryptographic hash function like bcrypt or Argon2. These algorithms are deliberately slow to perform, mitigating brute-force and dictionary attacks.",
        snippet: "const bcrypt = require('bcrypt');\nconst saltRounds = 10;\nconst plainPassword = 'mySecretPassword';\n\nbcrypt.hash(plainPassword, saltRounds, function(err, hash) {\n  // Store 'hash' in the database safely\n});"
    },
    {
        id: "sec-4",
        category: "Encryption & Security",
        question: "What is a JWT and what are its standard three parts?",
        answer: "JSON Web Token (JWT) is an open standard defining a compact way for securely transmitting information between parties as a JSON object. It consists of three parts separated by dots: Header, Payload (claims), and Signature."
    },
    {
        id: "sec-5",
        category: "Encryption & Security",
        question: "How would you implement Role-Based Access Control (RBAC) in Express?",
        answer: "Store user roles in the database (or JWT payload). Create an authentication middleware that verifies the JWT and attaches the user to the request. Then create an authorization middleware that checks if `req.user.role` matches the required role for the route.",
        snippet: "function authorize(roles = []) {\n  if (typeof roles === 'string') roles = [roles];\n  return [ \n    authenticateJWT,\n    (req, res, next) => {\n      if (!roles.length || roles.includes(req.user.role)) return next();\n      return res.status(403).json({ message: 'Forbidden' });\n    }\n  ];\n}"
    },
    {
        id: "sec-6",
        category: "Encryption & Security",
        question: "What is a side-channel attack and how does AES handle it?",
        answer: "Side-channel attacks exploit physical implementations (timing information, power consumption) rather than theoretical weaknesses. AES algorithms in modern environments (like Node.js `crypto` via OpenSSL) mitigate this by executing in constant time."
    },
    {
        id: "sec-7",
        category: "Encryption & Security",
        question: "Describe the process of Consent-Based Data Sharing.",
        answer: "In a consent-based system, User A encrypts their local data with a symmetric key. User A then encrypts the symmetric key using User B's public key (RSA/ECDH) and shares it. User B decrypts the symmetric key with their private key, then uses it to decrypt the requested data."
    },
    {
        id: "sec-8",
        category: "Encryption & Security",
        question: "What is the difference between AES-CBC and AES-GCM?",
        answer: "AES-CBC (Cipher Block Chaining) provides confidentiality but not integrity checking (requires a separate HMAC). AES-GCM (Galois/Counter Mode) provides Authenticated Encryption with Associated Data (AEAD), ensuring both confidentiality and data authenticity/integrity."
    },
    {
        id: "sec-9",
        category: "Encryption & Security",
        question: "Why do we need an IV (Initialization Vector) in AES?",
        answer: "The IV ensures that identical plaintexts encrypted with the same key will yield completely different ciphertexts. It prevents attackers from identifying patterns in encrypted data. It does not need to be secret but must be unique per encryption."
    },
    {
        id: "sec-10",
        category: "Encryption & Security",
        question: "How do you protect a REST API from brute-force login attacks?",
        answer: "Implement rate limiting using packages like `express-rate-limit`, implement account lockouts after a certain number of failed attempts within a time window, and enforce robust password complexity rules."
    },

    // --- WEB3 & BLOCKCHAIN (ERC-20, ERC-721) ---
    {
        id: "web3-1",
        category: "Web3 & Blockchain",
        question: "What is an ERC-20 token and standard?",
        answer: "ERC-20 is the standard for creating fungible tokens on the Ethereum blockchain. It specifies six mandatory functions: totalSupply, balanceOf, transfer, transferFrom, approve, and allowance."
    },
    {
        id: "web3-2",
        category: "Web3 & Blockchain",
        question: "What is an ERC-721 token and how does it differ from ERC-20?",
        answer: "ERC-721 is the standard for Non-Fungible Tokens (NFTs). Unlike ERC-20 where tokens are identical (fungible), each ERC-721 token is completely unique. It implements functions like ownerOf(tokenId) and safeTransferFrom()."
    },
    {
        id: "web3-3",
        category: "Web3 & Blockchain",
        question: "How do you interact with a smart contract from a Node.js backend?",
        answer: "Usually via the highly popular `ethers.js` or `web3.js` libraries. You need to connect to an RPC node (like Infura or Alchemy), initiate a Provider and a connected Wallet/Signer, and pass the contract's ABI and Address.",
        snippet: "const { ethers } = require('ethers');\nconst provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR-API-KEY');\nconst wallet = new ethers.Wallet(privateKey, provider);\nconst contract = new ethers.Contract(contractAddress, abi, wallet);\nconst tx = await contract.mint(wallet.address, 1);"
    },
    {
        id: "web3-4",
        category: "Web3 & Blockchain",
        question: "Explain the concept of Web3 'gas'.",
        answer: "Gas refers to the fee required to successfully conduct a transaction or execute a contract on Ethereum. It acts as a computational cost limit (Gas Limit) paired with a price per unit (Gas Price in gwei)."
    },
    {
        id: "web3-5",
        category: "Web3 & Blockchain",
        question: "What happens if a backend token transaction fails and mining stops?",
        answer: "Transactions can fail for various reasons (out of gas, reverted conditions). In Node backend implementations, you must wrap network calls in `try/catch` handlers and track transaction receipts. If reverted, the gas is spent, but state changes are rolled back."
    },
    {
        id: "web3-6",
        category: "Web3 & Blockchain",
        question: "What is the difference between minting and transferring an ERC-721?",
        answer: "Minting is the creation of a brand new, unique token on the blockchain out of nothing (assigning mapping from address(0) to User). Transferring implies pulling an existing token from the possession of User A and distributing to User B."
    },
    {
        id: "web3-7",
        category: "Web3 & Blockchain",
        question: "How does the 'approve' and 'transferFrom' flow work in ERC-20?",
        answer: "The token holder calls `approve(spenderAddress, amount)` to allow a third-party smart contract or user (the spender) to withdraw up to the `amount` from their wallet. The spender then calls `transferFrom(owner, recipient, amount)`."
    },
    {
        id: "web3-8",
        category: "Web3 & Blockchain",
        question: "What are some ways to secure private keys in a Node.js production backend?",
        answer: "Never hardcode private keys. Use cloud-based Secrets Management platforms (like AWS KMS, AWS Secrets Manager, HashiCorp Vault). Use HSM (Hardware Security Modules) for high-value applications. Avoid committing `.env` files."
    },
    {
        id: "web3-9",
        category: "Web3 & Blockchain",
        question: "What is an RPC node?",
        answer: "A Remote Procedure Call (RPC) node is an interface that allows an external application (like a Node server) to interact with the blockchain data to read state or broadcast signed transactions."
    },
    {
        id: "web3-10",
        category: "Web3 & Blockchain",
        question: "Explain Real Estate Tokenization on the Blockchain.",
        answer: "Real estate tokenization involves digitizing fractional ownership of a physical property using a smart contract. An LLC holds the deed, and tokens (ERC-20) are issued representing shares of that LLC. This improves liquidity and lowers entry barriers."
    },

    // --- MONGODB & DATABASES ---
    {
        id: "db-1",
        category: "Database Systems",
        question: "Explain what an Aggregation Pipeline is and provide an example of a single-collection aggregation.",
        answer: "The aggregation pipeline is a framework for data aggregation modeled on the concept of data processing pipelines. Documents enter a multi-stage pipeline that transforms them into an aggregated result. Prominent stages include $match, $group, $sort, and $project.",
        snippet: `// Example: Calculate total sales per customer for active orders in a single 'orders' collection
db.orders.aggregate([
  // Stage 1: Filter documents to only include 'active' orders
  { $match: { status: 'active' } },
  
  // Stage 2: Group by customer ID and calculate the sum of the 'amount' field
  { 
    $group: { 
      _id: '$cust_id', // Grouping key (groups by cust_id)
      totalPurchases: { $sum: '$amount' } // Accumulator calculating total
    } 
  },
  
  // Stage 3: Sort the resulting grouped documents by total purchases in descending order (highest first)
  { $sort: { totalPurchases: -1 } }
]);`
    },
    {
        id: "db-8",
        category: "Database Systems",
        question: "What is the $lookup stage in aggregation? Provide an example of multi-collection aggregation.",
        answer: "$lookup performs a left outer join to a different collection in the same database to filter in documents from the joined collection for processing. It effectively simulates relational database JOIN behavior.",
        snippet: `// Example: Join 'orders' with 'products' collection to get detailed product info for each order
db.orders.aggregate([
  // Stage 1: Join with the products collection
  {
    $lookup: {
      from: 'products',           // The target collection to join
      localField: 'productId',    // The field from the input document ('orders')
      foreignField: '_id',        // The matched field from the documents of the 'products' collection
      as: 'productDetails'        // The new array field added to the output document
    }
  },
  // Stage 2: Unwind the resulting array to turn it into a flat object 
  // (Assuming each order corresponds to one product, mapping 1-to-1)
  {
    $unwind: {
      path: '$productDetails',
      preserveNullAndEmptyArrays: true // Keep orders in the pipeline even if they have no matching product
    }
  }
]);`
    },
    {
        id: "db-3",
        category: "Database Systems",
        question: "What is indexing in database systems and how do you create different types of indexes in MongoDB?",
        answer: "An index is a strictly ordered data structure that speeds up data retrieval operations. Without an index, the engine must perform a 'collscan' (scanning every document). An index structures the searched-upon field to allow O(log n) lookups.",
        snippet: `// 1. Single Field Index: Speeds up queries on a single specific field
// '1' indicates ascending order layout, '-1' indicates descending
db.users.createIndex({ email: 1 }); 

// 2. Compound Index: Optimizes queries that filter or sort on multiple fields combined
// E.g., heavily speeding up queries checking both lastName and firstName
db.employees.createIndex({ lastName: 1, firstName: 1 });

// 3. Unique Index: Ensures no two documents have the exact same value for the indexed field (like Usernames)
db.users.createIndex({ username: 1 }, { unique: true });

// 4. Text Index: Supports contextual text search queries mapped over large string content
db.articles.createIndex({ title: "text", content: "text" });`
    },
    {
        id: "db-11",
        category: "Database Systems",
        question: "How do you implement efficient pagination in a Node.js/MongoDB backend for massive datasets?",
        answer: "Pagination can be implemented using skip/limit or cursor-based pagination. Cursor-based (pointer) is significantly faster for millions of records because it avoids traversing matching documents continuously up to the skip value.",
        snippet: `// Approach 1: Offset-based Pagination (skip and limit)
// Simple to read, but VERY slow for large datasets as it must scan and skip previous elements
const pageSize = 20;
const pageNumber = 5;
const offsetPagi = await db.collection('posts')
  .find({ status: 'published' })
  .sort({ createdAt: -1 }) // Sort by newest
  .skip((pageNumber - 1) * pageSize) // Skip the first 80 records
  .limit(pageSize) // Return next 20
  .toArray();

// Approach 2: Cursor-based Pagination (Fast & Strongly Recommended for 1M+ Records)
// Requires explicitly passing the last seen _id from the frontend from the previous page
const lastSeenId = "60c72b2f9b1e8a3b4c1a2b3c"; 
const cursorPagi = await db.collection('posts')
  // Fetch items exclusively occurring BEFORE the last seen document ID in the database index tree
  .find({ status: 'published', _id: { $lt: ObjectId(lastSeenId) } }) 
  .sort({ _id: -1 })
  .limit(pageSize)
  .toArray();`
    },
    {
        id: "db-2",
        category: "Database Systems",
        question: "How does a Vector Database / MongoDB Vector Search work?",
        answer: "Instead of comparing exact strings, Vector databases map data inputs (text, images) into a high-dimensional mathematical space (embeddings). Similar concepts are placed near each other. MongoDB Atlas Vector Search uses Approximate Nearest Neighbor algorithms (like HNSW) to run sematic searches quickly."
    },
    {
        id: "db-4",
        category: "Database Systems",
        question: "How do you handle migration of 5M+ records in MongoDB without crashing the server?",
        answer: "Never use standard \`.find().toArray()\` for 5 million records; it will OOM (Out of Memory) crash Node.js. Use a highly targeted \`.find().cursor()\` to stream records in batches, processing documents via multi-threaded worker pools, and utilize bulk-write operations like \`.bulkWrite()\` to minimize network overhead."
    },
    {
        id: "db-6",
        category: "Database Systems",
        question: "What are MongoDB Triggers and how did you use them?",
        answer: "Atlas Triggers are serverless functions hosted purely on the DB cluster. They execute in response to database changes (inserts, updates). They're highly effective for auto-syncing secondary collections or reaching out to Third-Party services instantaneously."
    },
    {
        id: "db-7",
        category: "Database Systems",
        question: "Explain Mongoose Middleware (Pre and Post hooks).",
        answer: "Mongoose middleware are functions passed control during execution of asynchronous operations. A common use-case for a \`pre('save')\` hook is hashing a user's password before sending it to the database.",
        snippet: `userSchema.pre('save', async function(next) {\n  // If the password wasn't modified in this request, skip encryption\n  if(!this.isModified('password')) return next();\n  \n  // Execute high-density bcrypt hash on the plaintext password mapped in state\n  this.password = await bcrypt.hash(this.password, 10);\n  next();\n});`
    },
    {
        id: "db-9",
        category: "Database Systems",
        question: "How do you prevent a dirty read in backend data migrations?",
        answer: "In MongoDB, handle critical multi-document operations inside a Transaction Session. You initiate a transaction, perform writes, and if anything errors, call \`session.abortTransaction()\`."
    },

    // --- NODE.JS, EXPRESS, & ARCHITECTURE ---
    {
        id: "backend-1",
        category: "Node.js & express",
        question: "Explain the Node.js Event Loop.",
        answer: "The Event Loop dictates how Node executes asynchronous operations. Since JS is single-threaded, the Event Loop assigns tasks to the OS kernel. Upon resolution, callbacks are sent to the task queue. Phases include Timers, Pending Callbacks, Poll, Check, and Close callbacks."
    },
    {
        id: "backend-2",
        category: "Node.js & express",
        question: "What is Middleware in Express.js?",
        answer: "Middleware functions are functions acting as links within the Express life cycle router. They have access to the request object (req), the response object (res), and the next middleware function."
    },
    {
        id: "backend-3",
        category: "Node.js & express",
        question: "How do you handle unhandled promise rejections internally in Node?",
        answer: "Use `process.on('unhandledRejection', callback)`. However, it's best practice to attach a `.catch()` block to every promise or utilize `try/catch` within generic `async` functions to intercept errors at their origin source."
    },
    {
        id: "backend-4",
        category: "Node.js & express",
        question: "Describe your strategy for building a Real-Time Chat System.",
        answer: "I utilize WebSockets (via Socket.io). The frontend establishes a persistent stateful socket connection to the Node.js backend server. The server tracks online user states via connection IDs in memory/Redis and emits broadcast events (like 'new_message') immediately to associated room pools."
    },
    {
        id: "backend-5",
        category: "Node.js & express",
        question: "What are the common HTTP methods used in REST?",
        answer: "GET (Retrieve resource), POST (Create resource), PUT (Replace resource), PATCH (Update partial resource), and DELETE (Remove resource)."
    },
    {
        id: "backend-6",
        category: "Node.js & express",
        question: "Explain the MVC Pattern.",
        answer: "Model-View-Controller. Models handle data representation and DB logic. Controllers handle routing, request interception, and orchestrating models. Views handle the UI presentation."
    },
    {
        id: "backend-7",
        category: "Node.js & express",
        question: "How do you handle file uploads in an Express backend?",
        answer: "Using a `multipart/form-data` parser middleware like `multer`. Multer intercepts the data stream buffer, allowing you to intercept and save files to disks or upload directly to an AWS S3 bucket pipeline."
    },
    {
        id: "backend-8",
        category: "Node.js & express",
        question: "What's the difference between `res.send()` and `res.json()`?",
        answer: "`res.send()` automatically parses its arguments natively determining headers. `res.json()` strictly forces header formatting and stringification representing JSON data."
    },
    {
        id: "backend-9",
        category: "Node.js & express",
        question: "How do you scale a Node application vertically vs horizontally?",
        answer: "Vertical scaling increases identical single-machine resources (RAM, CPU). Horizontal scaling duplicates the server entirely behind a load balancer (such as NGINX or AWS ALB)."
    },
    {
        id: "backend-10",
        category: "Node.js & express",
        question: "What is the purpose of `package-lock.json`?",
        answer: "It locks down the strictly requested version dependencies and sub-dependencies. This ensures identical environments across team setups avoiding 'works on my machine' errors triggered by minor dependency package patches."
    },

    // --- AWS, CLOUD & SERVERLESS ---
    {
        id: "aws-1",
        category: "Cloud & Deployment",
        question: "What is AWS Lambda and what does \"Serverless\" truly mean?",
        answer: "Serverless doesn't actually mean no servers; it means the server infrastructure logic is abstracted away entirely by AWS. Lambda runs execution functions triggered by events, instantly scaling and charging purely on execution time rather than persistent up-time."
    },
    {
        id: "aws-2",
        category: "Cloud & Deployment",
        question: "Explain AWS API Gateway integration with Lambda.",
        answer: "API Gateway acts as the heavily protective HTTP front door. It receives the REST API hits and natively routes the HTTP payload internally to AWS Lambda as an `event` JSON object for computational execution."
    },
    {
        id: "aws-3",
        category: "Cloud & Deployment",
        question: "How does AWS S3 differ from standard Block Storage (EBS)?",
        answer: "S3 is object storage over HTTP using buckets. It's wildly scalable, generally cheaper, and great for static assets, backups, and user uploads. EBS is block storage practically serving as the hard drive running attached to an EC2 instance."
    },
    {
        id: "aws-4",
        category: "Cloud & Deployment",
        question: "How is Vercel different compared to manual EC2 orchestration?",
        answer: "Vercel abstracts the pipeline. Next.js natively builds Serverless APIs and edge-network caching CDN protocols via Git-Ops pushes. Manual EC2 requires manually configuring the OS, bash script deployments, Load Balancers, SSL generation, and instance scaling."
    },
    {
        id: "aws-5",
        category: "Cloud & Deployment",
        question: "What happens during a cold start on Serverless functions?",
        answer: "If a serverless function hasn't been engaged recently, the cloud provider will tear down the idle container to save resources. A fresh request requires allocating entirely new container space, installing dependencies, and spinning up the Node instance resulting in a 'cold start' processing delay."
    },
    {
        id: "aws-6",
        category: "Cloud & Deployment",
        question: "How does Firebase Authentication differ from local JWT execution?",
        answer: "Firebase handles password encryption hashing, salts, social login protocols, and state-token management totally off-site. The backend just verifies the ID Token legitimacy via the Firebase Admin SDK eliminating security liability for local storage."
    },
    {
        id: "aws-7",
        category: "Cloud & Deployment",
        question: "What are AWS IAM roles and policies?",
        answer: "Identity and Access Management permissions. Hard rules strictly explicitly allowing or denying programmatic AWS user scripts and internal Services the authority to access specified AWS resources."
    },
    {
        id: "aws-8",
        category: "Cloud & Deployment",
        question: "Why would you decouple a system with Webhook events?",
        answer: "Decoupling shifts intensive asynchronous processes (like firing AI integration responses or finalizing massive file formats) away from the HTTP main-thread, allowing the user's view context to rapidly unblock and receive Webhook confirmation out-of-band."
    },
    {
        id: "aws-9",
        category: "Cloud & Deployment",
        question: "What are the common strategies for loading `.env` variables in production?",
        answer: "For EC2, injecting directly into the PM2 or systemd environment wrapper. For Docker/Kubernetes, via cluster secret injection. For Serverless, loading via AWS strictly-guarded System Manager parameters directly resolving upon initialization."
    },
    {
        id: "aws-10",
        category: "Cloud & Deployment",
        question: "Describe your deployment workflow.",
        answer: "I focus primarily on GitOps triggers utilizing GitHub branching directly merged into the Vercel architecture pipeline (for Next.js frontend/APIs) and heavily utilizing automated CI/CD for standalone Node instances to streamline production staging tests before merge."
    },

    // --- ADVANCED JAVASCRIPT, REACT & NEXT.JS ---
    {
        id: "js-1",
        category: "Advanced JavaScript & Next.js",
        question: "What is Hoisting in JavaScript?",
        answer: "Hoisting is the default behavior moving declaration definitions up to the top of the current scope. However, `let` and `const` keywords implement a Temporal Dead Zone preventing them from being accessed before initialization."
    },
    {
        id: "js-2",
        category: "Advanced JavaScript & Next.js",
        question: "Explain Closures simply.",
        answer: "A closure fundamentally occurs when an inner function continues to have explicit access to variables contained in its outer enclosing function, even completely after that outer scope execution function has terminated."
    },
    {
        id: "js-3",
        category: "Advanced JavaScript & Next.js",
        question: "Differentiate between Call, Apply, and Bind.",
        answer: "\`call()\` attaches execution with explicit separated arguments context. \`apply()\` acts functionally identical but demands array arguments. \`bind()\` does absolutely not execute; it returns a completely new permanently context-locked function representation.",
        snippet: `const user = { name: "Alice", role: "Admin" };

function greet(greeting, punctuation) {
  // 'this' refers to whichever object is passed as the first argument
  return \`\${greeting}, \${this.name} [\${this.role}]\${punctuation}\`;
}

// 1. call() - Invokes immediately. Pass arguments individually separated by commas.
// Useful when you know the exact number of arguments beforehand.
console.log(greet.call(user, "Hello", "!")); 
// Output: "Hello, Alice [Admin]!"

// 2. apply() - Invokes immediately. Pass arguments strictly as a single Array.
// Crucial when you have an array of data, like mapping over Math.max.apply(null, [1,2,3])
console.log(greet.apply(user, ["Welcome", "."])); 
// Output: "Welcome, Alice [Admin]."

// 3. bind() - Does NOT invoke immediately. It returns a brand-new function.
// The new function is permanently 'locked' to the 'user' context.
// Extremely common in React for passing callbacks down to children to preserve 'this'.
const lockedGreeting = greet.bind(user, "Hey");
console.log(lockedGreeting("?")); 
// Output: "Hey, Alice [Admin]?"`
    },
    {
        id: "js-4",
        category: "Advanced JavaScript & Next.js",
        question: "What are the core differences between Client Components and Server Components in Next.js App Router?",
        answer: "Server Components (default) are strictly executed entirely on the Node backend allowing direct un-exposed Database API reads saving massive JS bundle size. Client components (`\"use client\"`) retain hydration instructions natively supporting user `onClick` activity and React `useStates` hooks."
    },
    {
        id: "js-5",
        category: "Advanced JavaScript & Next.js",
        question: "Explain the Virtual DOM in React.",
        answer: "Direct heavy DOM node manipulation acts incredibly computationally expensive to UI processors. React stores a structural lightweight JavaScript copy representations (Virtual DOM). Upon state adjustment it creates a strict 'diff' and explicitly batches only those resulting node changes strictly into the true browser layout."
    },
    {
        id: "js-6",
        category: "Advanced JavaScript & Next.js",
        question: "What is the purpose of React's `useEffect` Dependency Array?",
        answer: "It manages the lifecycle condition triggers. Empty `[]` guarantees single fire upon immediate hydration. An array populated completely dictates React strictly executes the enclosed payload specifically if variables inside mutate."
    },
    {
        id: "js-7",
        category: "Advanced JavaScript & Next.js",
        question: "What is Next.js API Routes structure?",
        answer: "Next.js naturally implements REST logic natively within routing context structure enabling independent serverless APIs natively inside `src/app/api/route.ts` bypassing entirely distinct Node.js Express server layers."
    },
    {
        id: "js-8",
        category: "Advanced JavaScript & Next.js",
        question: "Explain destructuring assignments.",
        answer: "A deeply embedded JavaScript syntax extracting rapid individual properties locally from objects and arrays strictly assigning mapping identical structures into precise variable pointers.",
        snippet: `// --- Object Destructuring ---
const user = { 
  id: 42, 
  profile: { name: 'John Doe', age: 30 },
  role: 'Developer'
};

// Extracting strictly named properties into variables
const { id, role } = user;
console.log(id, role); // 42 "Developer"

// Deep destructuring (extracting nested properties)
const { profile: { name } } = user;
console.log(name); // "John Doe"

// Assigning to new variable names (e.g., extracting 'id' but calling it 'userId')
const { id: userId } = user;
console.log(userId); // 42

// --- Array Destructuring ---
const coordinates = [10.5, 20.3, 30.1];

// Extracting ordered elements by position
const [x, y] = coordinates;
console.log(x, y); // 10.5 20.3

// Using the Rest operator to grab remaining elements
const [first, ...rest] = coordinates;
console.log(rest); // [20.3, 30.1]

// Skipping elements with empty commas
const [, , z] = coordinates;
console.log(z); // 30.1`
    },
    {
        id: "js-9",
        category: "Advanced JavaScript & Next.js",
        question: "Explain Prototypal Inheritance vs ES6 Classes.",
        answer: "JS operates basically natively object-assigned mapping references extending `Object.prototype` contexts. ES6 classes primarily behave exactly inherently as syntactic protective sugar visually standardizing inheritance structural architecture over JavaScript prototypes."
    },
    {
        id: "js-10",
        category: "Advanced JavaScript & Next.js",
        question: "How does the React Context API resolve Prop Drilling?",
        answer: "Prop Drilling involves repeatedly piping data down infinitely through completely unconnected parent hierarchy mapping. The Context API functionally teleports state directly enabling structural data utilization instantly everywhere completely detaching explicitly chained hierarchy definitions."
    },
    {
        id: "js-11",
        category: "Advanced JavaScript & Next.js",
        question: "What is function currying?",
        answer: "Currying transforms a function that takes multiple arguments into a series of unary functions (each taking one argument). It enables partial application — you can pre-fill some arguments and reuse the resulting specialized function.",
        snippet: `// --- 1. ES6 Arrow Function Currying ---
const add = a => b => a + b;

// Partial application: creating a specialized function
const add5 = add(5); 

console.log(add5(3));  // 8
console.log(add5(10)); // 15

// Or calling it immediately with both arguments
console.log(add(10)(20)); // 30

// --- 2. Normal Function Declaration Equivalent ---
// This behaves identically to the arrow function above but shows the scoping explicitly.
function normalAdd(a) {
  // 'a' is preserved in the closure for the returning function
  return function(b) {
    return a + b;
  };
}

const normalAdd5 = normalAdd(5);
console.log(normalAdd5(7)); // 12`
    }
];
