// data.js

const JUEGOS_DESTACADOS = [
    {
        id: 36765,
        titulo: "Grand Theft Auto V",
        image_url: "https://cdn1.epicgames.com/offer/b0cd075465c44f87be3b505ac04a2e46/EGS_GrandTheftAutoVEnhanced_RockstarNorth_S1_2560x1440-906d8ae76a91aafc60b1a54c23fab496"
    },
    {
        id: 56725, 
        titulo: "Red Dead Redemption 2",
        image_url: "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg"
    },
    {
        id: 78950,
        titulo: "Marvel's Spider-Man: Miles Morales",
        image_url: "https://gaming-cdn.com/images/products/12953/orig/marvel-s-spider-man-miles-morales-pc-juego-steam-cover.jpg?v=1713944644"
    },
    {
        id: 82985, 
        titulo: "Forza Horizon 5",
        image_url: "https://image.api.playstation.com/vulcan/ap/rnd/202502/1300/01248ef12bf2841c3b97bc1af344f922e5cbbf7a8870e0f8.jpg"
    },
    {
        id: 80643, 
        titulo: "God of War Ragnarök",
        image_url: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/11/consigue-god-war-ragnarok-launch-edition-monton-merchandising-solo-game-2867261.jpg?tf=3840x"
    },
];

const JUEGOS_POR_GENERO = [
    {
        genero: "Action",
        juegos: [
            { id: 73745, titulo: "Elden Ring", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3532465-2909474649-co4jn.png" },
            { id: 80643, titulo: "God of War Ragnarök", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3532837-0378849544-co5s5.png" },
            { id: 83881, titulo: "Spider-Man 2", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3533936-5655705013-co79v.png" },
            { id: 56725, titulo: "Red Dead Redemption II", image_url: "https://www.giantbomb.com/a/uploads/original/5/56742/3018545-3469813732-redde.jpg" }
        ]
    },
    {
        genero: "Shooter",
        juegos: [
            { id: 38039, titulo: "Call of Duty: Black Ops 2", image_url: "https://www.giantbomb.com/a/uploads/original/8/82063/2555390-blops2.jpg" },
            { id: 27006, titulo: "Battlefield 3", image_url: "https://www.giantbomb.com/a/uploads/original/8/87790/2960763-box_bf3.png" },
            { id: 68917, titulo: "Doom Eternal", image_url: "https://www.giantbomb.com/a/uploads/original/0/176/3163865-cover_art_of_doom_eternal.png" },
            { id: 73771, titulo: "Deathloop", image_url: "https://www.giantbomb.com/a/uploads/original/45/459166/3251334-deathloop.jpg" }
        ]
    },
    {
        genero: "Role-Playing",
        juegos: [
            { id: 73727, titulo: "Baldur's Gate 3", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3579980-100a5dc417414ddb04630e98c7ce49c00059a6c30aba826ec.jpg" },
            { id: 84787, titulo: "Final Fantasy VII Rebirth", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3553803-2199476859-GHXYCDYWEAAZW_o.jpg" },
            { id: 86568, titulo: "Dragon's Dogma 2", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3559692-916b7de8938fa4ff658296086312a6cc386e5fb8c9d17275c.jpg" },
            { id: 68921, titulo: "Starfield", image_url: "https://www.giantbomb.com/a/uploads/original/0/1992/3382135-5994371684-Capa_.jpg" }
        ]
    },
    {
        genero: "Action-Adventure",
        juegos: [
            { id: 41355, titulo: "The Legend of Zelda: Breath Of The Wild", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3540553-2920687-thelegendofzelda-breathofthewildv8.jpg" },
            { id: 33394, titulo: "The Elder Scrolls V: Skyrim", image_url: "https://www.giantbomb.com/a/uploads/original/0/3661/1895988-skyrim.png" },
            { id: 80641, titulo: "Hogwarts Legacy", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3532851-8395372141-EGS_HogwartsLegacy_AvalancheSoftware_S2_1200x1600-2bb94423bf1c7e2fca10577d9f2878b9.jpg" },
            { id: 48412, titulo: "Hollow Knight", image_url: "https://www.giantbomb.com/a/uploads/original/24/240391/3355540-co1rgi.png" }
        ]
    },
    {
        genero: "Fighting",
        juegos: [
            { id: 85547, titulo: "Street Fighter 6", image_url: "https://www.giantbomb.com/a/uploads/original/33/338034/3430939-0687451623-apps.59767.14292384283824656.ca6a1643-b1bc-4054-ac12-faa77321c653.5e742961-aa3f-4ce1-9dcd-6abe2f444da6.jpg" },
            { id: 87035, titulo: "Tekken 8", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3543475-2243726843-co7lb.png" },
            { id: 89187, titulo: "Mortal Kombat 1", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3534578-6213457120-co6i4.png" },
            { id: 74572, titulo: "The King of Fighters XV", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3760087-3576291650-EGS_THEKINGOFFIGHTERSXV_SNKCORPORATION_S2_1200x1600-5bf30907b3472a4d4bfed10e93fc7135.jpg" }
        ]
    },
    {
        genero: "Sports",
        juegos: [
            { id: 86127, titulo: "Fifa 23", image_url: "https://www.giantbomb.com/a/uploads/original/0/1992/3391975-1241238642-f23-g.jpg" },
            { id: 86772, titulo: "NBA 2K23", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3537315-7714853682-co55z.png" },
            { id: 90104, titulo: "F1 23", image_url: "https://www.giantbomb.com/a/uploads/original/20/201266/3552719-1273644441-EGS_F123_Codemasters_S2_1200x1600-9ee0158a6d9f052deb753af836f9bd8d.jpg" },
            { id: 88361, titulo: "WWE 2K23", image_url: "https://www.giantbomb.com/a/uploads/original/33/338034/3442466-1828890575-b6df3.jpg" }
        ]
    }
];

module.exports = { JUEGOS_DESTACADOS, JUEGOS_POR_GENERO };
