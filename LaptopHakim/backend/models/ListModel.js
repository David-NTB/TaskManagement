import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const List = db.define('list', {
    list_name: DataTypes.STRING,
}, {
    freezeTableName:true
});

export default List;

(async ()=> {
    await db.sync();
})();