const {defineConfig} = require("@vue/cli-service");

module.exports = defineConfig({
    lintOnSave: process.env.NODE_ENV !== "production",
    publicPath: "/vueTMDB/",
    transpileDependencies: ["vuetify"]
});
