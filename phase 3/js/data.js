// Fake data for the owner dashboard: reps, posts, social media handles, point transactions, rewards, and redemption requests

// Reps (status is "active", "paused", or "invited")
const reps = [
    {
        id: 1,
        name: "Jay",
        email: "snootchie.bootchies@example.com",
        status: "active",
        discountCode: "JAY30",
        prCode: "JAY10"
    },
    {
        id: 2,
        name: "Silent Bob",
        email: "nocomment@example.com",
        status: "active",
        discountCode: "BOB30",
        prCode: "BOB10"
    },
    {
        id: 3,
        name: "Dante Hicks",
        email: "notevensupposedtobehere@example.com",
        status: "active",
        discountCode: "DANTE30",
        prCode: "DANTE10"
    },
    {
        id: 4,
        name: "Randal Graves",
        email: "videorentalrage@example.com",
        status: "paused",
        discountCode: "RANDAL30",
        prCode: "RANDAL10"
    },
    {
        id: 5,
        name: "Veronica Loughran",
        email: "37andcounting@example.com",
        status: "active",
        discountCode: "VERONICA30",
        prCode: "VERONICA10"
    },
    {
        id: 6,
        name: "Caitlin Bree",
        email: "wrongguyinthebathroom@example.com",
        status: "invited",
        discountCode: "CAITLIN30",
        prCode: "CAITLIN10"
    }
];

// Posts (reviewedDate is null while a post is pending)
const posts = [
    { id: 1, repId: 1, platform: "YouTube", url: "https://youtube.example.com/watch/snootchie", status: "approved", date: "2026-11-01", source: "link", points: 10, reviewedDate: "2026-11-01" },
    { id: 2, repId: 1, platform: "TikTok", url: "https://tiktok.example.com/bootchies", status: "approved", date: "2026-11-03", source: "link", points: 10, reviewedDate: "2026-11-03" },
    { id: 3, repId: 2, platform: "Instagram", url: "https://instagram.example.com/silence", status: "approved", date: "2026-11-04", source: "auto", points: 10, reviewedDate: "2026-11-04" },
    { id: 4, repId: 3, platform: "Instagram", url: "https://instagram.example.com/not-even-supposed", status: "approved", date: "2026-11-05", source: "auto", points: 10, reviewedDate: "2026-11-05" },
    { id: 5, repId: 3, platform: "YouTube", url: "https://youtube.example.com/closed-shutters", status: "approved", date: "2026-11-06", source: "link", points: 10, reviewedDate: "2026-11-06" },
    { id: 6, repId: 3, platform: "TikTok", url: "https://tiktok.example.com/gum-in-the-locks", status: "approved", date: "2026-11-08", source: "link", points: 10, reviewedDate: "2026-11-08" },
    { id: 7, repId: 4, platform: "YouTube", url: "https://youtube.example.com/video-store-rant", status: "approved", date: "2026-11-09", source: "link", points: 10, reviewedDate: "2026-11-09" },
    { id: 8, repId: 5, platform: "Instagram", url: "https://instagram.example.com/37", status: "approved", date: "2026-11-10", source: "auto", points: 10, reviewedDate: "2026-11-10" },
    { id: 9, repId: 2, platform: "Facebook", url: "https://facebook.example.com/quick-stop", status: "pending", date: "2026-11-12", source: "auto", points: 10, reviewedDate: null },
    { id: 10, repId: 5, platform: "Substack", url: "https://substack.example.com/lasagna-dinner", status: "pending", date: "2026-11-13", source: "link", points: 10, reviewedDate: null },
    { id: 11, repId: 1, platform: "TikTok", url: "https://tiktok.example.com/hockey-on-the-roof", status: "pending", date: "2026-11-14", source: "link", points: 10, reviewedDate: null },
    { id: 12, repId: 3, platform: "Facebook", url: "https://facebook.example.com/i-assure-you", status: "pending", date: "2026-11-15", source: "auto", points: 10, reviewedDate: null },
    { id: 13, repId: 4, platform: "YouTube", url: "https://youtube.example.com/death-star-contractors", status: "rejected", date: "2026-11-11", source: "link", points: 10, reviewedDate: "2026-11-12" }
];

