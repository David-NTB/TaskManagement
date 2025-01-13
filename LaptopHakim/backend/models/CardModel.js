import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import List from "../models/ListModel.js";
import label from "../models/LabelModel.js";

const {DataTypes} = Sequelize;

const Card = db.define('card', {
    card_name: DataTypes.STRING,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    description: DataTypes.TEXT,
    list_id: {
        type: DataTypes.INTEGER,
        references:{
            model: "list",
            key: "id"
        },
    },
    label_id: {
        type: DataTypes.INTEGER,
        references:{
            model: "label",
            key: "id"
        },
    }
}, {
    freezeTableName:true
});

List.hasMany(Card, { foreignKey: "list_id" });
Card.belongsTo(List, { foreignKey: "list_id" });

label.hasMany(Card, { foreignKey: "label_id" });
Card.belongsTo(label, { foreignKey: "label_id" });

export default Card;

(async ()=> {
    await db.sync();
})();