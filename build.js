({
    appDir: ".",

    dir: "./release",

    mainConfigFile: 'core/main.js',

    fileExclusionRegExp: /^(r|build)\.js|\.idea|.*\.md|\.git.*|.*\.log$/,

    optimizeCss: "standard",

    removeCombined: true

    /* modules: [
        {
            name: "../main"
        }
    ] */
})