// sql语句
var sqlMap = {
    // 用户
    queryAdmin: 'select * from admin where userName=? and userPassword=?',
    queryBooks: 'select * from book',
    purchaseBook: 'update book set bookNum=bookNum-? where bookId=?'
}

module.exports = sqlMap;