// Controller to GET an image from public
const getImage = (req, res) => {
    const { imageName } = req.params;
    const location = `./express-server/public/`;

    res.sendFile(imageName, {root: location});
}

// Export controllers as object's fields
module.exports = { getImage }