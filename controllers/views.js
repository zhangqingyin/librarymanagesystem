/*渲染视图控制器*/

var books = require('../models/books');
var booksStock = require('../models/booksStock');
var bookLendHistory = require('../models/bookLendHistory');
var bookApply = require('../models/bookApply');
var userShare = require('../models/userShare');

module.exports = {
    login : function(req, res) {
        res.render('login',{
            title : '图书馆登录'
        });
    },
    index : function(req, res) {
        var user = req.session.user;
        userShare.indexShare(function(bookShare){
            userShare.indexRecommend(function(bookRecommend){
                booksStock.countStock(function(countStock){
                    userShare.countShare(function(countShare){
                        res.render('index',{
                            title : '图书馆首页',
                            username : user.username,
                            role : user.role,
                            item : 1,
                            bookShare :bookShare,
                            bookRecommend : bookRecommend,
                            countStock : countStock,
                            countShare : countShare
                        });
                    });
                });
            });
        });

    },
    share : function(req, res) {
        var user = req.session.user;
        res.render('share',{
            title : '图书评论',
            username : user.username,
            role : user.role,
            item : 2
        });
    },
    procurement : function(req, res) {
        var user = req.session.user;
        res.render('procurement',{
            title : '图书申请采购',
            username : user.username,
            role : user.role,
            item : 3
        });
    },
    user : function(req, res) {
        var user = req.session.user;
        bookLendHistory.lendList(user.id,function(lendList){
            bookApply.applyList(user.id,function(applyList){
                userShare.myShareList(user.id,function(shareList){
                    res.render('user',{
                        title : '借阅历史记录',
                        username : user.username,
                        role : user.role,
                        lendList : lendList,
                        applyList : applyList,
                        shareList : shareList
                    });
                });
            });
        });

    },
    details : function(req, res) {
        var user = req.session.user;
        var id = req.params.id;
        var item = req.params.item;
        books.bookDetails(id,function(results){
            booksStock.stockDetails(id,function(stock){
                bookLendHistory.lendHistory(id,function(lendHistory){
                    userShare.shareList(id,function(shareList){
                        res.render('details',{
                            title : '图书详情',
                            username : user.username,
                            role : user.role,
                            bookData :results,
                            bookStock : stock,
                            lendHistory : lendHistory,
                            shareList : shareList,
                            item : item
                        });
                    });
                });
            });

        });

    },
    admin : function(req, res,next){
        var user = req.session.user;
        if(user.role == 1){
            res.render('admin',{
                title : '图书馆借阅管理',
                username : user.username
            });

        }else{
            next();
        }

    },
    adminProcurement : function(req, res,next){
        var user = req.session.user;
        if(user.role == 1){
            res.render('adminProcurement',{
                title : '图书馆申请采购管理',
                username : user.username
            });

        }else{
            next();
        }

    },
    adminAddInventory : function(req, res,next){
        var user = req.session.user;
        if(user.role == 1){
            res.render('addInventory',{
                title : '图书馆图书入库',
                username : user.username,
                item : 5
            });

        }else{
            next();
        }

    }
};