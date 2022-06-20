require('dotenv').config();

const Koa = require("koa");
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const axios = require("axios");

const PORT = process.env.PORT;
console.log("Connect server on port " + PORT);

const app = new Koa();

app.use(cors());
app.use(koaBody());

app.use(async (ctx) => {
    const { body, query, header } = ctx.request;
    const { url, method } = query;
    let resp;

    try {
        const { data } = await axios({
            method: method || "get",
            url,
            data: body,
            headers: header
        });

        resp = data;
    } catch (e) {
        ctx.status = 400;
        resp = {
            error: e,
            msg: "Có lỗi xảy ra rồi !!!"
        };
    }

    ctx.body = resp;
});

app.listen(PORT);