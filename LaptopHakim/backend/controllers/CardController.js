import Card from "../models/CardModel.js";

export const getAllCards = async (req, res) => {
    try {
        const response = await Card.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCardById = async (req, res) => {
    try {
        const { list_id } = req.query;
        const whereClause = list_id ? { list_id } : {};
    
        const response = await Card.findAll({ where: whereClause });
        res.status(200).json(response);
      } catch (error) {
        console.log(error.message);
      }
}
 
export const createCard = async (req, res) => {
    try {
        await Card.create(req.body);
        res.status(201).json({ msg: "Card Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCard = async (req, res) => {
    try {
        await Card.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Card Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCard = async (req, res) => {
    try {
        await Card.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Card Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}