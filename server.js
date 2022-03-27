// @ts-check

const path = require('path');
const http = require("http");
const crypto = require("crypto");

const key = crypto.randomBytes(16);

const express = require("express");
const axios = require("axios").default;
const jsonwebtoken = require("jsonwebtoken")

const app = express();
const httpServer = http.createServer(app);


/**
 * @param {string} data 
 */
 function encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-128-gcm", key, iv);
    return {
        data: Buffer.concat([ cipher.update(Buffer.from(data, "utf-8")), cipher.final(), ]).toString("hex"),
        iv: iv.toString("hex"),
        authTag: cipher.getAuthTag().toString("hex") // keep after cipher.final()
    }
}

/**
 * @param { {iv: string, data: string, authTag: string} } encrypted 
 * @returns 
 */
function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv("aes-128-gcm", key, Buffer.from(encrypted.iv, "hex"));
    decipher.setAuthTag(Buffer.from(encrypted.authTag, "hex"));
    const decrypted = Buffer.concat([ decipher.update(Buffer.from(encrypted.data, "hex")), decipher.final() ]);
    return decrypted.toString()
}


app.get("/api/login", async (req, res) => {

    console.log(req.query)

    let code = `${req.query.code}`;

    let { token, err } = await getDiscordToken({ code: code })

    if (err) {
        console.log(err)
        res.status(500)
    } else {
        console.log(`token from discord: `, token)

        // let encryptedDiscordToken = encrypt(token.access_token);
        // let base64EncryptedToken = Buffer.from(JSON.stringify(encryptedDiscordToken)).toString("base64");
        // let jwt = jsonwebtoken.sign({ discordToken: base64EncryptedToken }, "secret");

        let jwt = jsonwebtoken.sign({ discordToken: token.access_token }, "secret");

        res.send({ jwt: jwt })
    }

    res.end()
})

/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param {*} next
 */
const checkHasTokenHeader = async (req, res, next) => {

    let jwtHeader = req.headers["token"] + "";

    if (!jwtHeader) {
        res.status(401).end()
        return
    }
    jsonwebtoken.verify(jwtHeader, "secret", (err, decodedJwt) => {
        if (err || !decodedJwt || !decodedJwt["discordToken"]) {
            res.status(401).end();
        } else {
            // let encryptedToken = JSON.parse(Buffer.from(decodedJwt["discordToken"], "base64").toString())
            // let decrypted = decrypt(encryptedToken)
            // console.log({decrypted})
            // res.locals._discordToken = decrypted;

            res.locals._discordToken = decodedJwt["discordToken"];

            next();
        }
    })
}

app.get("/api/info", checkHasTokenHeader, async (req, res) => {

    let token = res.locals._discordToken
    console.log({ token })

    let { userInfo, err } = await getDiscordInfo({ token: token })

    if (err) {
        console.log(err.message)
        res.status(500)
    } else {
        console.log("userInfo", userInfo)
        res.send(userInfo)
    }
    res.end()
})

app.use((err, req, res, next) => {
    res.status(500).end()
})

httpServer.listen(8080, () => {
    console.log(`httpServer.listen ~ 8080`)
});


/**
 * @param { {code: string} } params
 * @returns { Promise<{ err?: any, token: { access_token: string, expires_in: number, refresh_token: string, scope: string, token_type: string } }> }
 */
async function getDiscordToken({ code }) {

    const form = new URLSearchParams()
    form.append('client_id', "")
    form.append('client_secret', "")
    form.append('redirect_uri', `http://localhost:4200/authorize`)
    form.append('grant_type', `authorization_code`)
    form.append('scope', `identify email`)
    form.append('code', code)

    return axios({
        url: 'https://discordapp.com/api/oauth2/token',
        method: 'post',
        data: form

    }).then((resp) => {
        return { err: null, token: resp.data }
    }).catch(e => {
        return { err: e, token: null }
    })
}

/**
 * @param { {token: string} } params
 * @returns { Promise<{ err?: any, userInfo: { id: string, username: string, avatar: string, discriminator: string, public_flags: number, flags: number, banner: any, banner_color: any, accent_color: any, locale: 'fr' | string, mfa_enabled: boolean, email: string, verified: boolean } }> }
*/
async function getDiscordInfo({ token }) {

    return axios({
        url: 'https://discordapp.com/api/users/@me',
        method: 'get',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

    }).then((resp) => {
        return { err: null, userInfo: resp.data }
    }).catch(e => {
        return { err: e, userInfo: null }
    })
}
