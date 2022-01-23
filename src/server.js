import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import bodyParser from "body-parser";
import session from "express-session";
import sessionFileStore from "session-file-store";
import * as sapper from "@sapper/server";

const FileStore = sessionFileStore(session);

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka()
  .use(bodyParser.json())
  .use(
    session({
      secret: "conduit",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000,
      },
      store: new FileStore({
        path: `.sessions`,
      }),
    })
  )
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req) => ({
        token: req.session && req.session.token,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
