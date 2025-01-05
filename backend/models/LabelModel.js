import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Label = db.define('label', {
    label_name: DataTypes.STRING
}, {
    freezeTableName:true
});

export default Label;

(async ()=> {
    await db.sync();
})();