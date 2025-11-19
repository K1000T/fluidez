require("dotenv").config({ path: "./.env.local" });
const v = process.env.POSTGRES_URL;
console.log(v ? ("POSTGRES_URL definida (masked): " + v.replace(/:(.*)@/," :***@")) : "POSTGRES_URL NO definida");
