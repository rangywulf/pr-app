// Fake data for the owner dashboard: reps, posts, and point transactions

const reps = [
    {id: 1, 
     name: "Jay",
     email: "snootchie.bootchies@example.com"},
    {id: 2,
     name: "Silent Bob",
     email: "nocomment@example.com"},
    {id: 3,
     name: "Dante Hicks",
     email: "notevensupposedtobehere@example.com"},
    {id: 4,
     name: "Randal Graves",
     email: "videorentalrage@example.com"},
    {id: 5,
     name: "Veronica Loughran",
     email: "37andcounting@example.com"},
    {id: 6,
     name: "Caitlin Bree",
     email: "wrongguyinthebathroom@example.com"
    }
];

const posts = [
    {id: 1, repId: 1, platform: "YouTube", url: "https://youtube.example.com/watch/snootchie"},
    {id: 2, repId: 1, platform: "TikTok", url: "https://tiktok.example.com/bootchies"},
    {id: 3, repId: 2, platform: "Instagram", url: "https://instagram.example.com/silence"},
    {id: 4, repId: 3, platform: "Instagram", url: "https://instagram.example.com/not-even-supposed"},
    {id: 5, repId: 3, platform: "YouTube", url: "https://youtube.example.com/closed-shutters"},
    {id: 6, repId: 3, platform: "TikTok", url: "https://tiktok.example.com/gum-in-the-locks"},
    {id: 7, repId: 4, platform: "YouTube", url: "https://youtube.example.com/video-store-rant"},
    {id: 8, repId: 5, platform: "Instagram", url: "https://instagram.example.com/37"}
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