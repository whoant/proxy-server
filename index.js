const Koa = require("koa");
const koaBody = require('koa-body');
const axios = require("axios");

const app = new Koa();

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

app.listen(3000);