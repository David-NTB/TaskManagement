import { Sequelize } from "sequelize";
import db from "../config/Database.js";

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

export default Card;

(async ()=> {
    await db.sync();
})();