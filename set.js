const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVjS0dsVzVUb0lyTmtHdFlWZ1FwZUhxaFFUTGJQbFNsQ3NXM0NHeUgxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzdiL3ZCY0c4YnViZGZMbVdKNGpkSXY4VDhyd1BtcHJSanVoY0ZaTHoyND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTnBMTm1OaHg3QnUzRHVIRmx6RVJrbUNjL0UraDBFbDdyMSsveHc0SFZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3bVpaR3g0eHdrRXBKbldkanBjSlFQdGNqN1o1djhaaExxTGtxd25kVENJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZMaG55bzhoY0FKK1dJbC85SHZvV3JtZXRCVytsdjMrbU93Zno5Wk5WVTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpiU2kvVDBhRXNyODl1dVp4WGVDWW9wWWVMUXk5VUxIb29BeGJxWkd3alk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU5nWnZsLzZTMzkwVjB3d3J5TDJKRk83eTFtWVhaSE9uWmVLSGJmRnNVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV3Rreno4bjlML1ZYVmdxN3ZndVFMdjBJMkJuVnpmTEx1dklFTmJEWFVRST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBQZUI1QklwR0VlOXZqYnRCWWQxU2RDSTB3Wm82ajNJaUM0NlJ6amsrQ3BLd1UzK0xKZlplQ3FNeGxNd2l0TGlQSUZLQ1JWdGp3L1JRdFZNWFNFQ2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ4LCJhZHZTZWNyZXRLZXkiOiJpVHNIcVYvdFk2UlRwK3lQZkhxMG5FU0JkQ0U2bGhBRFA3NXlDUG1BRm4wPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFZHNRMnNRa1NQYVNQcC1DRW9BLUdRIiwicGhvbmVJZCI6ImU2MzNlODY2LWQ2NWItNDVlMC04ODk4LWI0YTJlYTQxMWI0NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtOENrOVZleHFvK1o4WGJoQ1oxaE1kMlBwSGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1IxTVhZeVUzSExwaW1TSFBSOWZNcldzaWhjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktGN1lUWEI3IiwibWUiOnsiaWQiOiIyNTQ3MTMxNDU2MTg6MzlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BTaTdNMEZFUEg2dExVR0dBNGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZIVU5HN3QwRWM4ZmlScEFDK0E4cjh1TWhxVWtydGhTRFlYSVVSZ0NhQ289IiwiYWNjb3VudFNpZ25hdHVyZSI6IjB6RFhRZWNaQ0FNa0JvS1l6MVBCV1pyaWVVazhIOTV1Y2YyYngrSS80Y3VmSkdsUTJsMWUyeHB5b3g4OW1SM0NhbFg0aURJMDB6NVVLTEIxTFIwaEFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2b2NTTG53WG1La3IyYXQ5bmRvL3YvMTRnRkEzcUpTVEZaWG1CRlVRVUZPczZhTnR1RE9EaWhKS3dyZWZ6ZHYwZGpvZUZHT1F0Y0U4OVVmR2dXZmVnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxMzE0NTYxODozOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYeDFEUnU3ZEJIUEg0a2FRQXZnUEsvTGpJYWxKSzdZVWcyRnlGRVlBbWdxIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNjI5NTAyfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Brian ongeri",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Brian ongeri",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
