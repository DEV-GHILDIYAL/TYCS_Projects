import userModel from "../models/userModel.js";

export const addstudent = async (req, res) => {
    const { email,name,rollNo,batch,department,year } = req.body;
  try {

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      console.error("User exist with this email:", email);
      return res.status(401).json({ message: "Email exist" });
    }
     
    const newS = new userModel({
        name,email,rollNo,batch,department,year
    });
    
    await newS.save();
    res.status(201).json({ message: 'Student added', newS });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Unable to add Student" });
  }
};
