import User from "../model/userModel.js";

export const createNewAccount = async (req, res) => {
    try {
        const { name, email, photoURL } = req.body;
        const checkIf = await User.findOne({ email: email });
        if (!checkIf) {
            const newUser = new User({ name, email, photoURL });
            await newUser.save();
            return res.status(201).json(newUser)
        }
        res.status(200).json(checkIf)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    }
}

