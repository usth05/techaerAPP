if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../components/user/userInfo');
require('../../components/uni-icons/uni-icons');
require('../../components/uni-notice-bar/uni-notice-bar');
require('../../components/uni-badge/uni-badge');
require('../../components/uni-status-bar/uni-status-bar');
require('../../components/uni-nav-bar/uni-nav-bar');
require('../../components/uni-card/uni-card');
require('../../components/uni-list/uni-list');
require('../../components/uni-list-item/uni-list-item');
require('../../pages/index/index');
require('../../pages/workbench/workbench');
require('../../pages/peiyou/peiyou');
require('../../pages/peiyou/peiyou1');
require('../../pages/peiyou/peiyou2');
require('../../pages/peiyou/peiyou3');
require('../../pages/peiyou/peiyouUser');
require('../../pages/peiyou/peiyoucorrect');
require('../../pages/recruitment/recruitment');
require('../../pages/recruitment/recruitmentDetail');
require('../../pages/release/release');
require('../../pages/home/home');
require('../../pages/login/login');
require('../../pages/register/register');
require('../../pages/reviseUser/reviseUser');
require('../../pages/revisePwd/revisePwd');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}