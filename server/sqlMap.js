// sql语句
var sqlMap = {
    // 用户
    queryAdmin: 'select * from admin where userName=? and userPassword=?',
    queryBooks: 'select * from book',
    querySaleBook: 'select * from book where bookId=? and bookNum>=?',
    saleBook: 'update book set bookNum=bookNum-? where bookId=?',
    insertSaleRecord: 'insert into saleTable values(?, ?, ?, ?)',
    querySaleRecord: 'select * from saleTable where bookId=? and customerName=? and saleCount>=?',
    insertReturnRecord: 'insert into returnTable values(?, ?, ?, ?)'
}

module.exports = sqlMap;