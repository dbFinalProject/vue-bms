// sql语句
var sqlMap = {
  // 管理员登陆查询
  queryAdmin: 'select * \
               from admin \
               where userName=? and userPassword=?',
  // 查询所有图书
  queryBooks: 'select * \
               from reportory, book \
               where reportory.bookId = book.bookId',
  // 查询指定图书
  queryBook: 'select * \
              from reportory, book \
              where reportory.bookId = book.bookId and and book.bookName like ?',
  // 查看库存
  viewReportory: 'select * \
                  from reportory \
                  where bookId=? and count>=?',
  // 查询销售排行
  queryRankList: 'select saletable.bookId, bookName, bookInfo, sum(saleCount) as saleCount, sum(saleAmount) as saleAmount \
                  from saletable, book \
                  where saletable.bookId = book.bookId and Date(saleTime) >= ? and Date(saleTime) <= ? \
                  group by saletable.bookId \
                  order by sum(saleCount) desc',
  // 销售图书后更新库存
  saleBook: 'update reportory \
             set count=count-? \
             where bookId=?',
  // 插入销售记录
  insertSaleRecord: 'insert into saleTable values(?, ?, ?, ?, ?)',
  // 查询销售记录
  querySaleRecord: 'select ifnull(sum(saleCount),0) as saleTotalCount \
                    from saleTable \
                    where bookId=? and customerName=?; \
                    select ifnull(sum(returnCount), 0) as returnTotalCount \
                    from returnTable \
                    where bookId=? and customerName=?;',
  // 插入退购记录
  insertReturnRecord: 'insert into returnTable values(?, ?, ?, ?, ?)',
  // 根据时间段查询销售记录
  querySaleRecordByTime: 'select *, (saleCount * price) as sale \
                          from saleTable, book, reportory \
                          where book.bookId = saleTable.bookId \
                                and reportory.bookId = book.bookId \
                                and Date(saleTime) >= ? \
                                and Date(saleTime) <= ?',
  // 根据时间查询进购记录
  queryPurchaseTableByTime: 'select * , (purchaseCount * qPrice) as pray \
                             from purchasetable, book, provider, quotedprice \
                             where provider.providerId = purchasetable.providerId \
                                   and provider.providerId = quotedprice.providerId \
                                   and Date(purchaseTime) >= ? and Date(purchaseTime) <= ? \
                                   and purchasetable.bookId = book.bookId \
                                   and quotedprice.bookId = book.bookId',
  // 根据时间查询进购记录
  queryReturnRecordByTime: 'select *, (returnCount * price) as ret \
                            from returnTable, book, reportory \
                            where book.bookId = returnTable.bookId \
                                  and reportory.bookId = book.bookId \
                                  and Date(returnTime) >= ? \
                                  and Date(returnTime) <= ?',
  // 查询供货商信息
  queryProviderInfo: 'select * \
                      from provider, quotedPrice, book \
                      where provider.providerId = quotedPrice.providerId \
                            and quotedPrice.bookId = book.bookId',
  // 根据bookId查询该书是否已有库存
  queryIsOwnBook: 'select * \
                   from reportory \
                   where reportory.bookId = ?',
  // 更新图书数量
  updateBookNum: 'update reportory set count = ? \
                  where bookId = ?',
  // 插入进购记录
  purchaseBook: 'insert into purchaseTable values(?, ?, ?, ?, ?)',
  // 更新图书价格
  updateBookPrice: 'update reportory set price = ? \
                    where bookId = ?',
  // 插入仓库
  insertReportory: 'insert reportory values(?, ?, ?)'
}

module.exports = sqlMap
