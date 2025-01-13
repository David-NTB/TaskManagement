import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Member = db.define('member', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "user",
            key: "id"
        },
    },
    card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "card",
            key: "id"
        },
    }
}, {
    freezeTableName:true
});

export default Member;

(async ()=> {
    await db.sync();
})();