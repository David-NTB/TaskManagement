import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('user', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName:true
});

export default User;

(async ()=> {
    await db.sync();
})();