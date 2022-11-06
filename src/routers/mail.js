const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

const mail = async (req, res, next) =>{
    let authNum = Math.random().toString().substr(2,6);
    // let emailTemplete;
    // ejs.renderFile(appDir+'/template/authMail.ejs', {authCode : authNum}, function (err, data) {
    //   if(err){console.log(err)}
    //   emailTemplete = data;
    // });

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    let mailOptions = await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: req.body.email,
        subject: '회원가입을 위한 인증번호를 입력해주세요.',
        text: authNum
        // html: emailTemplete,
    });

    // 메일이 보내진 후의 콜백 함수
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        // console.log("Finish sending email : " + info.response);
        res.send(authNum);
        transporter.close()
    });

    req.authNum = authNum;
    next();
}

export {mail}
