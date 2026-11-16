// Fake data for the owner dashboard: reps, posts, and point transactions

const reps = [
    {id: 1, 
     name: "Jay",
     email: "snootchie.bootchies@example.com",
     status: "active"},
    {id: 2,
     name: "Silent Bob",
     email: "nocomment@example.com",
     status: "active"},
    {id: 3,
     name: "Dante Hicks",
     email: "notevensupposedtobehere@example.com",
     status: "active"},
    {id: 4,
     name: "Randal Graves",
     email: "videorentalrage@example.com",
     status: "paused"},
    {id: 5,
     name: "Veronica Loughran",
     email: "37andcounting@example.com",
     status: "active"},
    {id: 6,
     name: "Caitlin Bree",
     email: "wrongguyinthebathroom@example.com",
     status: "invited"
    }
];

const posts = [
    {id: 1, repId: 1, platform: "YouTube", url: "https://youtube.example.com/watch/snootchie", status: "approved", date: "2026-11-01"},
    {id: 2, repId: 1, platform: "TikTok", url: "https://tiktok.example.com/bootchies", status: "approved", date: "2026-11-03"},
    {id: 3, repId: 2, platform: "Instagram", url: "https://instagram.example.com/silence", status: "approved", date: "2026-11-04"},
    {id: 4, repId: 3, platform: "Instagram", url: "https://instagram.example.com/not-even-supposed", status: "approved", date: "2026-11-05"},
    {id: 5, repId: 3, platform: "YouTube", url: "https://youtube.example.com/closed-shutters", status: "approved", date: "2026-11-06"},
    {id: 6, repId: 3, platform: "TikTok", url: "https://tiktok.example.com/gum-in-the-locks", status: "approved", date: "2026-11-08"},
    {id: 7, repId: 4, platform: "YouTube", url: "https://youtube.example.com/video-store-rant", status: "approved", date: "2026-11-09"},
    {id: 8, repId: 5, platform: "Instagram", url: "https://instagram.example.com/37", status: "approved", date: "2026-11-10"},
    {id: 9, repId: 2, platform: "Facebook", url: "https://facebook.example.com/quick-stop", status: "pending", date: "2026-11-12"},
    {id: 10, repId: 5, platform: "Substack", url: "https://substack.example.com/lasagna-dinner", status: "pending", date: "2026-11-13"},
    {id: 11, repId: 1, platform: "TikTok", url: "https://tiktok.example.com/hockey-on-the-roof", status: "pending", date: "2026-11-14"},
    {id: 12, repId: 3, platform: "Facebook", url: "https://facebook.example.com/i-assure-you", status: "pending", date: "2026-11-15"},
    {id: 13, repId: 4, platform: "YouTube", url: "https://youtube.example.com/death-star-contractors", status: "rejected", date: "2026-11-11"}
];

const transactions = [
    {id: 1, repId: 1, postId: 1, amount: 10, reason: "Post logged", date: "2026-11-01"},
    {id: 2, repId: 1, postId: 2, amount: 10, reason: "Post logged", date: "2026-11-03"},
    {id: 3, repId: 2, postId: 3, amount: 10, reason: "Post logged", date: "2026-11-04"},
    {id: 4, repId: 3, postId: 4, amount: 10, reason: "Post logged", date: "2026-11-05"},
    {id: 5, repId: 3, postId: 5, amount: 10, reason: "Post logged", date: "2026-11-06"},
    {id: 6, repId: 3, postId: 6, amount: 10, reason: "Post logged", date: "2026-11-08"},
    {id: 7, repId: 4, postId: 7, amount: 10, reason: "Post logged", date: "2026-11-09"},
    {id: 8, repId: 5, postId: 8, amount: 10, reason: "Post logged", date: "2026-11-10"},
    {id: 9, repId: 3, postId: -1, amount: -25, reason: "Redeem for gift card", date: "2026-11-12"},
    {id: 10, repId: 1, postId: -1, amount: -15, reason: "Redeem for merch", date: "2026-11-14"}
];