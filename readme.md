# Game Download Gather - Website
Game Download Gather/HydraSearch is a website that combines several video game download sites into one. It works simply: you search for a game, and you can see links to download it from different sources.

<p align="center">
  <img src="https://github.com/user-attachments/assets/0d0c389d-9ab2-4c98-b0cc-564c9026b105" width="747" />
</p>

## 🚀 Features:
- Modern and Responsive Design
- Integration with the Giant Bomb API for searching
- Ease of use

## ❓ How to Test the Website
This website is not hosted and I don't plan to host it anytime soon; it's a project created for entertainment. If you'd like to try it, you'll need to download the project and run it locally. I use Visual Studio Code with the Live Server extension installed, but you can use any method you prefer. You need to run the index.html file.

You'll need a Giantbomb API key if you want to properly test the website. To get it:
1. Visit https://www.giantbomb.com/api/ and get an API key. You will need to create an account.
2. Create a .env file on the project's root folder containing this: `GIANTBOMB_API_KEY=yourapikeyhere`.
3. While you are running index.html, run `node server.js`. If, for example, you have Visual Studio Code, you can do it in the console.

**NOTE:** Run `npm install` before server.js to install the necessary dependencies.

## ⬇️ Sources
These are the sites that are included on the website for downloading games.
### PC Stores
- [Steam](https://store.steampowered.com/)
- [Epic Games Store](https://www.epicgames.com/store/)
- [GOG](https://www.gog.com/)
### Mobile Stores
- [Google Play Store](https://play.google.com/store)
- [Apple App Store](https://www.apple.com/app-store/)
### Repacks:
- Fitgirl Repacks
- DODI Repacks
### Direct Downloads:
- SteamRIP
- Ankergames
- GOGgames
### Roms:
- Vimm
- CrocDB

> ⚠️ **Legal notice:** This project is provided for educational and research purposes only.  
> It does *not* host any game files. All external links should point to officially licensed and legal content.  

