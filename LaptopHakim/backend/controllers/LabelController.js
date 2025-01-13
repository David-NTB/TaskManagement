import Label from "../models/LabelModel.js";

export const getLabels = async (req, res) => {
    try {
        const response = await Label.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLabelById = async (req, res) => {
    try {
        const response = await Label.findOne( {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const createLabel = async (req, res) => {
    try {
        await Label.create(req.body);
        res.status(201).json({ msg: "Label Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateLabel = async (req, res) => {
    try {
        await Label.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Label Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteLabel = async (req, res) => {
    try {
        await Label.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Label Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}