module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "~@/assets/scss/_colors.scss";
                @import "~@/assets/scss/_typography.scss";
                @import "~@/assets/scss/_bootstrap-override.scss";
                @import "~@/assets/scss/_mixins.scss";
                @import "~bootstrap/scss/functions";
                @import "~bootstrap/scss/variables";                
                @import "~bootstrap/scss/mixins";
                `
            }
        }
    },
}