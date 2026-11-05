import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {

    try {

        const { token } = req.headers
        if (!token) {
            return res.json({success: false, message: "Not authorized, try logging in again!"})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Not authorized, try logging in again!"})
        }
        next()

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error occurred while authenticating admin!"})
    }
}

export default adminAuth