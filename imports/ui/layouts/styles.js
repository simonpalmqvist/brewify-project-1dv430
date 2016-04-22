/**
 * @description default styles for app
 * @author simonpalmqvist
 */

const mainColor = "#54BE68";
const greyColor = "#EBEBEB";
const darkGrey = "#969696";
const whiteColor = "#FFF";

const spacing = "20px";
const borderRadius = "6px";

const h2Size = "24px";

const mobileMaxWidth = 780;


const button = {
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "0.05em",
    padding: "10px 40px",
    margin: "10px 0",
    maxWidth: "300px",
    borderRadius,
    display: "block"
};

export const styles = {
    mainColor,
    whiteColor,
    mobileMaxWidth,

    wrapper: {
        maxWidth: "1140px",
        margin: "0 auto",
        padding: spacing
    },

    authWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: mainColor
    },

    center: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
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

    mainButton: [
        button,
        {
            backgroundColor: mainColor,
            color: whiteColor,
            transition: "background-color 0.3s",

            ":hover": {
                backgroundColor: "#49A65A"
            }
        }
    ],

    disabledButton: [
        button,
        {
            backgroundColor: mainColor,
            color: whiteColor,
            opacity: 0.3
        }
    ],

    fixedInput: {
        boxSizing: "border-box",
        padding: "10px",
        textAlign: "center",
        border: `solid 1px ${greyColor}`,
        backgroundColor: whiteColor,
        display: "block",
        width: "100%",
        maxWidth: "300px",
        transition: "box-shadow 0.3s",

        ":focus": {
            boxShadow: `0 0 4px 0px ${darkGrey}`
        }
    },

    input: {
        boxSizing: "border-box",
        padding: "4px",
        backgroundColor: whiteColor,
        display: "block",
        borderRadius: "2px",
        border: "dashed 1px transparent",
        transition: "border 0.2s",

        ":hover": {
            border: `dashed 1px ${darkGrey}`
        },

        ":focus": {
            border: `solid 1px ${darkGrey}`
        }
    },

    disabledInput: {
        boxSizing: "border-box",
        padding: "4px",
        backgroundColor: whiteColor,
        color: darkGrey,
        display: "block"
    },

    logo: {
        width: "200px",
        marginBottom: "-10px"
    },

    h2: {
        fontSize: h2Size
    },

    headerWithImage(img) {
        return {
            fontSize: h2Size,
            backgroundImage: `url(${img})`,
            backgroundSize: "auto 40px",
            backgroundRepeat: "no-repeat",
            padding: "8px 0px 30px 50px",
            display: "block"
        };
    }
};