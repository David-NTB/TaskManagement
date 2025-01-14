import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "../models/UserModel.js"
import Card from "../models/CardModel.js"

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

User.hasMany(Member, { foreignKey: "user_id" });
Member.belongsTo(User, { foreignKey: "user_id" });

Card.hasMany(Member, { foreignKey: "card_id" });
Member.belongsTo(Card, { foreignKey: "card_id" });

export default Member;

(async ()=> {
    await db.sync();
})();