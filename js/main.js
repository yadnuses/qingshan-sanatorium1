(function() {
    'use strict';

    var CONFIG = {
        version: '1.0',
        keywordsPath: './js/keywords.json',
        resultPage: './pages/search-results.html'
    };

    var AppState = {
        keywords: null,
        keywordMap: {},
        isLoaded: false
    };

    var KeywordSearch = {
        init: function() { this.loadKeywords(); },

        loadKeywords: function() {
            var xhr = new XMLHttpRequest();
            var path = window.APP_PATH ? window.APP_PATH.js + 'keywords.json' : CONFIG.keywordsPath;
            xhr.open('GET', path, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        AppState.keywords = data;
                        AppState.isLoaded = true;
                        if (data.v1_0 && data.v1_0.hashes) {
                            AppState.keywordMap = data.v1_0.hashes;
                        }
                    } catch (e) { console.error('关键词配置加载失败:', e); }
                }
            };
            xhr.send();
        },

        encode: function(keyword) {
            var clean = keyword.trim().toLowerCase();
            var md5Hash = md5(clean);
            var bytes = [];
            for (var i = 0; i < md5Hash.length; i += 2) {
                bytes.push(parseInt(md5Hash.substr(i, 2), 16));
            }
            return btoa(String.fromCharCode.apply(null, bytes));
        },

        search: function(keyword) {
            if (!keyword || !keyword.trim()) { alert('请输入搜索关键词'); return; }
            if (!/[\u4e00-\u9fa5]+$/.test(keyword.trim())) {
                alert('只支持汉字搜索，请勿使用数字、英文或符号');
                return;
            }
            var cleanKeyword = keyword.trim();

            // 检查 aliases，将 alias 映射到主关键词
            if (AppState.keywords && AppState.keywords.v1_0 && AppState.keywords.v1_0.aliases) {
                var aliases = AppState.keywords.v1_0.aliases;
                for (var mainKeyword in aliases) {
                    var aliasList = aliases[mainKeyword];
                    // 检查输入是否等于主关键词或某个 alias
                    if (cleanKeyword === mainKeyword) {
                        break;
                    }
                    for (var i = 0; i < aliasList.length; i++) {
                        if (cleanKeyword === aliasList[i]) {
                            cleanKeyword = mainKeyword;
                            break;
                        }
                    }
                }
            }

            var hash = this.encode(cleanKeyword);
            sessionStorage.setItem('searchKeyword', cleanKeyword);
            sessionStorage.setItem('searchHash', hash);
            var resultPath = window.APP_PATH ? window.APP_PATH.pages + 'search-results.html' : CONFIG.resultPage;
            window.location.href = resultPath;
        },

        searchCombo: function(keywords) {
            if (!keywords || keywords.length < 2) return null;
            var comboMap = {
                '周明远+妹妹': '秀兰',
                '周明远+秀兰': '秀兰',
                '陈婉+夜班': '夜班日志',
                '林国栋+密码': '保险箱',
                '地下三层+实验室': '地下三层-实验室入口',
                '炉鼎+计划': '炉鼎计划-概述',
                '系统+日志': '系统日志-玩家身份'
            };
            var key = keywords.join('+');
            return comboMap[key] || null;
        },

        getResult: function(hash) { return AppState.keywordMap[hash] || null; }
    };

    var PasswordLock = {
        verify: function(input, answer) {
            return input.trim().toUpperCase().replace(/\s/g, '') === answer.trim().toUpperCase().replace(/\s/g, '');
        },
        showHint: function(level) {
            var hints = {
                '09': '提示：日记本扉页写着"往后三，是我们相识的纪念"（凯撒密码，移3位）',
                '10': '提示：护士培训手册提到"两栏交替，信息重组"（栅栏密码，2栏）',
                '21-morse': '提示：值班室有紧急联络信号表（摩斯电码对照表）',
                '21-pigpen': '提示：图书馆有共济会密码书（格子密码对照表）',
                '27': '提示：实验室操作手册有十进制-二进制对照表',
                '37': '提示：笔记本写着"键盘左边第三个"（替换密码）',
                '50': '提示：两个年份，两段人生，往后两步（组合密码）'
            };
            return hints[level] || '暂无提示';
        }
    };

    var ProgressManager = {
        save: function(key, value) {
            try {
                if (typeof value === 'object') value = JSON.stringify(value);
                sessionStorage.setItem(key, value);
            } catch (e) { console.error('保存进度失败:', e); }
        },
        load: function(key, defaultValue) {
            try {
                var value = sessionStorage.getItem(key);
                if (value === null) return defaultValue;
                try { return JSON.parse(value); } catch (e) { return value; }
            } catch (e) { return defaultValue; }
        },
        addUnlockedPage: function(pageCode) {
            var pages = this.load('unlockedPages', []);
            if (pages.indexOf(pageCode) === -1) {
                pages.push(pageCode);
                this.save('unlockedPages', pages);
            }
        },
        getUnlockedPages: function() { return this.load('unlockedPages', []); },
        clear: function() { sessionStorage.clear(); }
    };

    var Utils = {
        getBasePath: function() {
            var path = window.location.pathname;
            if (path.includes('/secret/')) return '../../';
            else if (path.includes('/pages/')) return '../';
            return './';
        },
        initPathConfig: function() {
            var basePath = this.getBasePath();
            window.APP_PATH = {
                root: basePath,
                css: basePath + 'css/',
                js: basePath + 'js/',
                pages: basePath + 'pages/',
                secret: basePath + 'pages/secret/'
            };
        }
    };

    window.performSearch = function() {
        var input = document.getElementById('searchInput');
        if (input) {
            var value = input.value.trim();
            if (value.indexOf('+') > -1 || value.indexOf(' ') > -1) {
                var parts = value.split(/[\+\s]+/).filter(function(p) { return p; });
                var comboResult = KeywordSearch.searchCombo(parts);
                if (comboResult) {
                    KeywordSearch.search(comboResult);
                    return;
                }
            }
            KeywordSearch.search(value);
        }
    };

    window.KeywordSearch = KeywordSearch;
    window.PasswordLock = PasswordLock;
    window.ProgressManager = ProgressManager;
    window.Utils = Utils;
    window.AppState = AppState;

    document.addEventListener('DOMContentLoaded', function() {
        Utils.initPathConfig();
        KeywordSearch.init();
    });
})();
