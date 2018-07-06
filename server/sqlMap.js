// sql语句
var sqlMap = {
  // 用户
  queryAdmin: 'select * from admin where userName=? and userPassword=?',
  queryBooks: 'select * from book',
  queryBook: 'select * from book where bookName like ?',
  querySaleBook: 'select * from book where bookId=? and bookNum>=?',
  saleBook: 'update book set bookNum=bookNum-? where bookId=?',
  insertSaleRecord: 'insert into saleTable values(?, ?, ?, ?)',
  querySaleRecord: 'select * from saleTable where bookId=? and customerName=? and saleCount>=?',
  insertReturnRecord: 'insert into returnTable values(?, ?, ?, ?)',
  querySaleRecordByTime: 'select saleTable.saleTime, saleTable.saleCount, book.bookName, book.bookInfo, saleTable.customerName from saleTable, book where book.bookId = saleTable.bookId and saleTime >= ? and saleTime <= ?',
  querypurchaseTableByTime: 'select purchasetable.purchaseTime, purchasetable.purchaseCount, book.bookName, book.bookInfo, provider.providerName from purchasetable, book, provider where provider.providerId = purchasetable.providerId and purchaseTime >= ? and purchaseTime <= ? and purchasetable.bookId = book.bookId',
  queryProviderInfo: 'select * from provider, quotedPrice, book where provider.providerId = quotedPrice.providerId and quotedPrice.bookId = book.bookId',
  queryIsOwnBook: 'select * from reportory where reportory.bookId == ?',
  updateBookNum: 'update book set bookNum = ? where bookId = ?',
  purchaseBook: 'insert into purchaseTable values(?, ?, ?, ?)'
}

module.exports = sqlMap
