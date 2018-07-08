CREATE USER 'bmsAdmin'@'localhost' IDENTIFIED BY 'dbFinalProject';
GRANT ALL ON bms.* TO 'bmsAdmin'@'localhost';
create database if not exists bms;
use bms; 

drop table if exists returnTable;
drop table if exists purchaseTable;
drop table if exists saleTable;
drop table if exists quotedPrice;
drop table if exists reportory;
drop table if exists admin;
drop table if exists book;
drop table if exists provider;

/* 管理员 */
create table admin (
	userName char(10) not null,
	userPassword char(10) not null,
	primary key(userName)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into admin values("admin", "123456");

/* 书本 */
create table book (
	bookId int AUTO_INCREMENT not null,
	bookName char(255) default null,
	bookInfo char(255) default null,
	bookDate datetime default null,
	primary key(bookId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into book values(null,"操作系统原理", "机械工业出版社", "2015-01-03");
insert into book values(null,"数据库管理系统", "高等教育出版社", "2013-06-12");
insert into book values(null,"计算机组成与设计", "清华大学出版社", "2002-1-2");
insert into book values(null,"图解设计模式", "人民邮电出版社", "2014-03-02");
insert into book values(null,"Flask Web 开发", "人民邮电出版社", "2010-2-8");
insert into book values(null,"计算机科学概论", "机械工业出版社", "2013-12-2");
insert into book values(null,"离散数学结构", "高等教育出版社", "2011-10-21");
insert into book values(null,"高等数学", "北京大学出版社", "2012-5-12");
insert into book values(null,"挑战程序设计", "人民邮电出版社", "2009-10-23");
insert into book values(null,"C大学教程", "电子工业出版社", "2011-11-3");
insert into book values(null,"C++ primer", "人民邮电出版社", "2012-12-4");
insert into book values(null,"数据结构", "清华大学出版社", "2014-6-21");
insert into book values(null,"云计算", "机械工业出版社", "2017-7-25");
/* 供应商 */
create table provider (
	providerId int not null AUTO_INCREMENT,
	providerName char(40) not null,
	providerAddr char(255) not null,
	providerPhone char(11) not null,
	primary key(providerId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into provider values(null, '太平洋书城', '无锡市解放东路123号', '13532032112');
insert into provider values(null, '红月亮书店', '无锡市中山西路233号', '13530629775');
insert into provider values(null, '亚马逊书城', '无锡市中山东路5号', '15624106589');
insert into provider values(null, '新华书店', '无锡市惠河路45号', '13532038888');

/* 报价表 */
create table quotedPrice(
	providerId int not null,
	bookId int not null,
	qPrice double default 0,
	primary key(providerId, bookId),
	foreign key(providerId) references provider(providerId),
	foreign key(bookId) references book(bookId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 太平洋书城 */
insert into quotedPrice values(1, 1, 64);
insert into quotedPrice values(1, 2, 45);
insert into quotedPrice values(1, 3, 101);
insert into quotedPrice values(1, 4, 30);
insert into quotedPrice values(1, 5, 55);
insert into quotedPrice values(1, 7, 108);
insert into quotedPrice values(1, 8, 50);
insert into quotedPrice values(1, 10, 120);
insert into quotedPrice values(1, 11, 88);
insert into quotedPrice values(1, 12, 65);

/* 红月亮书店 */
insert into quotedPrice values(2, 1, 64);
insert into quotedPrice values(2, 2, 45);
insert into quotedPrice values(2, 3, 101.85);
insert into quotedPrice values(2, 4, 101.85);
insert into quotedPrice values(2, 5, 30);
insert into quotedPrice values(2, 6, 55);
insert into quotedPrice values(2, 7, 108);
insert into quotedPrice values(2, 8, 50);
insert into quotedPrice values(2, 9, 120);
insert into quotedPrice values(2, 11, 88);
insert into quotedPrice values(2, 12, 65.5);

/* 亚马逊书城 */
insert into quotedPrice values(3, 1, 60.5);
insert into quotedPrice values(3, 2, 45.2);
insert into quotedPrice values(3, 3, 100.1);
insert into quotedPrice values(3, 4, 101.85);
insert into quotedPrice values(3, 5, 29.8);
insert into quotedPrice values(3, 6, 55.3);
insert into quotedPrice values(3, 7, 108.4);
insert into quotedPrice values(3, 8, 49);
insert into quotedPrice values(3, 9, 111);
insert into quotedPrice values(3, 11, 89);
insert into quotedPrice values(3, 12, 67.2);

/* 新华书店 */
insert into quotedPrice values(4, 1, 64);
insert into quotedPrice values(4, 2, 55);
insert into quotedPrice values(4, 3, 97);
insert into quotedPrice values(4, 4, 109);
insert into quotedPrice values(4, 5, 37.5);
insert into quotedPrice values(4, 9, 120);
insert into quotedPrice values(4, 11, 88);

/* 仓库书本 */
create table reportory(
	bookId int not null,
	price double default 0,
	count int default 0,
    primary key(bookId),
	foreign key(bookId) references book(bookId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 销售表 */
create table saleTable (
	bookId int not null,
	saleTime datetime not null,
	saleCount int default 1,
	customerName char(40),
    saleAmount int,
	foreign key(bookId) references book(bookId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 进货表 */ 
create table purchaseTable (
	providerId int not null,
	bookId int not null ,
	purchaseTime datetime not null,
	purchaseCount int default 1,
    purchaseAmount int,
	primary key(purchaseTime),
	foreign key(bookId) references book(bookId),
	foreign key(providerId) references provider(providerId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 退货表 */
create table returnTable (
	bookId int not null ,
	returnTime datetime not null,
	returnCount int default 0,
    customerName char(40),
    returnAmount int,
	foreign key(bookId) references book(bookId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 销售 */
drop procedure if exists saleBook;
delimiter //
create procedure saleBook(in bookId int, in saleCount int, in saleTime datetime, in customerName char(40), in saleAmount int)
begin 
	/* 插入销售记录 */
	insert into saleTable values(bookId, saleTime, saleCount, customerName, saleAmount);
    /* 更新库存 */
    update reportory set count = count - saleCount where reportory.bookId = bookId;
end//
delimiter ;

/* 退货 */
drop procedure if exists returnBook;
delimiter //
create procedure returnBook(in bookId int, in returnCount int, in returnTime datetime, in customerName char(40), in returnAmount int)
begin 
	/* 插入退货记录 */
    insert into returnTable values(bookId, returnTime, returnCount, customerName, returnAmount);
    /* 修改库存 */
    update reportory set count = count + returnCount where reportory.bookId = bookId;
end//
delimiter ;

/* 进货 */
drop procedure if exists purchaseBook;
delimiter //
create procedure purchaseBook(in providerId int, in bookId int, in purchaseTime datetime, in purchaseCount int, in purchaseAmount int)
begin 
	/* 插入进货记录 */
	insert into purchaseTable values(providerId, bookId, purchaseTime, purchaseCount, purchaseAmount);
    /* 修改库存，没有则插入，存在则更新 */
    insert into reportory(bookId, count) VALUES(bookId, purchaseCount) ON DUPLICATE KEY UPDATE count = count + purchaseCount;
end//
delimiter ;
