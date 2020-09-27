const run = require("./run");
const argv = require("yargs");
require("dotenv").config();

argv
    .command(['long', "l"], "long-term (over the course of several years)", {}, () =>
        run('long_term')
    )
    .command(['medium', "m"], "medium-term (over 6 months)", {}, () =>
        run('medium_term')
    )
    .command(['short', "s"], "short-term (over 4 weeks)", {}, () =>
        run('short_term')
    ).argv;
