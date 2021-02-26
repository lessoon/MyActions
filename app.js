// version v0.0.2
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require('child_process').execSync;
const fs = require('fs');
const rp = require('request-promise');
const download = require('download');

// 本地js
require('./JD_DailyBonus')

// 公共变量
const serverJ = process.env.SERVER_J_TOKEN;
const jdCookie = process.env.JD_COOKIE;

// 启动
start()

async function start() {

    if (jdCookie){
      await exec("node JD_DailyBonus.js >> result.txt");
      console.log('执行完毕')
    }else {
      console.log('JD_COOKIE 为空！')
    }
  
    if (serverJ) {
      const path = "./result.txt";
      let content ="";
      if (fs.existsSync(path)) {
        content = fs.readFileSync(path, "utf8");
      }
      var contentSplit = content.split('\n');
      var title = contentSplit[contentSplit.length - 5];
      await sendNotify(` ${title} ` + new Date().toLocaleDateString(), content);
      console.log('发送通知');
    }else {
        console.log('server酱token为null');
    }
}

async function sendNotify (text,desp) {
    const options ={
      uri:  `https://sc.ftqq.com/${serverJ}.send`,
      form: { text, desp },
      json: true,
      method: 'POST'
    }
    await rp.post(options).then(res=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
}
