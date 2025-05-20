import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUser = req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        res.status(200).json(filterUsers);
    }
    catch(err){
        console.error("Error Message in getUsersForSidebar: " + err.message);
        res.status(500).json({err : "Internal Server Error:"});
    }
};

export const getMessages = async (req, res) => {
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId:userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages);
    }
    catch(err){
        console.error("Error Message in getMessages: " + err.message);
        res.status(500).json({err : "Internal Server Error:"});
    }
};

export const sendMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
    
        });
        await newMessage.save();

        // todo>  realtime functionality goes here => socket.io

        res.status(200).json(newMessage);

    }catch(err){
        console.error("Error Message in sendMessage controller: " + err.message);
        res.status(500).json({err : "Internal Server Error:"});
    }
}