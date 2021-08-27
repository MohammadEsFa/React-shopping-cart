export const formatcurrency = (num) => {
    return "$" + Number(num.toFixed(1)).toLocaleString() + "";
}