// Point transactions (postId -1 means a redemption, not a post)
const transactions = [
    { id: 1, repId: 1, postId: 1, amount: 10, reason: "Post logged", date: "2026-11-01" },
    { id: 2, repId: 1, postId: 2, amount: 10, reason: "Post logged", date: "2026-11-03" },
    { id: 3, repId: 2, postId: 3, amount: 10, reason: "Post logged", date: "2026-11-04" },
    { id: 4, repId: 3, postId: 4, amount: 10, reason: "Post logged", date: "2026-11-05" },
    { id: 5, repId: 3, postId: 5, amount: 10, reason: "Post logged", date: "2026-11-06" },
    { id: 6, repId: 3, postId: 6, amount: 10, reason: "Post logged", date: "2026-11-08" },
    { id: 7, repId: 4, postId: 7, amount: 10, reason: "Post logged", date: "2026-11-09" },
    { id: 8, repId: 5, postId: 8, amount: 10, reason: "Post logged", date: "2026-11-10" },
    { id: 9, repId: 3, postId: -1, amount: -25, reason: "Redeemed: $5 store credit", date: "2026-11-12" },
    { id: 10, repId: 1, postId: -1, amount: -15, reason: "Redeemed: Sticker pack", date: "2026-11-14" },
    { id: 11, repId: 3, postId: -1, amount: -5, reason: "Redeemed: Custom (free sticker added to order)", date: "2026-11-18" }
];

// Social media accounts (one per platform for each rep)
const socialAccounts = [
    { id: 1, repId: 1, platform: "YouTube", handle: "@snootchiebootchies", url: "https://youtube.example.com/@snootchiebootchies" },
    { id: 2, repId: 1, platform: "TikTok", handle: "@jayandsilentbob", url: "https://tiktok.example.com/@jayandsilentbob" },
    { id: 3, repId: 2, platform: "Instagram", handle: "@silentbob", url: "https://instagram.example.com/@silentbob" },
    { id: 4, repId: 2, platform: "Facebook", handle: "@bobsaysnothing", url: "https://facebook.example.com/@bobsaysnothing" },
    { id: 5, repId: 3, platform: "Instagram", handle: "@noteven", url: "https://instagram.example.com/@noteven" },
    { id: 6, repId: 3, platform: "YouTube", handle: "@quickstopdante", url: "https://youtube.example.com/@quickstopdante" },
    { id: 7, repId: 3, platform: "TikTok", handle: "@shuttersclosed", url: "https://tiktok.example.com/@shuttersclosed" },
    { id: 8, repId: 3, platform: "Facebook", handle: "@dantehicks", url: "https://facebook.example.com/@dantehicks" },
    { id: 9, repId: 4, platform: "YouTube", handle: "@videorentalrage", url: "https://youtube.example.com/@videorentalrage" },
    { id: 10, repId: 5, platform: "Instagram", handle: "@37andcounting", url: "https://instagram.example.com/@37andcounting" },
    { id: 11, repId: 5, platform: "Substack", handle: "@lasagnadinner", url: "https://substack.example.com/@lasagnadinner" },
    { id: 12, repId: 6, platform: "Instagram", handle: "@caitlinbree", url: "https://instagram.example.com/@caitlinbree" }
];

// Rewards the owner offers (type is "Product", "Bundle", or "Store credit")
// shopifyProductId is null when the owner fulfills the reward by hand (standalone version)
const rewards = [
    { id: 1, name: "Sticker pack", type: "Product", pointCost: 15, shopifyProductId: null },
    { id: 2, name: "Holiday sticker bundle", type: "Bundle", pointCost: 50, shopifyProductId: null },
    { id: 3, name: "$5 store credit", type: "Store credit", pointCost: 25, shopifyProductId: null },
    { id: 4, name: "$2 store credit", type: "Store credit", pointCost: 10, shopifyProductId: null },
    { id: 5, name: "Mini sticker", type: "Product", pointCost: 10, shopifyProductId: null }
];

// Redemptions (status is "pending", "approved", "rejected", or "reversed"; reviewedDate is null while pending)
// source is "request" (rep asked) or "manual" (owner redeemed by hand; date is null since there was no request)
// rewardId is null for a custom redemption, and note explains it
// points is saved on the record so later price changes don't rewrite history
const redemptionRequests = [
    { id: 1, repId: 3, rewardId: 3, points: 25, source: "request", note: null, status: "approved", date: "2026-11-11", reviewedDate: "2026-11-12" },
    { id: 2, repId: 1, rewardId: 1, points: 15, source: "request", note: null, status: "approved", date: "2026-11-13", reviewedDate: "2026-11-14" },
    { id: 3, repId: 2, rewardId: 4, points: 10, source: "request", note: null, status: "pending", date: "2026-11-16", reviewedDate: null },
    { id: 4, repId: 5, rewardId: 5, points: 10, source: "request", note: null, status: "pending", date: "2026-11-17", reviewedDate: null },
    { id: 5, repId: 3, rewardId: null, points: 5, source: "manual", note: "Free sticker added to order", status: "approved", date: null, reviewedDate: "2026-11-18" }
];