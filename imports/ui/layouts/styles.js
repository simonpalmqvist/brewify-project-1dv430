/**
 * @description default styles for app
 * @author simonpalmqvist
 */

const mainColor = "#54BE68";
const whiteColor = "#FFF";

const spacing = "20px";
const borderRadius = "6px";

export const styles = {
    mainColor,
    whiteColor,

    wrapper: {
        maxWidth: "1140px",
        margin: "0 auto",
        padding: spacing
    },
    header: {
        backgroundColor: mainColor,
        color:"#FFF"
    },


    contentBox: {
        backgroundColor: whiteColor,
        borderRadius,
        padding: spacing,
        marginBottom: spacing
    },

    mainButton: {
        cursor: "pointer",
        backgroundColor: mainColor,
        color: whiteColor,
        fontSize: "20px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        padding: "10px 40px",
        marginBottom: "10px",
        borderRadius
    },

    logo: {
        width: "200px",
        marginBottom: "-10px"
    },

    headerWithImage(img) {
        return {
            fontSize: "24px",
            backgroundImage: `url(${img})`,
            backgroundSize: "auto 34px",
            backgroundRepeat: "no-repeat",
            padding: "8px 0px 30px 40px",
            display: "block"
        };
    }
};