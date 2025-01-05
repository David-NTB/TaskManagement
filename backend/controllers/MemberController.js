import Member from "../models/MemberModel.js";

export const getMembers = async (req, res) => {
    try {
        const response = await Member.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getMemberById = async (req, res) => {
    try {
        const response = await Member.findOne( {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const createMember = async (req, res) => {
    try {
        await Member.create(req.body);
        res.status(201).json({ msg: "Member Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateMember = async (req, res) => {
    try {
        await Member.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Member Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteMember = async (req, res) => {
    try {
        await Member.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Member Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}