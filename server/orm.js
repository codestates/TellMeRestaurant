const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(
    "tellMeRestaurant",
    "admin",
    "123123123",
    {
        host : "project1.csb2krxqpkqq.ap-northeast-2.rds.amazonaws.com",
        dialect : "mysql",
        directory : './models',
        port : "3306",
        tables : ["user"]
    }
    );
auto.run((err) => {
    if(err) throw console.log(err);
})