import { Application, Router, Status, send } from "https://deno.land/x/oak/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

import analyze from "./nlp.ts";

console.log("launching callisto");

(async function () {
  const app = new Application();
  const router = new Router();

  router
    .get("/api/:term", async ctx => {
      if (ctx.params.term != undefined) {
        ctx.response.body = await analyze(ctx.params.term);
      }
    });

  // Logger
  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });

  // Timing
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use(async (ctx, next) => {
    try {
        await send(ctx, ctx.request.url.pathname, {
            root: path.join('frontend','dist'),
            index: 'index.html',
        })
    } catch (_) {
        await next()
    }
})

  await app.listen({ port: 5000 });
})();
